from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
from authenticator import authenticator

client = TestClient(app)


def fake_user():
    return {
        "user_id": 1,
        "email": "shane@gmail.com",
        "profile_picture": "picture_url",
        "display_name": "Shane",
        "header_image": "header_image",
        "first_name": "Shane",
        "last_name": "McCracken",
        "username": "Shane",
        "category": "Art",
        "about": "Super_dope_guy",
    }


class emptyUserRepository:
    def get_users(self):
        return [
            {
                "user_id": 1,
                "email": "shane@gmail.com",
                "profile_picture": "picture_url",
                "display_name": "Shane",
                "header_image": "header_image",
                "first_name": "Shane",
                "last_name": "McCracken",
                "username": "Shane",
                "category": "Art",
                "about": "Super_dope_guy",
            }
        ]


def test_get_users():
    # Arrange
    app.dependency_overrides[UserRepository] = emptyUserRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_user
    desired_result = [
        {
            "user_id": 1,
            "email": "shane@gmail.com",
            "profile_picture": "picture_url",
            "display_name": "Shane",
            "header_image": "header_image",
            "first_name": "Shane",
            "last_name": "McCracken",
            "username": "Shane",
            "category": "Art",
            "about": "Super_dope_guy",
        }
    ]
    response = client.get("/api/users")
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == desired_result
