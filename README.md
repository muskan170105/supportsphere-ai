# SupportSphere AI

> An AI-powered multi-agent customer support platform combining LLM reasoning, Retrieval-Augmented Generation (RAG), business tool execution, conversational memory, safety guardrails, confidence scoring, and execution observability.

---

## Overview

SupportSphere AI is an intelligent customer support platform designed to go beyond a traditional chatbot.

Instead of sending every user message directly to a Large Language Model, SupportSphere AI processes conversations through a structured AI orchestration pipeline.

Depending on the user's request, the system can:

- Understand and classify the user's intent
- Maintain context across multiple conversation turns
- Retrieve organization-specific information from a Knowledge Base
- Route requests to business tools
- Ask for missing information using slot filling
- Require explicit confirmation before sensitive actions
- Generate context-aware final responses
- Calculate confidence information
- Expose the internal AI execution flow through an observability interface

The project demonstrates how LLMs can be combined with deterministic application logic, RAG, tool calling, memory, and safety mechanisms to build a more complete AI application.

---

# Key Features

## 1. Multi-Agent AI Orchestration

SupportSphere AI uses a modular AI pipeline in which specialized components are responsible for different stages of request processing.

The major stages include:

- Memory Stage
- Planner Stage
- Guardrail Stage
- Tool Stage
- Retriever Stage
- Confidence Stage
- Response Stage
- Finalization

This separation makes the system easier to understand, debug, extend, and observe.

---

## 2. Intelligent Planner Agent

The Planner Agent analyzes the customer request and determines:

- The user's intent
- Whether RAG is required
- Whether a business tool is required
- Which tool should be selected
- Required parameters
- Missing parameters
- Planner confidence
- Reasoning behind the decision

Example intents include:

- `ORDER_TRACKING`
- `REFUND_REQUEST`
- `PASSWORD_RESET`
- `PAYMENT_FAILURE`
- `GENERAL_INFORMATION`

Example:

```text
User:
What is your refund policy?
```

The planner can classify this as an informational request and route it to the RAG pipeline.

```text
Intent: GENERAL_INFORMATION
Need RAG: True
Tool: None
```

For:

```text
Track order 12345
```

the planner can route the request to the order-tracking business tool.

```text
Intent: ORDER_TRACKING
Need RAG: False
Tool: ORDER_TRACKING
```

---

## 3. Retrieval-Augmented Generation (RAG)

SupportSphere AI contains a Knowledge Base for answering organization-specific questions.

The RAG pipeline uses:

- Document loading
- Text processing
- Embeddings
- Semantic retrieval
- ChromaDB vector storage
- Retrieved context injection

For example:

```text
What is your refund policy?
```

Instead of relying only on the LLM's general knowledge, the system retrieves relevant information from the organization's Knowledge Base and uses that context to generate the response.

This helps make responses more grounded in business-specific information.

---

## 4. Knowledge Base

The platform includes a dedicated Knowledge Base interface.

It can be used to represent and manage organization-specific documents such as:

- Refund policies
- Shipping policies
- Product information
- FAQs
- Support documentation

The UI also provides document preview capabilities.

The current project demonstrates semantic retrieval from the Knowledge Base using vector embeddings and ChromaDB.

---

## 5. Business Tool Calling

SupportSphere AI can route operational requests to business tools instead of attempting to answer everything through an LLM.

The project includes tool-oriented workflows such as:

- Order tracking
- Refund requests
- Payment-related operations
- Password-related operations

Examples of tool classes used in the project include:

- `TrackingTool`
- `RefundTool`
- `PaymentTool`
- `PasswordTool`

Example:

```text
User:
Track order 12345
```

The system can:

1. Detect `ORDER_TRACKING`
2. Extract the order ID
3. Select the tracking tool
4. Execute the business operation
5. Pass the tool result to the response layer
6. Generate a customer-friendly final response

---

## 6. Conversation Memory

SupportSphere AI maintains conversational state across multiple user messages.

This allows the system to understand contextual follow-ups.

Example:

```text
User:
Track order 12345
```

Followed by:

```text
User:
Refund it
```

