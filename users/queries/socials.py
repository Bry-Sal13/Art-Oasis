from pydantic import BaseModel
from typing import List
from queries.pool.py import pool


class socials(BaseModel):
    user_id: int
    link: str


class SocialsOut(BaseModel):
    user_id: int
    link: str

class SocialsRepo:
    def get_social(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id AS user_id, u.first_name, u.last_name,
                    u.profile_picture, u.display_name, u.header_image, u.category,
                    s.user_id, s.link
                    FROM users u
                    JOIN socials s 
                    ON(u.id = s.user_id)
                    WHERE s.id = %s
                    """,
                    [id],
                )

                social = None
                row = cur.fetchone()

                if row is not None:
                    social = {}
                    social_fields = [
                        "social_id",
                        "user_id",
                        "link"
                    ]
                    for i, column in enumerate(cur.description):
                        if column.name in social_fields:
                            social[column.name] = row[i]
                    social["id"] = social["social_id"]

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
                    social["owner"] = user
                    print("social output", social)
                return social

    def get_socials(self) -> list[SocialsOut]:
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
                            user_id=record[0], link=record[1]
                        )
                        results.append(social)
                    return results
        except Exception:
            return {"message": "Could not get all socials"}

    def create_social(self, data):
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

                record = None
                row = cur.fetchOne()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def update_social(self, social_id, data):
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

    def delete_social(self, social_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    where id = %s
                    """,
                    [social_id]
                )

