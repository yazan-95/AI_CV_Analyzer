from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import json
import app.analyzer as analyzer
from app.pdf_parser import extract_text_from_pdf
from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
import os

# load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later we restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    cv_text: str
    job_description: str


@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    result = analyzer.analyze_cv(request.cv_text, request.job_description)
    return {"result": result}


@app.post("/analyze-pdf")
async def analyze_pdf(file: UploadFile = File(...), job_description: str = ""):
    file_bytes = await file.read()
    cv_text = extract_text_from_pdf(file_bytes)

    result = analyzer.analyze_cv(cv_text, job_description)

    return {
        "filename": file.filename,
        "result": result
    }