The system can use the existing conversation context to understand that `it` refers to the previously discussed order.

The conversation engine supports decisions such as:

- `RUN_PLANNER`
- `FOLLOW_UP`
- `SLOT_FILLING`
- `PARAMETER_CORRECTION`
- `INTENT_SWITCH`

This enables more natural multi-turn conversations.

---

## 7. Slot Filling

Some business operations require information that may not be present in the original user request.

SupportSphere AI can identify missing parameters and continue the conversation to collect them.

Example:

```text
User:
I want to reset my password.
```

If an email address is required but missing, the system can request it before attempting to execute the corresponding action.

This prevents business tools from running with incomplete input.

---

## 8. Safety Guardrails

State-changing operations should not execute immediately without explicit customer approval.

SupportSphere AI includes a Guardrail Stage that protects sensitive operations.

Examples include:

- Refund requests
- Password resets
- Order cancellation
- Item replacement
- Account deletion
- Address updates
- Ticket closure

Example:

```text
User:
Refund it.
```

The system does not immediately execute the refund.

Instead, it asks:

```text
Before I proceed, please confirm that you'd like me to submit the refund request.
```

Only after explicit confirmation:

```text
Yes
```

can the action proceed.

The guardrail therefore separates:

```text
User intent
        ↓
Action request
        ↓
Explicit confirmation
        ↓
Tool execution
```

---

## 9. Confidence Engine

The system includes a confidence evaluation stage.

The frontend can display:

- Confidence score
- Confidence level
- Confidence reason

Example levels include:

- High Confidence
- Medium Confidence
- Low Confidence

The confidence information provides additional visibility into the AI pipeline and retrieval quality.

---

## 10. AI Observability

SupportSphere AI includes an Enterprise Observability / AI Reasoning panel.

The panel can expose information such as:

- Planner decision
- Detected intent
- Selected tool
- Whether RAG was required
- Retriever execution
- Retrieved sources
- Tool execution
- Guardrail status
- Confidence score
- Memory before execution
- Memory after execution
- Execution timeline
- Response latency

This makes the internal AI workflow visible during development and debugging.

---

## 11. Developer Mode

SupportSphere AI supports two execution modes.

### Developer Mode

```python
DEV_MODE = True
```

Developer Mode uses a simulated deterministic AI service for development and testing.

Benefits include:

- No LLM API usage for supported simulated flows
- Faster local testing
- Predictable planner outputs
- Easier debugging of orchestration logic

### Real Gemini Mode

```python
DEV_MODE = False
```

When Developer Mode is disabled, the application follows the real Gemini-powered execution path.

A valid Google API key is required.

---

# Application Interface

The frontend contains several major sections.

## Dashboard

Provides an overview of the customer support system and operational information.

## Live Chat

The main customer-support workspace where users interact with SupportSphere AI.

The interface includes:

- Customer messages
- AI responses
- Confidence information
- Suggested actions
- Customer profile information
- AI observability information

The chat area supports scrolling for longer conversations.

## Analytics

Provides visual information related to AI and support-system performance.

Depending on the available execution data, this can include information such as:

- Response latency
- Confidence
- RAG usage
- Tool execution
- Support activity

## Knowledge Base

Provides access to organization-specific knowledge documents used by the RAG pipeline.

## Reports

Provides a dedicated area for support-related reporting and system information.

## Settings

Provides application-level configuration, including Developer Mode controls.

---

# System Architecture

The high-level workflow is:

