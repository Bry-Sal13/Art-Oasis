from typing import List, Union
from pydantic import BaseModel
from typing import List, Union, Optional
from psycopg_pool import ConnectionPool
from fastapi import HTTPException, status
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class CarouselIn(BaseModel):
    user_id: int
    link: str


class CarouselOut(BaseModel):
    id: int
    user_id: int
    link: str


class CarouselRepository:
    def get_carousel(self, carousel_id: int) -> Union[CarouselOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, user_id, image_href
                        FROM image_carousel
                        where id = %s
                        """,
                        [carousel_id],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Carousel not found",
                        )
                    record = cur.fetchone()
                    if record is None:
                        return None
                    return CarouselOut(
                        id=record[0], user_id=record[1], link=record[2]
                    )
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"Message": "Something went wrong"}

    def get_carousels(self) -> Union[List[CarouselOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM image_carousel
                        """
                    )
                    results = []
                    for record in cur:
                        carousel = CarouselOut(
                            id=record[0], user_id=record[1], link=record[2]
                        )
                        results.append(carousel)
                    return results
        except Exception as e:
            print(e)
            return {"Message": "Something went wrong"}

    def create_carousel(self, data: CarouselIn) -> Union[CarouselOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.user_id,
                        data.link,
                    ]
                    res = cur.execute(
                        """
                        INSERT INTO image_carousel (user_id, image_href)
                        VALUES  (%s, %s)
                        RETURNING *
                        """,
                        params,
                    )
                    id = res.fetchone()[0]
                    data = data.dict()
                    data["id"] = id
                    return CarouselOut(**data)
        except Exception as e:
            print(e)
            return {"message": "Could not create a carousel with that data"}

    def update_carousel(
        self, carousel_id: int, data: CarouselIn
    ) -> Union[CarouselOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [data.user_id, data.link, carousel_id]
                    cur.execute(
                        """
                        UPDATE image_carousel
                        SET user_id = %s
                        , image_href = %s
                        WHERE id = %s
                        """,
                        params,
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Carousel not found",
                        )
                    data = data.dict()
                    data["id"] = carousel_id
                    return CarouselOut(**data)
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"message": "Could not update a carousel with that ID"}

    def delete_carousel(self, carousel_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM image_carousel
                        WHERE id = %s
                        """,
                        [carousel_id],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Carousel not found",
                        )
                    return True
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return False
