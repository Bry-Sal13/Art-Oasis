from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator
from queries.posts import PostRepository, PostOut, PostIn
from datetime import datetime
from fastapi import HTTPException, status
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
    app.dependency_overrides = {}

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
def test_get_users():
    # Arrange
    app.dependency_overrides[UserRepository] = FakeUserRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
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

# Justin's unit tests
class BadUserRepo:
    def fe_get_user(self, username: str):
        user_id = 1
        email = 2
        profile_picture = "test pfp"
        display_name = "Eim_Krze"
        header_image = "test header image"
        first_name = "Eim"
        last_name = "Krze"
        username = "Krze"
        category = "krze art"
        about = "krze art dude"
        if not isinstance(email, str):
            raise HTTPException(
                status_code=422,
                detail="Invalid field type",
            )
        return UserOut(
            user_id,
            email,
            profile_picture,
            display_name,
            header_image,
            first_name,
            last_name,
            category,
            about,
            username,
        )

    def update_user(self, username: str, data: UserIn):
        user_id = 1
        email = 2
        profile_picture = "test pfp"
        display_name = "Eim_Krze"
        header_image = "test header image"
        first_name = "Eim"
        last_name = "Krze"
        username = "Krze"
        category = "krze art"
        about = "krze art dude"
        if not isinstance(email, str):
            raise HTTPException(
                status_code=422,
                detail="Invalid field type",
            )
        return UserOut(
            user_id,
            email,
            profile_picture,
            display_name,
            header_image,
            first_name,
            last_name,
            username,
            category,
            about,
        )

    def get_users(self):
        user_id = 1
        email = 2
        profile_picture = "test pfp"
        display_name = "Eim_Krze"
        header_image = "test header image"
        first_name = "Eim"
        last_name = "Krze"
        username = "Krze"
        category = "krze art"
        about = "krze art dude"
        if not isinstance(email, str):
            raise HTTPException(
                status_code=422,
                detail="Invalid field type",
            )
        return [
            {
                UserOut(
                    user_id,
                    email,
                    profile_picture,
                    display_name,
                    header_image,
                    first_name,
                    last_name,
                    username,
                    category,
                    about,
                )
            }
        ]


def test_bad_update_user():
    # Arrange
    app.dependency_overrides[UserRepository] = BadUserRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # variable for the url
    username = "Krze"

    # Act
    response = client.put(
        f"/api/users/{username}",
        headers={"Content-Type": "application/json"},
        json={
            "user_id": 1,
            "email": 2,
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
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid field type"}


def test_bad_get_user():
    # Arrange
    app.dependency_overrides[UserRepository] = BadUserRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    username = "Krze"

    # Act
    response = client.get(f"/api/users/{username}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid field type"}


def test_bad_get_users():
    # Arrange
    app.dependency_overrides[UserRepository] = BadUserRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    response = client.get("/api/users")
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid field type"}


# Justin's Auth testing
class NoAuthUserRepo:
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


def test_no_auth_update_user():
    # Arrange
    app.dependency_overrides[UserRepository] = NoAuthUserRepo

    # variable for the url
    username = "Krze"

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
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 401


def test_no_auth_get_user():
    # Arrange
    app.dependency_overrides[UserRepository] = NoAuthUserRepo

    username = "Krze"

    # Act
    response = client.get(f"/api/users/{username}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 401


def test_no_auth_get_users():
    # Arrange
    app.dependency_overrides[UserRepository] = NoAuthUserRepo

    response = client.get("/api/users")
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 401


# Fail user's - Justin's
class FailUserRepo:
    def fe_get_user(self, username: str):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    def update_user(self, data: UserIn, username: str):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )


def test_fail_get_user():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[UserRepository] = FailUserRepo

    desired_result = {"detail": "User not found"}
    response = client.get("/api/users/asdfas")
    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 404
    assert response.json() == desired_result


def test_fail_update_user():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[UserRepository] = FailUserRepo

    desired_result = {"detail": "User not found"}
    response = client.put(
        "/api/users/asdfas",
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
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 404
    assert response.json() == desired_result


class MissingUserRepo:
    def fe_get_user(self, user_id: int) -> UserOut:
        username = None
        if not username:
            raise HTTPException(
                status_code=422,
                detail=[
                    {
                        "loc": ["body", "username"],
                        "msg": "field required",
                        "type": "value_error.missing",
                    }
                ],
            )
        return UserOut(
            user_id=user_id,
            email="krze@gmail.com",
            profile_picture="Crze pfp",
            display_name="Eim_Crze",
            header_image="test header image",
            first_name="Eim",
            last_name="Crze",
            category="Crze art",
            about="Crze art dude",
        )

    def update_user(self, user_id: int, user: UserIn) -> UserOut:
        header_image = None
        if not header_image:
            raise HTTPException(
                status_code=422,
                detail=[
                    {
                        "loc": ["body", "header_image"],
                        "msg": "field required",
                        "type": "value_error.missing",
                    }
                ],
            )
        return UserOut(
            user_id=user_id,
            email="krze@gmail.com",
            profile_picture="Crze pfp",
            display_name="Eim_Crze",
            header_image="test header image",
            first_name="Eim",
            last_name="Crze",
            category="Crze art",
            about="Crze art dude",
        )

    def get_users(self):
        username = None
        if not username:
            raise HTTPException(
                status_code=422,
                detail=[
                    {
                        "loc": ["body", "username"],
                        "msg": "field required",
                        "type": "value_error.missing",
                    }
                ],
            )
        return [
            UserOut(
                user_id=1,
                email="krze@gmail.com",
                profile_picture="Crze pfp",
                display_name="Eim_Crze",
                header_image="test header image",
                first_name="Eim",
                last_name="Crze",
                category="Crze art",
                about="Crze art dude",
            ),
            UserOut(
                user_id=2,
                email="john@gmail.com",
                profile_picture="John pfp",
                display_name="John_Doe",
                header_image="test header image",
                first_name="John",
                last_name="Doe",
                category="John's category",
                about="John's bio",
            ),
        ]


def test_missing_get_user():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[UserRepository] = MissingUserRepo

    response = client.get("/api/users/1")

    app.dependency_overrides = {}

    # ASSERT
    print(response.json())
    print(response.status_code)
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "username"],
                "msg": "field required",
                "type": "value_error.missing",
            }
        ]
    }


