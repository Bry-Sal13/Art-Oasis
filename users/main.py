from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import (
    users,
    socials,
    connections,
    carousel,
    posts,
    comments,
    likes,
)
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(users.router)
app.include_router(socials.router)
app.include_router(connections.router)
app.include_router(carousel.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(likes.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
