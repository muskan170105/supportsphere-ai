import secrets

from tools.base_tool import BaseTool


class PasswordTool(BaseTool):
    """
    Business tool responsible for password reset.
    """

    def __init__(self, user_repository):
        self.user_repository = user_repository

    def execute(self, email: str):

        user = self.user_repository.find_by_email(email)

        if user is None:
            return {
                "success": False,
                "message": "No account exists with the provided email address.",
            }

        reset_token = secrets.token_urlsafe(32)

        self.user_repository.update_reset_token(
            email=email,
            reset_token=reset_token,
        )

        return {
            "success": True,
            "email": email,
            "reset_token": reset_token,
            "message": "Password reset request created successfully.",
        }