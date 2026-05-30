from app.config import settings
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.schemas.mail import EmailSchema

# Configuration loaded from environment variables via Settings
conf = ConnectionConfig(
    MAIL_USERNAME = settings.mail_username or "",
    MAIL_PASSWORD = settings.mail_password or "",
    MAIL_FROM = settings.mail_from or "",
    MAIL_PORT = settings.mail_port,
    MAIL_SERVER = settings.mail_server,
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True
)

async def send_email(email: EmailSchema):
    message = MessageSchema(
        subject=email.subject,
        recipients=email.email,
        body=email.body,
        subtype="html"
    )
    fm = FastMail(conf)
    await fm.send_message(message)
