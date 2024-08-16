from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from datetime import datetime, timedelta
from uuid import uuid4
import os
import shutil
import asyncio

app = FastAPI()

# Directory for storing uploaded files
os.makedirs("uploaded_files", exist_ok=True)

# Serve static files
app.mount("/uploaded_files", StaticFiles(directory="uploaded_files"), name="uploaded_files")

# Configure CORS to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Item(BaseModel):
    uuid: str
    original_name: str
    file_path: str
    expiry: datetime
    file_type: str

# In-memory storage
storage = {}

@app.post("/upload-file/")
async def upload_file(file: UploadFile = File(...), days: int = Form(1)):
    expiry_time = datetime.utcnow() + timedelta(days=days)
    uuid = str(uuid4())
    extension = os.path.splitext(file.filename)[1]
    file_location = f"uploaded_files/{uuid}{extension}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    storage[uuid] = Item(uuid=uuid, original_name=file.filename, file_path=file_location, expiry=expiry_time, file_type="file")
    return {"uuid": uuid, "original_name": file.filename, "expiry_time": expiry_time.isoformat()}

@app.post("/upload-text/")
async def upload_text(text: str = Form(...), days: int = Form(1)):
    expiry_time = datetime.utcnow() + timedelta(days=days)
    uuid = str(uuid4())
    preview_text = (text[:30] + '...') if len(text) > 30 else text
    file_location = f"uploaded_files/{uuid}.txt"
    with open(file_location, "w") as file_object:
        file_object.write(text)
    storage[uuid] = Item(uuid=uuid, original_name=preview_text, file_path=file_location, expiry=expiry_time, file_type="text")
    return {"uuid": uuid, "original_name": preview_text, "expiry_time": expiry_time.isoformat()}

@app.get("/fetch_text/{uuid}")
async def fetch_text(uuid: str):
    item = storage.get(uuid)
    if not item or item.expiry < datetime.utcnow() or item.file_type != "text":
        raise HTTPException(status_code=404, detail="Text not found or expired")
    
    with open(item.file_path, "r") as file_object:
        content = file_object.read()
    return {"content": content}

@app.get("/fetch_file/{uuid}")
async def fetch_file(uuid: str):
    item = storage.get(uuid)
    if not item or item.expiry < datetime.utcnow() or item.file_type != "file":
        raise HTTPException(status_code=404, detail="File not found or expired")
    
    file_url = f"http://localhost:8000/{item.file_path}"
    return {"file_url": file_url, "original_name": item.original_name}

@app.get("/items/")
async def list_items():
    current_time = datetime.utcnow()
    return [
        {
            "uuid": uuid,
            "original_name": storage[uuid].original_name,
            "expiry_time": storage[uuid].expiry.isoformat(),
            "is_expired": storage[uuid].expiry < current_time,
            "file_type": storage[uuid].file_type
        }
        for uuid in storage
    ]

@app.on_event("startup")
async def startup_event():
    import asyncio
    asyncio.create_task(cleanup_expired_files())

async def cleanup_expired_files():
    while True:
        await asyncio.sleep(3600)  # Sleep for 1 hour
        for uuid in list(storage.keys()):
            if storage[uuid].expiry < datetime.utcnow():
                os.remove(storage[uuid].file_path)
                del storage[uuid]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)