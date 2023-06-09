from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator
from queries.posts import PostRepository, PostOut
from datetime import datetime
from queries.users import UserOut, UserIn, UserRepository


client = TestClient(app)


# TEST CREATE USER
def fake_get_current_account_data():
    return UserOut(
        user_id=1,
        email="krze@gmail.com",
        profile_picture="test pfp",
        display_name="Eim_Krze",
        header_image="test header image",
        first_name="Eim",
        last_name="Krze",
        username="Krze",
        category="krze art",
        about="krze art dude",
    )


class FakeUserRepo:
    def fe_get_user(self, username: str):
        return UserOut(
            user_id=1,
            email="krze@gmail.com",
            profile_picture="test pfp",
            display_name="Eim_Krze",
            header_image="test header image",
            first_name="Eim",
            last_name="Krze",
            username="Krze",
            category="krze art",
            about="krze art dude",
        )

    def update_user(self, username: str, data: UserIn):
        return UserOut(
            user_id=1,
            email="krze@gmail.com",
            profile_picture="Crze pfp",
            display_name="Eim_Crze",
            header_image="test header image",
            first_name="Eim",
            last_name="Crze",
            username="Krze",
            category="Crze art",
            about="Crze art dude",
        )


def test_update_user():
    # Arrange
    app.dependency_overrides[UserRepository] = FakeUserRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # variable for the url
    username = "Krze"

    # EXPECTED RESULT
    updated_fake_user = UserOut(
        user_id=1,
        email="krze@gmail.com",
        profile_picture="Crze pfp",
        display_name="Eim_Crze",
        header_image="test header image",
        first_name="Eim",
        last_name="Crze",
        username="Krze",
        category="Crze art",
        about="Crze art dude",
    )

    # Act
    response = client.put(
        f"/api/users/{username}",
        headers={"Content-Type": "application/json"},
        json={
            "user_id": 1,
            "email": "krze@gmail.com",
            "profile_picture": "Crze pfp",
            "display_name": "Eim_Crze",
            "header_image": "test header image",
            "first_name": "Eim",
            "last_name": "Crze",
            "username": "Krze",
            "category": "Crze art",
            "about": "Crze art dude",
        },
    )

    # Clean up
    app.dependecy_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == updated_fake_user


def test_get_user():
    # Arrange
    app.dependency_overrides[UserRepository] = FakeUserRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    username = "Krze"
    fake_user = UserOut(
        user_id=1,
        email="krze@gmail.com",
        profile_picture="test pfp",
        display_name="Eim_Krze",
        header_image="test header image",
        first_name="Eim",
        last_name="Krze",
        username="Krze",
        category="krze art",
        about="krze art dude",
    )

    # Act
    response = client.get(f"/api/users/{username}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == fake_user


# SHANE'S UNIT TESTS
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


# BRYANT'S UNIT TESTS

current_time = datetime.now()


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
