from typing import List, Union
from fastapi import (
    Depends,
    APIRouter,
    HTTPException,
    status,
    Response,
    Request,
)
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from queries.users import (
    UserIn,
    UserOut,
    UserRepository,
    Error,
)


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/api/users", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create_user(info, hashed_password)
    except Error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=user, **token.dict())


@router.get("/api/users", response_model=List[UserOut] | HttpError)
async def get_users(
    repo: UserRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_users()


@router.get("/api/users/{username}", response_model=UserOut | HttpError)
async def get_one_fe_user(
    username: str,
    response: Response,
    repo: UserRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    if not repo.fe_get_user(username):
        response.status_code = 404
    return repo.fe_get_user(username)


@router.put("/api/users/{username}", response_model=UserOut | HttpError)
async def update_user(
    user: UserOut,
    username: str,
    repo: UserRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[UserOut, Error]:
    return repo.update_user(username, user)


@router.delete("/api/users/{user_id}", response_model=UserOut | HttpError)
async def delete_user(
    user: UserOut,
    user_id: int,
    repo: UserRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[UserOut, Error]:
    return repo.delete_user(user_id, user)
