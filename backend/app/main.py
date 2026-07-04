
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageRequest(BaseModel):
    image: str


@app.get("/")
def home():
    return {"message": "SignSync Backend Running"}


@app.post("/predict")
def predict(data: ImageRequest):

    print("Request received")

    print(data.image[:50])

    return {
        "sign":"A",
        "accuracy":96,
        "latency":42
    }