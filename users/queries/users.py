from pydantic import BaseModel
from typing import List, Optional, Union
from psycopg_pool import ConnectionPool
from fastapi import HTTPException, status
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


# IN MODEL


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    email: str
    password: str
    first_name: Optional[str]
    last_name: Optional[str]
    profile_picture: Optional[str]
    display_name: Optional[str]
    header_image: Optional[str]
    username: str
    category: Optional[str]


# OUT MODEL


class UserOut(BaseModel):
    user_id: int
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    profile_picture: Optional[str]
    display_name: Optional[str]
    header_image: Optional[str]
    username: str
    category: Optional[str]


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository:
    def get_users(self) -> Union[List[UserOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM users
                        """
                    )
                    results = []
                    for record in cur:
                        user = UserOut(
                            user_id=record[0],
                            email=record[1],
                            first_name=record[2],
                            last_name=record[3],
                            profile_picture=record[4],
                            display_name=record[5],
                            header_image=record[6],
                            username=record[8],
                            category=record[9],
                        )
                        results.append(user)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}


    def get_user(self, username: str) -> Union[Optional[UserOutWithPassword], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, first_name, last_name, email,
                            username, password, profile_picture,
                            display_name, header_image, category
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Social not found")
                    record = cur.fetchone()
                    if record is None:
                        return None
                    return UserOutWithPassword(
                        user_id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        username=record[4],
                        hashed_password=record[5],
                        profile_picture=record[6],
                        display_name=record[7],
                        header_image=record[8],
                        category=record[9],
                    )
        except HTTPException:
            raise 
        except Exception as e:
            print(e)
            return {"message": "User with that ID does not exist"}

    def fe_get_user(self, username: str) -> Union[Optional[UserOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, first_name, last_name, email,
                            username, profile_picture,
                            display_name, header_image, category
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
                    record = cur.fetchone()
                    if record is None:
                        return None
                    return UserOut(
                        user_id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        username=record[4],
                        profile_picture=record[5],
                        display_name=record[6],
                        header_image=record[7],
                        category=record[8],
                    )
        except HTTPException:
            raise 
        except Exception as e:
            print(e)
            return {"message": "User with that ID does not exist"}

    def create_user(self, data: UserIn, hashed_password: str) -> Union[UserOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.first_name,
                        data.last_name,
                        data.profile_picture,
                        data.email,
                        data.username,
                        hashed_password,
                        data.header_image,
                        data.display_name,
                        data.category,
                    ]
                    result = cur.execute(
                        """
                        INSERT INTO users (first_name, last_name, profile_picture, email, username, password, header_image, display_name, category)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        params,
                    )

                    id = result.fetchone()[0]
                    old_data = data.dict()
                    old_data["hashed_password"] = hashed_password
                    old_data["user_id"] = id
                    return UserOutWithPassword(**old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create user, check the data you inputted"}


    def update_user(self, username: str, data: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.first_name,
                        data.last_name,
                        data.email,
                        data.username,
                        data.profile_picture,
                        data.display_name,
                        data.header_image,
                        data.category,
                        username
                    ]
                    cur.execute(
                        """
                        UPDATE users
                        SET first_name = %s
                        , last_name = %s
                        , email = %s
                        , username = %s
                        , profile_picture = %s
                        , display_name = %s
                        , header_image = %s
                        , category = %s
                        WHERE username = %s
                        RETURNING *;
                        """,
                        params,
                    )
                    
                    id = cur.fetchone()[0]
                    if cur.rowcount <= 0:
                        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found for username: {username}")
                    old_data = data.dict()
                    old_data["user_id"] = id
                    print("user_out:", UserOut(**old_data))
                    return UserOut(**old_data)
        except HTTPException:
            raise 
        except Exception as e:
            print(e)
            return {"message": "Could not update a user with that ID"}

    def delete_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM users
                        where id = %s
                        """,
                        [user_id],
                    )
                    return {"deleted": True}
        except Exception as e:
            print(e)
            return {
                    "deleted": False,
                    "message": "User with that ID does not exist"
                }


    def to_user_out(self, id: int, user: UserIn):
        data = user.dict()
        return UserOutWithPassword(id=id, **data)
