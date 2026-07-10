import re


class EntityExtractor:

    ORDER_ID = re.compile(r"#?(\d{4,10})")

    EMAIL = re.compile(

        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"

    )

    PHONE = re.compile(

        r"\b\d{10}\b"

    )

    OTP = re.compile(

        r"\b\d{4,8}\b"

    )

    def extract(
        self,
        text: str,
    ):

        entities = {}

        order = self.ORDER_ID.search(text)

        if order:

            entities["order_id"] = order.group(1)

        email = self.EMAIL.search(text)

        if email:

            entities["email"] = email.group()

        phone = self.PHONE.search(text)

        if phone:

            entities["phone"] = phone.group()

        otp = self.OTP.search(text)

        if otp:

            entities["otp"] = otp.group()

        return entities