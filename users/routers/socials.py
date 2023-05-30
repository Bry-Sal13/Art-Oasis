from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
from queries.socials import(
    SocialsIn,
    SocialsOut,
    SocialsRepository,
    Error
)

router = APIRouter(prefix="/api")

@router.post("/socials", response_model=Union[SocialsOut, Error])
def create_social(
    social: SocialsIn,
    response: Response,
    repo: SocialsRepository = Depends(),
):
    return repo.create_social(social)


@router.get("/socials", response_model=Union[List[SocialsOut], Error])
def get_socials(
    repo: SocialsRepository = Depends(),
):
    socials = repo.get_socials()
    if not socials:
        return {
                "socials": socials,
                "message": "create some socials you currently have none"
            }
    return socials


@router.get("/socials/{social_id}", response_model=Union[SocialsOut, Error])
def get_one_social(
    social_id: int,
    response: Response,
    repo: SocialsRepository = Depends(),
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
) -> Union[SocialsOut, Error]:
    
    return repo.update_social(social_id, social)


@router.delete("/socials/{social_id}", response_model=Union[bool, Error])
def delete_social(
    social_id: int,
    response: Response,
    repo: SocialsRepository = Depends(),
) -> bool:
    return repo.delete_social(social_id)