```text
Customer
   │
   ▼
User Query
   │
   ▼
┌───────────────────────────────┐
│         Memory Stage          │
│                               │
│  • Loads conversation state   │
│  • Detects follow-ups         │
│  • Detects intent switches    │
│  • Handles slot filling       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│         Planner Agent         │
│                               │
│  • Detects intent             │
│  • Decides RAG requirement    │
│  • Selects business tool      │
│  • Detects missing parameters │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│        Guardrail Stage        │
│                               │
│  • Detects sensitive actions  │
│  • Requires confirmation      │
└───────────────┬───────────────┘
                │
          ┌─────┴─────┐
          │           │
          ▼           ▼
┌──────────────┐  ┌──────────────┐
│  Tool Stage  │  │  Retriever   │
│              │  │    Stage     │
│ Business     │  │              │
│ operations   │  │ RAG + Vector │
│              │  │ Knowledge    │
└──────┬───────┘  └──────┬───────┘
       │                 │
       └────────┬────────┘
                │
                ▼
┌───────────────────────────────┐
│       Confidence Engine       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│         Response Agent        │
│                               │
│  • Uses retrieved context     │
│  • Uses tool results          │
│  • Uses conversation history  │
│  • Generates final response   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│          Finalization         │
│                               │
│  • Updates execution data     │
│  • Updates memory             │
│  • Prepares frontend output   │
└───────────────┬───────────────┘
                │
                ▼
           AI Response
```

---

# Example End-to-End Workflow

Consider the following conversation.

### Step 1 — Knowledge Request

```text
User:
What is your refund policy?
```

Possible pipeline:

```text
Memory
   ↓
Planner
   ↓
GENERAL_INFORMATION
   ↓
RAG Required
   ↓
Retriever
   ↓
Knowledge Base
   ↓
Response Agent
```

---

### Step 2 — Tool Request

```text
User:
Track order 12345
```

Possible pipeline:

```text
Planner
   ↓
ORDER_TRACKING
   ↓
Tracking Tool
   ↓
Order Result
   ↓
Response Agent
```

---

### Step 3 — Contextual Follow-Up

```text
User:
Refund it
```

Conversation memory retains:

```text
order_id = 12345
```

The system identifies the new refund intent while retaining the relevant order context.

---

### Step 4 — Guardrail

Because a refund changes business state:

```text
Refund Request
      ↓
Guardrail
      ↓
Confirmation Required
```

The tool does not execute yet.

---

### Step 5 — Confirmation

```text
User:
Yes
```

The workflow becomes:

```text
Confirmation
      ↓
Guardrail Passed
      ↓
Refund Tool
      ↓
Action Executed
      ↓
Final Response
```

This single conversation demonstrates:

- RAG
- Intent detection
- Tool calling
- Conversation memory
- Intent switching
- Guardrails
- Confirmation handling
- Response generation

---

# Technology Stack

## Backend

- Python
- FastAPI
- LangChain
- Google Gemini
- Google Generative AI Embeddings
- ChromaDB

## Frontend

- React
- Vite
- Tailwind CSS

## AI Architecture

- Large Language Models
- Multi-agent / multi-stage orchestration
- Retrieval-Augmented Generation
- Semantic search
- Vector embeddings
- Tool calling
- Conversation memory
- Slot filling
- Guardrails
- Confidence evaluation
- AI observability

---

# Project Structure

The exact structure may evolve, but the project is organized approximately as follows:

```text
supportsphere-ai/
│
├── backend/
│   │
│   ├── agents/
│   │   ├── planner.py
│   │   ├── response.py
│   │   ├── tool_agent.py
│   │   └── history.py
│   │
│   ├── core/
│   │   ├── conversation/
│   │   │   ├── conversation_engine.py
│   │   │   ├── conversation_context.py
│   │   │   ├── entity_extractor.py
│   │   │   ├── retrieval_cache.py
│   │   │   └── topic_detector.py
│   │   │
│   │   ├── memory/
│   │   │
│   │   ├── orchestration/
│   │   │   ├── context.py
│   │   │   ├── memory_stage.py
│   │   │   ├── planner_stage.py
│   │   │   ├── guardrail_stage.py
│   │   │   ├── tool_stage.py
│   │   │   ├── retriever_stage.py
│   │   │   ├── confidence_stage.py
│   │   │   ├── response_stage.py
│   │   │   └── finalizer.py
│   │   │
│   │   ├── config.py
│   │   ├── execution_logger.py
│   │   ├── logger.py
│   │   └── orchestrator.py
│   │
│   ├── data/
│   ├── dev/
│   ├── prompts/
│   ├── repositories/
│   ├── schemas/
│   ├── state/
│   ├── tools/
│   │
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── analytics/
│   │   │   ├── chat/
│   │   │   ├── customer/
│   │   │   ├── sidebar/
│   │   │   └── topbar/
│   │   │
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

> The repository structure shown above is a high-level representation. Refer to the repository itself for the latest file structure.

---

# Getting Started

Follow these steps to run SupportSphere AI on another system.

---

## Prerequisites

Install the following software before starting:

### Required

- Python
- Node.js
- npm
- Git

Recommended:

```text
Python 3.10+
Node.js 18+
```

A Google Gemini API key is also required when running the application with Developer Mode disabled.

---

# 1. Clone the Repository

Open a terminal and run:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd supportsphere-ai
```

