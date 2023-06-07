from typing import List, Union
from pydantic import BaseModel
from psycopg_pool import ConnectionPool
from fastapi import HTTPException, status
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class ConnectionIn(BaseModel):
    user_id: int
    following_id: int  # the person who the user_id is following
    following: bool  # if that follower is following you


class ConnectionOut(BaseModel):
    id: int
    user_id: int
    following_id: int  # the person who the user_id is following
    following: bool  # if that follower is following you


class ConnectionRepository:
    def get_connection(self, id: int) -> Union[ConnectionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, user_id, following_id, following
                        FROM connections
                        WHERE id = %s
                        """,
                        [id],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Social not found",
                        )
                    record = cur.fetchone()

                    return ConnectionOut(
                        id=record[0],
                        user_id=record[1],
                        following_id=record[2],
                        following=record[3],
                    )
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"Message": "Something went wrong"}

    def get_connections(self) -> Union[List[ConnectionOut], Error]:
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
                            id=record[0],
                            user_id=record[1],
                            following_id=record[2],
                            following=record[3],
                        )
                        results.append(connection)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get all connections"}

    def create_connection(self, data: ConnectionIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [data.user_id, data.following_id, data.following]
                res = cur.execute(
                    """
                    INSERT INTO connections (user_id, following_id, following)
                    VALUES (%s, %s, %s)
                    RETURNING id, user_id, following_id, following
                    """,
                    params,
                )
                id = res.fetchone()[0]
                data = data.dict()
                data["id"] = id
                return ConnectionOut(**data)

    def update_connection(
        self, connection_id: int, data: ConnectionIn
    ) -> Union[ConnectionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.user_id,
                        data.following_id,
                        data.following,
                        connection_id,
                    ]
                    cur.execute(
                        """
                        UPDATE connections
                        SET user_id = %s
                        , following_id = %s
                        , following = %s
                        WHERE id = %s
                        """,
                        params,
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Connection not found",
                        )
                    data = data.dict()
                    data["id"] = connection_id
                    return ConnectionOut(**data)
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"message": "Could not update a Connection with that ID"}

    def delete_connection(self, connection_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM connections
                        WHERE id = %s
                        """,
                        [connection_id],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Connection not found",
                        )
                    return True
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return False

    def record_to_comment_out(self, record):
        return ConnectionOut(
            id=record[0],
            user_id=record[1],
            following_id=record[2],
            following=record[3],
        )