def test_missing_update_user():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[UserRepository] = MissingUserRepo

    response = client.put(
        "/api/users/1",
        headers={"Content-Type": "application/json"},
        json={
            "email": "krze@gmail.com",
            "profile_picture": "Crze pfp",
            "display_name": "Eim_Crze",
            "header_image": "test header image",
            "first_name": "Eim",
            "last_name": "Crze",
            "category": "Crze art",
            "about": "Crze art dude",
        },
    )

    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "user_id"],
                "msg": "field required",
                "type": "value_error.missing",
            },
            {
                "loc": ["body", "username"],
                "msg": "field required",
                "type": "value_error.missing",
            },
        ]
    }


def test_missing_get_users():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[UserRepository] = MissingUserRepo

    response = client.get("/api/users")

    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "username"],
                "msg": "field required",
                "type": "value_error.missing",
            }
        ]
    }


# BRYANT'S UNIT TESTS

current_time = datetime.now()


# TEST POSTS


class EmptyPostRepository:
    def get_one(self, post_id: int):
        return PostOut(
            id=1,
            username="Brysal",
            text="hello",
            image="default image",
            created=current_time,
        )

    # Justin's update method
    def update(self, post_id: int, post: PostIn):
        return PostOut(
            id=1,
            username="Krze",
            text="WIDGET OF THE WEEK!!",
            image="picture of widget",
            created=current_time,
        )

    # Justin's delete method
    def delete(self, post_id: int):
        return True

    # Justin's create method
    def create(self, posts: PostIn):
        return PostOut(
            id=1,
            username="Krze",
            text="WIDGET OF THE WEEK!!",
            image="picture of widget",
            created=current_time,
        )

    # Justin's get all
    def get_all(self):
        return [
            PostOut(
                id=1,
                username="Krze",
                text="WIDGET OF THE WEEK!!",
                image="picture of widget",
                created=current_time,
            )
        ]


# Justin's get all method
def test_get_all():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = EmptyPostRepository

    # expected result
    desired_result = [
        {
            "id": 1,
            "username": "Krze",
            "text": "WIDGET OF THE WEEK!!",
            "image": "picture of widget",
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        }
    ]

    response = client.get("/api/posts")

    # clean up
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 200
    assert response.json() == desired_result


