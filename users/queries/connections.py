from pydantic import BaseModel
from typing import List
from queries.pool.py import pool


class ConnectionIn(BaseModel):
    user_id: int
    following_id: int
    following: bool



class ConnectionOut(BaseModel):
    user_id: int
    following_id: int
    following: bool