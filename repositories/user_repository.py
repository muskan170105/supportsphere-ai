from data.users import USERS


class UserRepository:
    """
    Repository responsible for all user-related
    data access operations.
    """

    def find_by_email(self, email: str):
        """
        Find a user using their email address.

        Args:
            email: User's email address.

        Returns:
            dict | None
        """

        for user in USERS.values():
            if user["email"].lower() == email.lower():
                return user

        return None

    def update_reset_token(
        self,
        email: str,
        reset_token: str,
    ) -> bool:
        """
        Store a password reset token for the user.

        Returns:
            True if updated successfully,
            otherwise False.
        """

        user = self.find_by_email(email)

        if user is None:
            return False

        user["reset_token"] = reset_token
        return True

    def increment_failed_login_attempts(
        self,
        email: str,
    ) -> bool:
        """
        Increase failed login attempts by one.
        """

        user = self.find_by_email(email)

        if user is None:
            return False

        user["failed_login_attempts"] += 1

        return True

    def reset_failed_login_attempts(
        self,
        email: str,
    ) -> bool:
        """
        Reset failed login attempts.
        """

        user = self.find_by_email(email)

        if user is None:
            return False

        user["failed_login_attempts"] = 0

        return True