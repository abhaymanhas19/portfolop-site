import cloudinary.uploader
from cloudinary.uploader import upload


def cloudinary_uploader(file_obj):
    file_bytes = await file_obj.read()
    upload_result = upload(file_bytes, folder="abhay")
    return upload_result
    
