from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
from queries.carousel import(
    CarouselIn,
    CarouselOut,
    CarouselRepository,
    Error
)

router = APIRouter(prefix="/api")

@router.post("/carousels", response_model=Union[CarouselOut, Error])
def create_carousel(
    carousel: CarouselIn,
    response: Response,
    repo: CarouselRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_carousel(carousel)


@router.get("/carousels", response_model=Union[List[CarouselOut], Error])
def get_carousels(
    repo: CarouselRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    carousels = repo.get_carousels()
    return carousels


@router.get("/carousels/{carousel_id}", response_model=Union[CarouselOut, Error])
def get_one_carousel(
    carousel_id: int,
    response: Response,
    repo: CarouselRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> CarouselOut:
    
    
    social = repo.get_carousel(carousel_id)
    if not social:
        response.status_code = 404
    return social


@router.put("/carousels/{carousel_id}", response_model=Union[CarouselOut, Error])
def update_carousel(
    carousel_id: int,
    carousel: CarouselIn,
    response: Response,
    repo: CarouselRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> CarouselOut:
    
    return repo.update_carousel(carousel_id, carousel)


@router.delete("/carousels/{carousel_id}", response_model=Union[bool, Error])
def delete_social(
    carousel_id: int,
    response: Response,
    repo: CarouselRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_carousel(carousel_id)