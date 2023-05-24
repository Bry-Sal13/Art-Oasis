from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.likes import (
    Error,
    LikesIn,
    LikesRepository,
    LikesOut,
)

router = APIRouter(prefix="/api")


@router.post("/likes", response_model=Union[LikesOut, Error])
def create_like(
    like: LikesIn,
    response: Response,
    repo: LikesRepository = Depends(),
):
    return repo.create(like)


@router.get("/likes", response_model=Union[List[LikesOut], Error])
def get_all_likes(
    repo: LikesRepository = Depends(),
):
    return repo.get_all()


@router.delete("/likes/{like_id}", response_model=bool)
def delete_like(
    like_id: int,
    response: Response,
    repo: LikesRepository = Depends(),
) -> bool:
    if ArithmeticError:
        response.status_code = 404
    return repo.delete(like_id)


@router.get("/likes/{like_id}", response_model=Optional[LikesOut])
def get_one_like(
    like_id: int, response: Response, repo: LikesRepository = Depends()
) -> LikesOut:
    like = repo.get_one(like_id)
    if like is None:
        response.status_code = 404
    return like
