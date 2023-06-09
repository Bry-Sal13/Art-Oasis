from typing import List, Union
from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from queries.socials import SocialsIn, SocialsOut, SocialsRepository, Error

router = APIRouter(prefix="/api")


@router.post("/socials", response_model=Union[SocialsOut, Error])
def create_social(
    social: SocialsIn,
    response: Response,
    repo: SocialsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_social(social)


@router.get("/socials", response_model=Union[List[SocialsOut], Error])
def get_socials(
    repo: SocialsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    socials = repo.get_socials()
    return socials


@router.get("/socials/{social_id}", response_model=Union[SocialsOut, Error])
def get_one_social(
    social_id: int,
    response: Response,
    repo: SocialsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> SocialsOut:
    social = repo.get_social(social_id)
    if not social:
        response.status_code = 404
    return social


@router.put("/socials/{social_id}", response_model=Union[SocialsOut, Error])
def update_social(
    social_id: int,
    social: SocialsIn,
    response: Response,
    repo: SocialsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[SocialsOut, Error]:
    return repo.update_social(social_id, social)


@router.delete("/socials/{social_id}", response_model=Union[bool, Error])
def delete_social(
    social_id: int,
    response: Response,
    repo: SocialsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_social(social_id)
