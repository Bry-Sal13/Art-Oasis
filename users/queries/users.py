from pydantic import BaseModel
from typing import List, Optional, Union
from psycopg_pool import ConnectionPool
from fastapi import HTTPException, status


pool = ConnectionPool("postgresql://users:password@postgres:5432/users")


# IN MODEL


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    email: str
    profile_picture: Optional[str]
    display_name: Optional[str]
    header_image: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    password: str
    username: str
    category: Optional[str]
    about: Optional[str]


# OUT MODEL


class UserOut(BaseModel):
    user_id: int
    email: str
    profile_picture: Optional[str]
    display_name: Optional[str]
    header_image: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    username: str
    category: Optional[str]
    about: Optional[str]


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
                            profile_picture=record[2],
                            display_name=record[3],
                            header_image=record[4],
                            first_name=record[5],
                            last_name=record[6],
                            username=record[8],
                            category=record[9],
                            about=record[10],
                        )
                        results.append(user)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def get_user(
        self, username: str
    ) -> Union[Optional[UserOutWithPassword], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Social not found",
                        )
                    record = cur.fetchone()
                    if record is None:
                        return None
                    return UserOutWithPassword(
                        user_id=record[0],
                        email=record[1],
                        profile_picture=record[2],
                        display_name=record[3],
                        header_image=record[4],
                        first_name=record[5],
                        last_name=record[6],
                        hashed_password=record[7],
                        username=record[8],
                        category=record[9],
                        about=record[10],
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
                        SELECT *
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="User not found",
                        )
                    record = cur.fetchone()
                    if record is None:
                        return None
                    return UserOut(
                        user_id=record[0],
                        email=record[1],
                        profile_picture=record[2],
                        display_name=record[3],
                        header_image=record[4],
                        first_name=record[5],
                        last_name=record[6],
                        username=record[8],
                        category=record[9],
                        about=record[10],
                    )
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"message": "User with that ID does not exist"}

    def create_user(
        self, data: UserIn, hashed_password: str
    ) -> Union[UserOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.email,
                        data.profile_picture,
                        data.display_name,
                        data.header_image,
                        data.first_name,
                        data.last_name,
                        hashed_password,
                        data.username,
                        data.category,
                        data.about,
                    ]
                    cur.execute(
                        """
                        INSERT INTO users(
                            email,
                            profile_picture,
                            display_name,
                            header_image,
                            first_name,
                            last_name,
                            password,
                            username,
                            category,
                            about
                        )
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        params,
                    )
                    record = cur.fetchone()
                    return UserOutWithPassword(
                        user_id=record[0],
                        email=record[1],
                        profile_picture=record[2],
                        display_name=record[3],
                        header_image=record[4],
                        first_name=record[5],
                        last_name=record[6],
                        username=record[8],
                        hashed_password=record[7],
                        category=record[9],
                        about=record[10],
                    )
        except Exception as e:
            print(e)
            return {
                "message": "Could not create user, check the data you inputted"
            }

    def update_user(
        self, username: str, data: UserIn
    ) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.email,
                        data.profile_picture,
                        data.display_name,
                        data.header_image,
                        data.first_name,
                        data.last_name,
                        data.category,
                        data.about,
                        username,
                    ]
                    cur.execute(
                        """
                        UPDATE users
                        SET email = %s
                        , profile_picture = %s
                        , display_name = %s
                        , header_image = %s
                        , first_name = %s
                        , last_name = %s
                        , category = %s
                        , about = %s
                        WHERE username = %s
                        RETURNING *;
                        """,
                        params,
                    )

                    record = cur.fetchone()
                    print("user when updated: ", record)
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="User not found for username: {username}",
                        )
                    return UserOut(
                        user_id=record[0],
                        first_name=record[5],
                        last_name=record[6],
                        email=record[1],
                        username=record[8],
                        profile_picture=record[2],
                        display_name=record[3],
                        header_image=record[4],
                        category=record[9],
                        about=record[10],
                    )
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
                "message": "User with that ID does not exist",
            }
