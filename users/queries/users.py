from pydantic import BaseModel
from typing import List, Optional
from psycopg_pool import ConnectionPool
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


# IN MODEL


class DuplicateUserError(ValueError):
    pass


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
    first_name: str
    last_name: str
    profile_picture: str
    display_name: str
    header_image: str
    username: str
    category: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository:
    def get_users(self) -> List[UserOutWithPassword]:
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
                        user = UserOutWithPassword(
                            user_id=record[0],
                            email=record[1],
                            password=record[2],
                            first_name=record[3],
                            last_name=record[4],
                            profile_picture=record[5],
                            display_name=record[6],
                            header_image=record[7],
                            username=record[8],
                            category=record[9],
                        )
                        results.append(user)
                    return results
        except Exception:
            return {"message": "Could not get all users"}

    def get_user(self, username: str) -> Optional[UserOutWithPassword]:
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

    def create_user(self, data: UserIn, hashed_password: str):
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

                # if row is not None:
                #     record = {}
                #     print(result)
                #     for i, column in enumerate(result.description):
                #         record[column.name] = row[i]
                # record["password"] = hashed_password
                # return record

    def update_user(self, user_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.username,
                    data.password,
                    data.profile_picture,
                    data.display_name,
                    data.header_image,
                    data.category,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET first_name = %s
                    , last_name = %s
                    , email = %s
                    , username = %s
                    , password = %s
                    , profile_picture = %s
                    , display_name = %s
                    , header_image = %s
                    , category = %s
                    """,
                    params,
                )

                record = None
                row = cur.fetchOne()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def delete_user(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    where id = %s
                    """,
                    [user_id],
                )

    def to_user_out(self, id: int, user: UserIn):
        data = user.dict()
        return UserOutWithPassword(id=id, **data)
