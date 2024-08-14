from pydantic import BaseModel
from datetime import datetime

class Item(BaseModel):
    uuid: str
    original_name: str
    expiry: datetime