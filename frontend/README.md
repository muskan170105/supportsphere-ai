# 🚀 SupportSphere AI

SupportSphere AI is an enterprise-inspired AI customer support platform built using **LangChain, FastAPI, React, Gemini, and ChromaDB**. It combines RAG, tool calling, conversation memory, and multi-agent orchestration to automate customer support.

---

## ✨ Features

- 🤖 Multi-Agent AI Architecture
- 📚 RAG using ChromaDB
- 🛠 Tool Calling
- 🧠 Conversation Memory
- 🛡 Guardrails for sensitive actions
- 📊 Analytics Dashboard
- 💬 Live Chat Interface
- 👤 Customer Profile
- ⚙ Runtime Settings
- 📈 AI Execution Timeline

---

## 🏗 AI Architecture

```
                                SUPPORTSPHERE AI
                    Enterprise Multi-Agent Execution Workflow

                                     User
                                      │
                                      ▼
                          Customer Query Received
                                      │
                                      ▼
                           Conversation Orchestrator
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            │                                                   │
            ▼                                                   ▼
     Memory Stage                                    Execution Logger
(Read previous context,                         (Logs every stage, timing,
 active intent, parameters)                     confidence & analytics)
            │
            ▼
      Planner Agent (Gemini)
 ┌───────────────────────────────────────┐
 │ • Understand user intent              │
 │ • Decide Tool / RAG                   │
 │ • Extract parameters                  │
 │ • Detect missing information          │
 └───────────────────────────────────────┘
            │
            ▼
      Guardrail Stage
 ┌───────────────────────────────────────┐
 │ Confirmation Required?                │
 │ • Refund                              │
 │ • Password Reset                      │
 │ • Sensitive Operations                │
 └───────────────────────────────────────┘
            │
      ┌─────┴─────┐
      │           │
      │No         │Yes
      │           ▼
      │     Ask for Confirmation
      │           │
      │     Wait for User Reply
      │           │
      └───────────┘
            │
            ▼
       Tool Required?
      ┌─────┴──────┐
      │            │
     Yes           No
      │            │
      ▼            ▼
 Tool Agent    Retriever Agent (RAG)
      │        ┌────────────────────────────┐
      │        │ ChromaDB                   │
      │        │ Company Documents          │
      │        │ Policies & FAQs            │
      │        └────────────────────────────┘
      │                    │
      └────────────┬───────┘
                   ▼
             Response Agent
      ┌────────────────────────────┐
      │ Gemini generates final     │
      │ natural language response  │
      └────────────────────────────┘
                   │
                   ▼
               Finalizer
      ┌────────────────────────────┐
      │ • Update Conversation       │
      │ • Update Memory             │
      │ • Store Sources             │
      │ • Build Summary             │
      │ • Calculate Confidence      │
      │ • Generate Timeline         │
      │ • Export Execution Logs     │
      └────────────────────────────┘
                   │
                   ▼
              React Dashboard
      ┌────────────────────────────┐
      │ Live Chat                  │
      │ AI Reasoning Panel         │
      │ Customer Profile           │
      │ Analytics Dashboard        │
      │ System Health              │
      │ Timeline                   │
      └────────────────────────────┘
```

---

## 🛠 Tech Stack

### Backend
- FastAPI
- LangChain
- Gemini 2.5 Flash
- ChromaDB
- Pydantic

### Frontend
- React
- Tailwind CSS
- Recharts
- Lucide Icons

---

## 🤖 Supported Capabilities

- Order Tracking
- Refund Processing
- Payment Assistance
- Password Reset
- FAQ & Policy Retrieval
- Conversation Memory
- Execution Analytics

---

## 📊 Dashboard

The platform includes:

- Live Chat
- Analytics Dashboard
- AI Reasoning Panel
- Customer Profile
- System Health
- Recent Activity
- Runtime Settings

---

## 🚧 Current Development

Currently improving:

- Planner intelligence
- Better information vs action classification
- Prompt optimization
- Multi-turn conversation handling
- Smarter memory reasoning

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/supportsphere-ai.git
cd supportsphere-ai
```

### 2. Setup Backend

```bash
cd backend

python -m venv venv
venv\Scripts\activate      # Windows

pip install -r requirements.txt
```

Create a `.env` file:

```env
GOOGLE_API_KEY=YOUR_API_KEY
DEV_MODE=False
```

Build the vector database:

```bash
python vector_store/build_vector_db.py
```

Start the backend:

```bash
uvicorn app:app --reload
```

---

### 3. Setup Frontend

```bash
cd frontend

npm install
npm run dev
```

---

### 4. Open the Application

Frontend → **http://localhost:5173**

Backend API → **http://localhost:8000**

API Docs → **http://localhost:8000/docs**
---
