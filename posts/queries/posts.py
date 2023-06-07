from datetime import datetime
from typing import List, Union
from pydantic import BaseModel
from queries.pool import pool


# Create Post, Post In Model


class Error(BaseModel):
    message: str


class PostIn(BaseModel):
    username: str
    text: str
    image: str


class PostOut(BaseModel):
    id: int
    username: str
    text: str
    image: str
    created: datetime


class PostRepository:
    def get_one(self, post_id: int) -> PostOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , username
                            , text
                            , image
                            , created
                        FROM posts
                        WHERE id = %s
                        """,
                        [post_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return PostOut(
                        id=record[0],
                        username=record[1],
                        text=record[2],
                        image=record[3],
                        created=record[4],
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that post"}

    def delete(self, post_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM posts
                        WHERE id = %s
                        """,
                        [post_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, post_id: int, post: PostIn) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                    UPDATE posts
                    SET username = %s
                    , text = %s
                    , image = %s
                    WHERE id = %s
                    RETURNING *
                    """,
                        [
                            post.username,
                            post.text,
                            post.image,
                            post_id,
                        ],
                    )
                    record = db.fetchone()

                    if record is not None:
                        id = record[0]
                        created = record[4]
                        return self.post_in_to_out(post_id, created, post)
        except Exception as e:
            print(e)
            return {"message": e}

    def get_all(self) -> Union[Error, List[PostOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, text, image, created
                        FROM Posts
                        ORDER BY created DESC;
                        """
                    )
                    result = []
                    for record in db:
                        post = PostOut(
                            id=record[0],
                            username=record[1],
                            text=record[2],
                            image=record[3],
                            created=record[4],
                        )
                        result.append(post)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Getting post did not work"}

    def create(self, posts: PostIn) -> PostOut:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run or INSERT statement
                    db.execute(
                        """
                        INSERT INTO posts
                            (username, text, image)
                        VALUES
                            (%s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            posts.username,
                            posts.text,
                            posts.image,
                        ],
                    )
                    record = db.fetchone()

                    if record is not None:
                        id = record[0]
                        created = record[4]
                        return self.post_in_to_out(id, created, posts)
                    else:
                        return {"message": "Creating post did not work"}
        except Exception as e:
            print(e)
            return {"message": "Creating post did not work"}

    def post_in_to_out(self, id: int, created: datetime, post: PostIn):
        old_data = post.dict()
        return PostOut(id=id, created=created, **old_data)
