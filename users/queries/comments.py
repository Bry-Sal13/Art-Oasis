from typing import List, Optional, Union
from datetime import datetime
from pydantic import BaseModel
from queries.pool import pool
from fastapi import HTTPException, status


# Error
class Error(BaseModel):
    message: str


# Comment in
class CommentsIn(BaseModel):
    post_id: int
    username: str
    text: str


# Comment Out
class CommentsOut(BaseModel):
    id: int
    post_id: int
    username: str
    text: str
    created: datetime


# Repo Class
class CommentsRepository:
    # get one
    def get_one_(self, comment_id: int) -> Optional[CommentsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            SELECT id
            , post_id
            , username
            , text
            , created
            FROM comments
            WHERE id = %s
            """,
                        [comment_id],
                    )
                    if db.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Comment not found",
                        )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_comment_out(record)
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"message": "Could not get that Comment"}

    # get all
    def get_all(self) -> Union[List[CommentsOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            select id
            , post_id
            , username
            , text
            , created
            FROM comments
            ORDER BY created;
            """
                    )

                    return [
                        self.record_to_comment_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all Comments"}

    # create
    def create(self, comment: CommentsIn) -> Union[CommentsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
            INSERT INTO comments
              (post_id,username,text)
            VALUES
              (%s,%s,%s)
            RETURNING *;
            """,
                        [
                            comment.post_id,
                            comment.username,
                            comment.text,
                        ],
                    )
                    record = db.fetchone()
                    if record is not None:
                        id = record[0]
                        created = record[4]
                        return self.comment_in_to_out(id, created, comment)
        except Exception as e:
            print(e)
            return {"message": "Creating comment did not work"}

    # delete
    def delete(self, comment_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
            DELETE FROM comments
            WHERE id = %s
            """,
                        [comment_id],
                    )
                    if db.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Comment not found",
                        )
                    return True
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return False

    # update
    def update(
        self, comment_id: int, comment: CommentsIn
    ) -> Union[CommentsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
            UPDATE comments
            SET post_id = %s
            , username = %s
            , text = %s
            WHERE id = %s
            """,
                        [
                            comment.post_id,
                            comment.username,
                            comment.text,
                            comment_id,
                        ],
                    )
                    if db.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Comment not found",
                        )
                    return self.comment_in_to_out(comment_id, comment)
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"message": "Could not update Comment"}

    # comment in to out
    def comment_in_to_out(
        self, id: int, created: datetime, comment: CommentsIn
    ):
        old_data = comment.dict()
        return CommentsOut(id=id, created=created, **old_data)

    # record to comment out
    def record_to_comment_out(self, record):
        return CommentsOut(
            id=record[0],
            post_id=record[1],
            username=record[2],
            text=record[3],
            created=record[4],
        )
