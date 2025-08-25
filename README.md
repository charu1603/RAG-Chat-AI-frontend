# RAG PDF Chat AI

A **Retrieval-Augmented Generation (RAG)** application that allows users to upload PDF documents, extract embeddings using **Google Gemini API**, store them in **Qdrant Vector Store**, and chat with the AI using document context. The PDFs are uploaded to **Cloudinary**, and the task queue is managed via **BullMQ** with **Upstash Redis**.

---

## Features

1. Upload PDF files via a web interface.
2. Extract embeddings from PDFs using **Google Gemini Embeddings**.
3. Store embeddings in **Qdrant Vector Store**.
4. Query AI assistant with document context.
5. Worker-based asynchronous processing using **BullMQ**.

---

## Tech Stack

- **Frontend:** NextJS
- **Backend:** Node.js, Express
- **Queue:** BullMQ
- **Embeddings:** Google Gemini API via `@langchain/google-genai`
- **Vector Database:** Qdrantdb
- **PDF Loader:** `@langchain/community/document_loaders/fs/pdf`

---
