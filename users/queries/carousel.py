from pydantic import BaseModel
from typing import List
from queries.pool.py import pool


class CarouselIn(BaseModel):
    user_id: int
    image_url: str


class CarouselOut(BaseModel):
    id: int
    user_id: int
    link: str


class CarouselRepository:
    def get_Carousel(self) -> List[CarouselOut]:
        try:
            pass
        except Exception:
            pass