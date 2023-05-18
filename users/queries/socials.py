from pydantic import BaseModel
from typing import List
from pool.py import pool


class socials(BaseModel):
    user_id: int
    link: str


class SocialsOut(BaseModel):
    user_id: int
    link: str


