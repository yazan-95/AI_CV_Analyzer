# 🚀 AI CV Analyzer

An AI-powered web application that evaluates resumes against job descriptions and provides a match score with actionable insights to improve candidate alignment.

---

## 🧠 Overview

This project demonstrates a full-stack AI workflow where user input (CV + job description) is processed through a backend analysis engine to generate structured insights, including:

- Match score
- Strengths & weaknesses
- Missing skills
- Recommendations

Built with a focus on **real-world SaaS UX**, performance, and clean architecture.

---

## ✨ Features

- 📄 Analyze CV via text input or PDF upload  
- 🧠 AI-driven matching logic  
- 📊 Visual match score indicator  
- 💡 Actionable recommendations  
- ⚠️ Weakness & missing skills detection  
- ⏳ Step-based loading feedback (UX-focused)  
- 🎨 Modern responsive UI (dark SaaS style)  
- 🔔 Real-time feedback with toast notifications  

---

## 🧱 Tech Stack

### Frontend
- React (Hooks)
- Tailwind CSS
- React Hot Toast

### Backend
- FastAPI (Python)
- NLP-based text processing

---

## ⚙️ System Architecture

---

## 📸 Screenshots
~/cv-analyzer-frontend/screenshots

## 🎥 Demo
https://www.youtube.com/watch?v=SczW2jvimyI&list=PLUPKIy6wuNrXKIdzBvKXDcNZ451F49lck

## 🚀 Getting Started

### Backend
```bash
cd backend
uvicorn main:app --reload

### 🟣 Input Interface
![Input UI](./screenshots/input.png)

### 🟡 Loading Experience
![Loading](./screenshots/loading.png)

### 🟢 Analysis Results
![Result](./screenshots/result.png)
