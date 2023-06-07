from fastapi import FastAPI
from routers import posts
from fastapi.middleware.cors import CORSMiddleware
from routers import comments, likes
import os

app = FastAPI()
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
def launch_details():
    return {
        "launch_details2": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


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
