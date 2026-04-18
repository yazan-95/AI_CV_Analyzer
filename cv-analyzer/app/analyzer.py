from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY is not set")

client = OpenAI(api_key=api_key)


def analyze_cv(cv_text: str, job_description: str):
    prompt = f"""
Return ONLY valid JSON.

Schema:
{{
  "match_score": number,
  "strengths": [string],
  "weaknesses": [string],
  "missing_skills": [string],
  "recommendation": string
}}

Compare CV with Job Description.

CV:
{cv_text}

Job Description:
{job_description}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a strict HR analysis engine."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content