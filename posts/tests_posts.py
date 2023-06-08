from main import app
from fastapi.testclient import TestClient
from users.queries.users import UserOut, UserRepository

client = TestClient(app)

def test_init():
    assert 1 == 1

# TEST CREATE POST
def fake_create_post_account():
    return UserOut(
        user_id=1,
        email="brysal@gmail.com",
        profile_picture="test pfp"
        display_name="Bry_Sal",
        header_image="test header image",
        first_name="Bry",
        last_name="Sal",
        username="Brysal",
        category="Bry art",
        about="Bry making art",
    )

class fakeUserRepo:
    def fe_get_user(self, username: str):
        return UserOut(
            user_id=1,
            email="brysal@gmail.com",
            profile_picture="test pfp"
            display_name="Bry_Sal",
            header_image="test header image",
            first_name="Bry",
            last_name="Sal",
            username="Brysal",
            category="Bry art",
            about="Bry making art",
        )


def test_create_post():
