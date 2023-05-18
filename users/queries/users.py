from pydantic import BaseModel
from typing import List
from queries.pool.py import pool


# IN MODEL

class DuplicateUserError(ValueError):
    pass

class UserIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    profile_picture: str
    display_name: str
    header_image: str
    username: str
    category: str

# OUT MODEL

class UserOut(BaseModel):
    user_id: str
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    profile_picture: str
    display_name: str
    header_image: str
    username: str
    category: str

class UserRepository:
    def get_users(self) -> List[UserOut]:
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
                            user_id = record[0], email=record[1], 
                            password=record[2], first_name=record[3],
                            last_name=record[4], profile_picture=record[5],
                            display_name=record[6], header_image=record[7],
                            username=record[8], category=record[9]
                        )
                        results.append(user)
                    return results
        except Exception:
            return {"message": "Could not get all users"}

    def get_user(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name, email,
                        username, password, profile_picture,
                        display_name, header_image, category
                    FROM users
                    WHERE id = %s
                    """,
                    [id],
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def create_user(self, data):
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
                    data.category
                ]
                cur.execute(
                    """
                    INSERT INTO users (first_name, last_name, profile_picture, email, username, password, header_image, display_name, category)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, first_name, last_name, profile_picture, email, username, passwrod, header_image, display_name, category
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
                    user_id
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
                    [user_id]
                )


