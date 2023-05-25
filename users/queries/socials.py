from pydantic import BaseModel
from typing import List,  Union, Optional
from psycopg_pool import ConnectionPool
from fastapi import HTTPException, status
import os


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class Error(BaseModel):
    message: str

class SocialsIn(BaseModel):
    user_id: int
    link: str


class SocialsOut(BaseModel):
    id: int
    user_id: int
    link: str

class SocialsRepository:
    def get_social(self, social_id: int) -> Union[SocialsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, user_id, link
                        FROM socials
                        WHERE id = %s
                        """,
                        [social_id],
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Social not found")
                    record = cur.fetchone()
                    if record is None:
                        return None
                    return SocialsOut(
                        id=record[0],
                        user_id=record[1],
                        link=record[2]
                    )
        except HTTPException:
            raise  
        except Exception as e:
            print(e)
            return {"Message": "Something went wrong"}

    def get_socials(self) -> Union[List[SocialsOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM socials
                        """
                    )
                    results = []
                    for record in cur:
                        social = SocialsOut(
                            id=record[0], user_id=record[1], link=record[2]
                        )
                        results.append(social)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get all socials"}

    def create_social(self, data: SocialsIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.user_id,
                    data.link
                ]
                cur.execute(
                    """
                    INSERT INTO socials (user_id, link)
                    VALUES (%s, %s)
                    RETURNING id, user_id, link
                    """,
                    params,
                )

                data = data.dict()
                return SocialsOut(**data)

    def update_social(self, social_id: int, data: SocialsIn) -> Union[SocialsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.user_id,
                        data.link,
                        social_id
                        
                    ]
                    cur.execute(
                        """
                        UPDATE socials
                        SET user_id = %s
                        , link = %s
                        where id = %s
                        """,
                        params,
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Social not found")
                    else:
                        data = data.dict()
                        data["id"] = social_id
                        return SocialsOut(**data)
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return {"message": "Could not update a social/link with that ID"}

    def delete_social(self, social_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM users
                        where id = %s
                        """,
                        [social_id]
                    )
                    if cur.rowcount <= 0:
                        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Social not found")
                    return cur.rowcount > 0
        except HTTPException:
            raise
        except Exception as e:
            print(e)
            return False

    def to_social_out(self, id: int, user: SocialsIn):
        data = user.dict()
        return SocialsOut(id=id, **data)