---

# 2. Backend Setup

Move into the backend directory:

```bash
cd backend
```

## Create a Virtual Environment

### Windows

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate again:

```powershell
.\venv\Scripts\Activate.ps1
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

# 3. Install Backend Dependencies

With the virtual environment activated:

```bash
pip install -r requirements.txt
```

If your repository does not yet contain a `requirements.txt`, generate it from the working environment before publishing the project:

```bash
pip freeze > requirements.txt
```

Commit the generated file so that other users can install the same dependencies.

---

# 4. Configure Environment Variables

Create a `.env` file inside the backend directory if that is where your application loads environment variables.

Example:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

Never commit your real `.env` file or API key to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
venv/
__pycache__/
*.pyc
```

It is recommended to provide an example environment file:

```text
.env.example
```

Example:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

---

# 5. Select Execution Mode

Open:

```text
backend/core/config.py
```

For local deterministic development:

```python
DEV_MODE = True
```

For real Gemini execution:

```python
DEV_MODE = False
```

When using:

```python
DEV_MODE = False
```

make sure `GOOGLE_API_KEY` is correctly configured.

---

# 6. Start the Backend

From inside the `backend` directory, with the virtual environment activated:

```bash
python -m uvicorn app:app --reload
```

The backend should start on:

```text
http://127.0.0.1:8000
```

Do not use:

```bash
python -m uvicorn main:app --reload
```

for the web application if `main.py` is a separate CLI entry point.

The FastAPI application entry point for the current project is:

```text
app.py
```

---

# 7. Frontend Setup

Open a second terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the frontend address in the terminal.

It will typically be similar to:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

# Complete Local Startup

After the initial installation, the project can normally be started using two terminals.

## Terminal 1 — Backend

```powershell
cd supportsphere-ai\backend

.\venv\Scripts\Activate.ps1

python -m uvicorn app:app --reload
```

## Terminal 2 — Frontend

```powershell
cd supportsphere-ai\frontend

npm run dev
```

Then open:

```text
http://localhost:5173
```

or the URL displayed by Vite.

---

# Testing the Application

A useful end-to-end test sequence is:

## Test 1 — RAG

```text
What is your refund policy?
```

Expected behavior:

- Planner identifies an informational request
- RAG is enabled
- Retriever searches the Knowledge Base
- Relevant document context is retrieved
- Response is generated using retrieved information

---

## Test 2 — Business Tool

```text
Track order 12345
```

Expected behavior:

- `ORDER_TRACKING` intent is detected
- RAG is skipped
- Order tracking tool executes
- Order information is returned

---

## Test 3 — Conversation Memory

```text
Refund it
```

Expected behavior:

- The conversation switches to refund intent
- The previously discussed order context is retained
- The refund is not immediately executed
- Confirmation is requested

---

## Test 4 — Guardrail Confirmation

```text
Yes
```

Expected behavior:

- Confirmation is detected
- Guardrail allows the action
- Refund tool executes
- Final confirmation response is generated

---

# Developer Mode Testing

To test without real LLM calls:

```python
DEV_MODE = True
```

Restart the backend after changing the configuration.

The terminal may show developer-specific planner execution logs.

---

# Real Gemini Testing

Set:

```python
DEV_MODE = False
```

Ensure the `.env` contains:

```env
GOOGLE_API_KEY=your_valid_api_key
```

Restart the backend.

When the real model path is active, developer-specific planner messages such as:

```text
>>> NEW DEV PLANNER RUNNING <<<
```

should not appear.

