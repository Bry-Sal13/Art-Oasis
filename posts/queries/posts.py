from pydantic import BaseModel
from datetime import datetime
from queries.pool import pool
from typing import List, Union


# Create Post, Post In Model


class Error(BaseModel):
    message: str


class PostIn(BaseModel):
    user_id: int
    text: str
    image: str
    created: datetime


class PostOut(BaseModel):
    id: int
    user_id: int
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
                            , user_id
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
                        user_id=record[1],
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
                    SET user_id = %s
                    , text = %s
                    , image = %s
                    , created = %s
                    WHERE id = %s
                    """,
                        [
                            post.user_id,
                            post.text,
                            post.image,
                            post.created,
                            post_id,
                        ],
                    )
                    return self.post_in_to_out(post_id, post)
        except Exception as e:
            print(e)
            return {"message": "Updating post did not work"}

    def get_all(self) -> Union[Error, List[PostOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, text, image, created
                        FROM Posts
                        ORDER BY created;
                        """
                    )
                    result = []
                    for record in db:
                        post = PostOut(
                            id=record[0],
                            user_id=record[1],
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
                    result = db.execute(
                        """
                        INSERT INTO posts
                            (user_id, text, image, created)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            posts.user_id,
                            posts.text,
                            posts.image,
                            posts.created,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    return self.post_in_to_out(id, posts)
        except Exception as e:
            print(e)
            return {"message": "Creating post did not work"}

    def post_in_to_out(self, id: int, post: PostIn):
        old_data = post.dict()
        return PostOut(id=id, **old_data)
