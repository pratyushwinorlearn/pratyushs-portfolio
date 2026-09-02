# 🚀 PortfolioOS: AI-Powered Interactive Portfolio

Welcome to **PortfolioOS**, a highly interactive, retro-futuristic portfolio featuring a 3D desktop OS experience and a draggable 2D mobile breadboard. It is powered by a custom-built, production-deployed Retrieval-Augmented Generation (RAG) AI assistant that allows visitors to natively query my background, tech stack, and software projects. 

Created by Shekhar Pratyush, a B.Tech Computer Science and Engineering student at Bennett University.

## ✨ Features

* **🖥️ Interactive 3D Desktop (PC):** A fully immersive OS environment where visitors can explore my software engineering and full-stack development skills natively.
* **📱 Draggable Breadboard UI (Mobile):** A custom infinite-canvas mobile fallback featuring an ESP-32 brain, OLED/TFT screens, and a locked bottom-right floating AI chat widget.
* **🧠 Production-Grade RAG Engine:** A custom lexical search backend built to fit entirely within a strict 512MB RAM cloud free-tier limit.
* **⚡ Real-Time AI Chat:** Token-by-token streaming via plain text using Groq's high-speed inference engine for ultra-low latency.
* **🛡️ Auto-Healing Model Selection:** The backend automatically queries Groq's live API endpoints to detect available models (e.g., `qwen/qwen3.6-27b`) and falls back seamlessly if a model is decommissioned.

## 🏗️ Architecture & Tech Stack

### Frontend (Client)
* **Framework:** React + Vite
* **UI/UX:** React Three Fiber (3D), Framer Motion, Tailwind CSS
* **Deployment:** Vercel

### Backend (RAG API)
* **Framework:** FastAPI + Uvicorn (Python)
* **Retrieval Engine:** Custom BM25 (`rank-bm25`) matching against local markdown chunks representing my projects like `persona-ai` and `HateMM`.
* **LLM Generation:** Groq API with reasoning tags (`<think>`) explicitly disabled for clean, concise output.
* **Local Fallback:** Integrated Ollama (`qwen2.5:7b-instruct`) for local RTX 4060 GPU execution.
* **Deployment:** Render Web Service (Free Tier)

## 🛠️ The RAG Engineering Challenge & Trade-offs

Building a machine learning backend on zero-cost cloud infrastructure required strict engineering trade-offs:

1. **Beating the 512MB RAM Limit (The BM25 Pivot):** 
   Heavy embedding models (`sentence-transformers`), neural cross-encoders, and vector databases (`ChromaDB`) immediately triggered Out-Of-Memory (OOM) crashes on Render. To fix this, all PyTorch dependencies were stripped out in favor of a pure-Python statistical lexical ranking algorithm (BM25). Memory overhead dropped from hundreds of megabytes down to ~10 MB, enabling instant server boots.
2. **Robust Tokenization:** 
   Custom Regex tokenization was implemented to strip punctuation from user queries, ensuring accurate markdown chunk matching.
3. **Synchronous Mobile Streaming Fix:** 
   Addressed asynchronous React state race conditions on mobile devices (where simultaneous touch/pointer events fired duplicate requests) by implementing a synchronous `useRef` lock (`isSubmittingRef`), ensuring perfect single-stream text rendering.
4. **Dynamic LLM Fallbacks:**
   Since cloud AI providers frequently deprecate free-tier models, the backend dynamically fetches the `/v1/models` endpoint on boot, checking for alive models and intelligently auto-selecting the most capable open-source architecture available.

## 💻 Projects Showcased in the Corpus
The RAG engine is contextually aware of my actual development work, including:
* **Persona-AI:** An AI Interviewer web application featuring a Node.js/Express backend, Groq AI question generation, and Resend API integration.
* **Google Flow for Payton:** A frontend scrollytelling parallax animation sequence.
* **Vision-Language Multimodal AI:** A vision-language classification project for social media moderation.

## ⚙️ Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/pratyushwinorlearn/portfolio.git
cd portfolio