---

# API Documentation

When the FastAPI backend is running, interactive API documentation is typically available through FastAPI's Swagger interface.

Open:

```text
http://127.0.0.1:8000/docs
```

This can be used to inspect and test available backend endpoints.

---

# Troubleshooting

## `GOOGLE_API_KEY not found`

Make sure:

1. A `.env` file exists in the expected directory.
2. It contains:

```env
GOOGLE_API_KEY=your_key_here
```

3. The backend is restarted after modifying the environment variables.

---

## Uvicorn Launcher Error

Instead of:

```bash
uvicorn app:app --reload
```

use:

```bash
python -m uvicorn app:app --reload
```

This ensures Uvicorn runs using the Python interpreter from the currently active environment.

---

## Wrong Application Starts

Make sure you are inside:

```text
supportsphere-ai/backend
```

and run:

```bash
python -m uvicorn app:app --reload
```

The FastAPI entry point is `app.py`.

---

## PowerShell Cannot Activate Virtual Environment

Run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then:

```powershell
.\venv\Scripts\Activate.ps1
```

---

## Frontend Cannot Connect to Backend

Verify that:

- The backend is running
- The frontend API base URL points to the correct backend
- The backend port is correct
- CORS configuration allows the frontend origin

Typical local addresses are:

```text
Frontend: http://localhost:5173
Backend:  http://127.0.0.1:8000
```

---

## RAG Does Not Return Documents

Check that:

- The Knowledge Base documents are available
- Documents have been processed
- Embeddings were successfully generated
- The ChromaDB vector store exists
- The Google API key is available if the embedding model requires it

---

# Security Notes

Before publishing or deploying the repository:

- Never commit `.env`
- Never commit API keys
- Remove secrets from Git history if accidentally committed
- Use environment variables for credentials
- Validate all tool inputs
- Keep confirmation guardrails for sensitive actions
- Add authentication before exposing real customer or business data
- Replace simulated repositories with secured production integrations before real-world deployment

---

# Current Project Status

The current version demonstrates the core architecture of SupportSphere AI, including:

- Multi-stage AI orchestration
- Real Gemini integration
- Developer Mode
- RAG
- Knowledge Base
- ChromaDB
- Semantic retrieval
- Business tools
- Conversation memory
- Follow-up handling
- Intent switching
- Slot filling
- Confirmation guardrails
- Confidence scoring
- Execution logging
- AI observability
- Live Chat
- Customer information interface
- Dashboard
- Analytics
- Settings

The current version should be considered a functional project/prototype demonstrating the architecture and major workflows rather than a fully production-deployed enterprise customer-support system.

---

# Future Scope

Potential future improvements include:

- Production authentication and authorization
- Role-based access control
- Persistent production database
- Persistent conversation storage
- Real customer accounts
- Real order-management integrations
- Real payment gateway integrations
- CRM integrations
- Ticketing-system integrations
- Additional AI tools
- Background job processing
- Streaming responses
- Improved document ingestion
- Advanced RAG evaluation
- Hybrid retrieval and reranking
- Automated AI evaluations
- Improved monitoring and tracing
- Human-agent handoff
- Multilingual support
- Notifications
- Cloud deployment
- Horizontal scaling
- Production security hardening

---

# Important Note

SupportSphere AI is currently a demonstration and learning project.

Business tools and customer data used in the current implementation may use simulated or local repository data and should not be interpreted as integrations with real payment, refund, authentication, or order-management infrastructure.

State-changing workflows are designed to demonstrate how confirmation guardrails can be incorporated into an AI application.

---

# Author

**Muskan Jangra**

B.Tech Computer Science and Engineering  
Lovely Professional University

---

# License

This project is currently intended for educational and portfolio purposes.

Add an appropriate open-source license before allowing unrestricted reuse or distribution.

---

# SupportSphere AI

SupportSphere AI demonstrates a key principle of modern AI application engineering:

> A reliable AI product is more than an LLM call.

The platform combines:

**LLM Intelligence + RAG + Business Tools + Conversation Memory + Guardrails + Confidence + Observability**

to create a structured intelligent customer-support experience.