# Justin's update method
def test_create_post():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = EmptyPostRepository

    # expected result
    desired_result = {
        "id": 1,
        "username": "Krze",
        "text": "WIDGET OF THE WEEK!!",
        "image": "picture of widget",
        "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
    }

    # Act
    response = client.post(
        "/api/posts/",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "text": "WIDGET OF THE WEEK!!",
            "image": "picture of widget",
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )
    # clean up
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == desired_result


# Justin's update method
def test_update_post():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = EmptyPostRepository

    # variable for the url
    id = 1

    # expected result
    desired_result = {
        "id": 1,
        "username": "Krze",
        "text": "WIDGET OF THE WEEK!!",
        "image": "picture of widget",
        "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
    }

    # Act
    response = client.put(
        f"/api/posts/{id}",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "text": "WIDGET OF THE WEEK!!",
            "image": "picture of widget",
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )

    # clean up
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == desired_result


# Justin's delete method
def test_delete_post():
    # ARRANGE
    app.dependency_overrides[PostRepository] = EmptyPostRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    id = 1
    desired_result = True

    response = client.delete(f"/api/posts/{id}")

    # clean up
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 200
    assert response.json() == desired_result


# Bryant's get_one method
def test_get_post():
    # ARRANGE
    app.dependency_overrides[PostRepository] = EmptyPostRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
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
    # ASSERT
    assert response.status_code == 200
    assert response.json() == desired_result


class NoAuthPostRepository:
    # Justin's get one
    def get_one(self, post_id: int):
        return PostOut(
            id=1,
            username="Brysal",
            text="hello",
            image="default image",
            created=current_time,
        )

    # Justin's update method
    def update(self, post_id: int, post: PostIn):
        return PostOut(
            id=1,
            username="Krze",
            text="WIDGET OF THE WEEK!!",
            image="picture of widget",
            created=current_time,
        )

    # Justin's delete method
    def delete(self, post_id: int):
        return True

    # Justin's create method
    def create(self, posts: PostIn):
        return PostOut(
            id=1,
            username="Krze",
            text="WIDGET OF THE WEEK!!",
            image="picture of widget",
            created=current_time,
        )

    # Justin's get all
    def get_all(self):
        return [
            PostOut(
                id=1,
                username="Krze",
                text="WIDGET OF THE WEEK!!",
                image="picture of widget",
                created=current_time,
            )
        ]


# Justin's get all method without auth
def test_no_auth_get_all():
    # Arrange
    app.dependency_overrides[PostRepository] = NoAuthPostRepository

    response = client.get("/api/posts")

    # clean up
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 401


# Justin's update method without auth
def test_no_auth_create_post():
    # Arrange
    app.dependency_overrides[PostRepository] = NoAuthPostRepository

    # Act
    response = client.post(
        "/api/posts/",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "text": "WIDGET OF THE WEEK!!",
            "image": "picture of widget",
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )
    # clean up
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 401


# Justin's update method without auth
def test_no_auth_update_post():
    # Arrange
    app.dependency_overrides[PostRepository] = NoAuthPostRepository

    # variable for the url
    id = 1

    # Act
    response = client.put(
        f"/api/posts/{id}",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "text": "WIDGET OF THE WEEK!!",
            "image": "picture of widget",
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )

    # clean up
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 401


# Justin's delete method without auth
def test_no_auth_delete_post():
    # ARRANGE
    app.dependency_overrides[PostRepository] = NoAuthPostRepository
    id = 1
    response = client.delete(f"/api/posts/{id}")

    # clean up
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 401


# Justin's Get one without auth
def test_no_auth_get_post():
    # ARRANGE
    app.dependency_overrides[PostRepository] = NoAuthPostRepository
    id = 1

    response = client.get(f"/api/posts/{id}")
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 401


# Test Post's 404's - Justin's
class FailPostRepository:
    def get_one(self, post_id: int):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="post not found",
        )

    def update(self, post_id: int):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="post not found",
        )

    def delete(self, post_id: int):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="post not found",
        )


def test_fail_get_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = FailPostRepository

    response = client.get("/api/posts/20000")
    app.dependency_overrides = {}

    # ASSERT
    print(response.status_code)
    assert response.status_code == 404
    assert response.json() == {"detail": "post not found"}


def test_fail_update_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = FailPostRepository

    response = client.get("/api/posts/20000")
    app.dependency_overrides = {}

    # ASSERT
    print(response.status_code)
    assert response.status_code == 404
    assert response.json() == {"detail": "post not found"}


