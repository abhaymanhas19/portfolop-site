from fastapi import APIRouter
from app.schemas.mail import EmailSchema
from app.services.mail import send_email

router = APIRouter(prefix="/mail", tags=["Mail"])

@router.post("/send")
async def send_mail_endpoint(email: EmailSchema):
    await send_email(email)
    return {"message": "Email has been sent"}
