from typing import List, Optional, Union
from pydantic import BaseModel
from queries.pool import pool
from fastapi import HTTPException, status


# Error
class Error(BaseModel):
    message: str


# Like in
class LikesIn(BaseModel):
    post_id: int
    username: str


# Like Out
class LikesOut(BaseModel):
    id: int
    post_id: int
    username: str


# Repo Class
class LikesRepository:
    # get one
    def get_one(self, like_id: int) -> Optional[LikesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            SELECT id
            , post_id
            , username
            FROM likes
            WHERE id = %s
            """,
                        [like_id],
                    )
                    if db.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Like not found",
                        )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_like_out(record)
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"message": "Could not get that Like"}

    # get all
    def get_all(self) -> Union[List[LikesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            select id
            , post_id
            , username
            FROM likes
            ORDER BY username;
            """
                    )

                    return [
                        self.record_to_like_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all Likes"}

    # create
    def create(self, like: LikesIn) -> Union[LikesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            INSERT INTO likes
              (post_id,username)
            VALUES
              (%s,%s)
            RETURNING id;
            """,
                        [like.post_id, like.username],
                    )
                    id = result.fetchone()[0]
                    if db.rowcount <= 0:
                        raise Exception
                    return self.like_in_to_out(id, like)
        except Exception as e:
            print(e)
            return {"message": "Creating like did not work"}

    # delete
    def delete(self, like_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
            DELETE FROM likes
            WHERE id = %s
            """,
                        [like_id],
                    )
                    if db.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Like not found",
                        )
                    return True
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return False

    # like in to out
    def like_in_to_out(self, id: int, like: LikesIn):
        old_data = like.dict()
        return LikesOut(id=id, **old_data)

    # record to like out
    def record_to_like_out(self, record):
        return LikesOut(
            id=record[0],
            post_id=record[1],
            username=record[2],
        )
