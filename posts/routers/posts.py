from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.posts import Error, PostIn, PostOut, PostRepository

router = APIRouter(prefix="/api")


@router.post("/posts", response_model=Union[PostOut, Error])
def create_post(
    posts: PostIn, response: Response, repo: PostRepository = Depends()
):
    return repo.create(posts)


@router.get("/posts", response_model=Union[List[PostOut], Error])
def get_all(
    repo: PostRepository = Depends(),
):
    return repo.get_all()


@router.put("/posts{post_id}", response_model=Union[PostOut, Error])
def update_post(
    post_id: int,
    post: PostIn,
    repo: PostRepository = Depends(),
) -> Union[Error, PostOut]:
    return repo.update(post_id, post)


@router.delete("/posts/{post_id}", response_model=bool)
def delete_post(
    post_id: int,
    repo: PostRepository = Depends(),
) -> bool:
    return repo.delete(post_id)


@router.get("/posts/{post_id}", response_model=PostOut)
def get_one_post(
    post_id: int,
    response: Response,
    repo: PostRepository = Depends(),
) -> PostOut:
    post = repo.get_one(post_id)
    if post is None:
        response.status_code = 404
    return post