def test_fail_delete_post():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = FailPostRepository

    response = client.delete("/api/posts/20000")
    app.dependency_overrides = {}

    # ASSERT
    print(response.status_code)
    assert response.status_code == 404
    assert response.json() == {"detail": "post not found"}


# Test posts's 422's - Justin
class BadPostRepo:
    # Justin's Get One
    def get_one(self, post_id: int) -> PostOut:
        # Check the types of fields
        id = 1
        username = "Brysal"
        text = "hello"
        image = 5
        created = current_time
        if (
            not isinstance(image, str)
            or not isinstance(text, str)
            or not isinstance(username, str)
            or not isinstance(created, datetime)
        ):
            raise HTTPException(
                status_code=422,
                detail="Invalid field type",
            )
        return PostOut(created, id, username, text, image)

    # Justin's create method
    def create(self, posts: PostIn):
        id = 1
        username = "Brysal"
        text = "hello"
        image = 5
        created = current_time
        if (
            not isinstance(image, str)
            or not isinstance(text, str)
            or not isinstance(username, str)
            or not isinstance(created, datetime)
        ):
            raise HTTPException(
                status_code=422,
                detail="Invalid field type",
            )
        return PostOut(created, id, username, text, image)

    # Justin's update method
    def update(self, post_id: int, post: PostIn):
        id = 1
        username = "Brysal"
        text = "hello"
        image = 5
        created = current_time
        if (
            not isinstance(image, str)
            or not isinstance(text, str)
            or not isinstance(username, str)
            or not isinstance(created, datetime)
        ):
            raise HTTPException(
                status_code=422,
                detail="Invalid field type",
            )
        return PostOut(created, id, username, text, image)


def test_bad_get_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = BadPostRepo
    response = client.get("/api/posts/2000")
    app.dependency_overrides = {}

    # ASSERT
    print(response.status_code)
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid field type"}


def test_bad_update_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = BadPostRepo

    response = client.put(
        "/api/posts/20000",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "text": "WIDGET OF THE WEEK!!",
            "image": 5,
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )
    app.dependency_overrides = {}

    # ASSERT
    print(response.status_code)
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid field type"}


def test_bad_create_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = BadPostRepo

    response = client.post(
        "/api/posts",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "text": "WIDGET OF THE WEEK!!",
            "image": 5,
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )
    app.dependency_overrides = {}

    # ASSERT
    print(response.status_code)
    print(response.json())
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid field type"}


class MissingPostRepo:
    # Justin's Get One
    def get_one(self, post_id: int) -> PostOut:
        # Check the types of fields
        id = None
        username = None
        text = None
        created = None
        image = None
        if not image or not text or not username or not created:
            raise HTTPException(
                status_code=422,
                detail=[
                    {
                        "loc": ["body", "image"],
                        "msg": "field required",
                        "type": "value_error.missing",
                    }
                ],
            )
        return PostOut(created, id, username, image, text)

    # Justin's create method
    def create(self, post: PostIn) -> PostOut:
        if not post.text:
            raise HTTPException(
                status_code=422,
                detail=[
                    {
                        "loc": ["body", "text"],
                        "msg": "field required",
                        "type": "value_error.missing",
                    }
                ],
            )
        id = 1
        username = "Krze"
        image = "image"
        created = current_time
        return PostOut(created, id, username, image)

    # Justin's update method
    def update(self, post_id: int, post: PostIn) -> PostOut:
        if not post.text:
            raise HTTPException(
                status_code=422,
                detail=[
                    {
                        "loc": ["body", "text"],
                        "msg": "field required",
                        "type": "value_error.missing",
                    }
                ],
            )
        id = 1
        username = "Krze"
        image = "image"
        created = current_time
        return PostOut(created, id, username, image)


def test_missing_get_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = MissingPostRepo
    response = client.get("/api/posts/2000")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "image"],
                "msg": "field required",
                "type": "value_error.missing",
            }
        ]
    }


def test_missing_update_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = MissingPostRepo

    response = client.put(
        "/api/posts/20000",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "image": "image",
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "text"],
                "msg": "field required",
                "type": "value_error.missing",
            }
        ]
    }


def test_missing_create_post():
    # ARRANGE
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PostRepository] = MissingPostRepo

    response = client.post(
        "/api/posts",
        headers={"Content-Type": "application/json"},
        json={
            "id": 1,
            "username": "Krze",
            "image": "image",
            "created": current_time.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        },
    )
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "text"],
                "msg": "field required",
                "type": "value_error.missing",
            }
        ]
    }
