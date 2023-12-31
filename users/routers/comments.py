from typing import List, Optional, Union
from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from queries.comments import (
    Error,
    CommentsIn,
    CommentsRepository,
    CommentsOut,
)

router = APIRouter(prefix="/api")


@router.post("/comments", response_model=Union[CommentsOut, Error])
def create_comment(
    comment: CommentsIn,
    response: Response,
    repo: CommentsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(comment)


@router.get("/comments", response_model=Union[List[CommentsOut], Error])
def get_all_comments(
    repo: CommentsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put("/comments/{comment_id}", response_model=Union[CommentsOut, Error])
def update_comment(
    comment_id: int,
    comment: CommentsIn,
    response: Response,
    repo: CommentsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[CommentsOut, Error]:
    return repo.update(comment_id, comment)


@router.delete("/comments/{comment_id}", response_model=bool)
def delete_comment(
    comment_id: int,
    response: Response,
    repo: CommentsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(comment_id)


@router.get("/comments/{comment_id}", response_model=Optional[CommentsOut])
def get_one_comment(
    comment_id: int,
    response: Response,
    repo: CommentsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> CommentsOut:
    comment = repo.get_one(comment_id)
    if comment is None:
        response.status_code = 404
    return comment
