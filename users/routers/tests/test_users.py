# from users.main import app
# from fastapi.testclient import TestClient
# from queries.users import UserOut, UserIn, UserOutWithPassword, UserRepository


# client = TestClient(app)


def test_init():
    assert 1 == 1


## TEST CREATE USER ##
# def fake_get_current_account_data():
#     return UserOut(
#         user_id= 1,
#         email="krze@gmail.com",
#         profile_picture= "test pfp",
#         display_name = "Eim_Krze",
#         header_image="test header image",
#         first_name="Eim",
#         last_name="Krze",
#         username="Krze",
#         category="krze art",
#         about="krze art dude"
#     )

# class fakeUserRepo:
#     def fe_get(self, username: str):
#         return UserOut(
#             user_id= 1,
#             email="krze@gmail.com",
#             profile_picture= "test pfp",
#             display_name = "Eim_Krze",
#             header_image="test header image",
#             first_name="Eim",
#             last_name="Krze",
#             username="Krze",
#             category="krze art",
#             about="krze art dude"
#         )

# def test_get_user():
#     # Arrange
#     app.dependency_overrides[UserRepository] = fakeUserRepo

#     # Act
#     response = client.get("/api/users/Krze")

#     # Clean up
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == UserOut(
#         user_id= 1,
#         email="krze@gmail.com",
#         profile_picture= "test pfp",
#         display_name = "Eim_Krze",
#         header_image="test header image",
#         first_name="Eim",
#         last_name="Krze",
#         username="Krze",
#         category="krze art",
#         about="krze art dude"
#     )
