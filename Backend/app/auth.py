import os
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request

class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form.get("username"), form.get("password")

        expected_user = os.getenv("ADMIN_USER", "abhayramgarhia19@outlook.com")
        expected_pass = os.getenv("ADMIN_PASSWORD", "admin")

        if username == expected_user and password == expected_pass:
            # Store a simple token in the session
            request.session.update({"token": "admin_session_secure_token"})
            return True
        return False

    async def logout(self, request: Request) -> bool:
        # Clear the session on logout
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        # Check if the token exists in the session
        token = request.session.get("token")
        if not token:
            return False
        return token == "admin_session_secure_token"
