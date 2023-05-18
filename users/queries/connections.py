from pydantic import BaseModel
from typing import List
from psycopg_pool import ConnectionPool
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class ConnectionIn(BaseModel):
    user_id: int
    following_id: int
    following: bool



class ConnectionOut(BaseModel):
    user_id: int
    following_id: int
    following: bool


class ConnectionRepository:
    def get_connection(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id AS user_id, u.first_name, u.last_name,
                    u.profile_picture, u.display_name, u.header_image, u.category,
                    c.user_id, c.following_id, c.following
                    FROM users u
                    JOIN comments c
                    ON(u.id = c.user_id)
                    WHERE c.id = %s
                    """,
                    [id],
                )

                connection = None
                row  = cur.fetchone()

                if row is not None:
                    connection = {}
                    connection_fields = [
                        "connection_id",
                        "user_id",
                        "following_id",
                        "following"
                    ]
                    for i, column in enumerate(cur.description):
                        if column.name in connection_fields:
                            connection[column.name] = row[i]
                    connection["id"] = connection["connection_id"]

                    user = {}
                    user_fields = [
                            "user_id",
                            "first_name",
                            "last_name",
                            "email",
                            "username",
                            "password",
                            "profile_picture",
                            "display_name",
                            "header_image",
                            "category"
                        ]
                    for i, column in enumerate(cur.description):
                        if column.name in user_fields:
                            user[column.name] = row[i]
                    user["id"] = user["user_id"]
                    connection["owner"] = user
                    print("connection output", connection)
                return connection

    def get_connections(self) -> List[ConnectionOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM connections
                        """
                    )
                    results = []
                    for record in cur:
                        connection = ConnectionOut(
                            user_id=record[0], following_id=record[1],
                            following=record[2]
                        )
                        results.append(connection)
                    return results
        except Exception:
            return {"message": "Could not get all connections"}

    def create_connection(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.user_id,
                    data.following_id,
                    data.following
                ]
                cur.execute(
                    """
                    INSERT INTO connections (user_id, following_id, following)
                    VALUES (%s, %s, %s)
                    RETURNING id, user_id, following_id, following
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

    def update_connection(self, connection_id, data):
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.user_id,
                        data.following_id,
                        data.following,
                        connection_id
                    ]
                    cur.execute(
                        """
                        UPDATE connections
                        SET user_id = %s
                        , following_id = %s
                        , following = %s
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

    def delete_social(self, connection_id):
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM connections
                        where id = %s
                        """,
                        [connection_id]
                    )
