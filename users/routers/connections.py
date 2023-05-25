from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.connections import(
    ConnectionIn,
    ConnectionOut,
    ConnectionRepository,
    Error
)

router = APIRouter(prefix="/api")


@router.post("/connections", response_model=Union[ConnectionOut, Error])
def create_connection(
    social: ConnectionIn,
    response: Response,
    repo: ConnectionRepository = Depends(),
):
    return repo.create_connection(social)


@router.get("/connections", response_model=Union[List[ConnectionOut], Error])
def get_connections(
    repo: ConnectionRepository = Depends(),
):
    connections = repo.get_connections()
    if not connections:
        return {
                "connections": connections,
                "message": "create some connections you currently have none"
            }
    return connections


@router.get("/connections/{connection_id}", response_model=Union[ConnectionOut, Error])
def get_one_connection(
    connection_id: int,
    response: Response,
    repo: ConnectionRepository = Depends(),
) -> ConnectionOut:
    
    
    connection = repo.get_connection(connection_id)
    if not connection:
        response.status_code = 404
    return connection


@router.put("/connections/{connection_id}", response_model=Union[ConnectionOut, Error])
def update_connection(
    connection_id: int,
    connection: ConnectionIn,
    response: Response,
    repo: ConnectionRepository = Depends(),
) -> Union[ConnectionOut, Error]:
    
    return repo.update_connection(connection_id, connection)


@router.delete("/connections/{connection_id}", response_model=Union[bool, Error])
def delete_connection(
    connection_id: int,
    response: Response,
    repo: ConnectionRepository = Depends(),
) -> bool:
    return repo.delete_connection(connection_id)