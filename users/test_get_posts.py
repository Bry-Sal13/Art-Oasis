from main import app
from fastapi.testclient import TestClient
from queries.users import UserOut
from queries.posts import PostRepository, PostOut
from authenticator import authenticator
from datetime import datetime

client = TestClient(app)
current_time = datetime.now()


def test_init():
    assert 1 == 1


# TEST CREATE POST
def fake_user():
    return UserOut(
        user_id=1,
        email="brysal@gmail.com",
        profile_picture="test pfp",
        display_name="Bry_Sal",
        header_image="test header image",
        first_name="Bry",
        last_name="Sal",
        username="Brysal",
        category="Bry art",
        about="Bry making art",
    )


class EmptyPostRepository:
    def get_one(self, post_id: int):
        return PostOut(
            id=1,
            username="Brysal",
            text="hello",
            image="default image",
            created=current_time,
        )


def test_get_post():
    # ARRANGE
    app.dependency_overrides[PostRepository] = EmptyPostRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_user
    id = 1
    desired_result = {
        "id": 1,
        "username": "Brysal",
        "text": "hello",
        "image": "default image",
        "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
    }

    response = client.get(f"/api/posts/{id}")
    app.dependency_overrides = {}
    print(response.json())
    print(desired_result)
    # ASSERT
    assert response.status_code == 200
    assert response.json() == desired_result
