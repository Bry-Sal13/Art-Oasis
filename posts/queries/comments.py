from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import datetime
from queries.pool import pool


# Error
class Error(BaseModel):
    message: str


# Comment in
class CommentsIn(BaseModel):
    post_id: int
    user_id: int
    text: str
    created: datetime


# Comment Out
class CommentsOut(BaseModel):
    id: int
    post_id: int
    user_id: int
    text: str
    created: datetime


# Repo Class
class CommentsRepository:
    # get one
    def get_one(self, comment_id: int) -> Optional[CommentsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            SELECT id
            , post_id
            , user_id
            , text
            , created
            FROM comments
            WHERE id = %s
            """,
                        [comment_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_comment_out(record)
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
            , user_id
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
                    result = db.execute(
                        """
            INSERT INTO comments
              (post_id,user_id,text,created)
            VALUES
              (%s,%s,%s,%s)
            RETURNING id;
            """,
                        [
                            comment.post_id,
                            comment.user_id,
                            comment.text,
                            comment.created,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.comment_in_to_out(id, comment)
        except Exception as e:
            print(e)
            return {"message": "Creating comment did not work"}

    # delete
    def delete(self, comment_id: int) -> bool:
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
                    return True
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
            , user_id = %s
            , text = %s
            , created = %s
            WHERE id = %s
            """,
                        [
                            comment.post_id,
                            comment.user_id,
                            comment.text,
                            comment.created,
                            comment_id,
                        ],
                    )
                    return self.comment_in_to_out(comment_id, comment)
        except Exception as e:
            print(e)
            return {"message": "Could not update Comment"}

    # comment in to out
    def comment_in_to_out(self, id: int, comment: CommentsIn):
        old_data = comment.dict()
        return CommentsOut(id=id, **old_data)

    # record to comment out
    def record_to_comment_out(self, record):
        return CommentsOut(
            id=record[0],
            post_id=record[1],
            user_id=record[2],
            text=record[3],
            created=record[4],
        )
