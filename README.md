# 📲 TrendSync

**TrendSync** is a full-stack social media content scheduler that allows users to connect their social platforms, create and schedule posts, manage media, and visualize content timelines through an interactive calendar. Built using the **MERN stack** (MongoDB, Express, React, Node.js).

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

---

### 🧾 Prerequisites

- Node.js (v16 or higher)
- npm
- MongoDB (local or cloud)

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/jollyhub8278/TrendSync.git
cd TrendSync

---

### 📁 2. Install Root Dependencies

```bash
npm install

---

### 💻 3. Frontend Setup

```bash
cd client
npm install
npm run dev

---

### 🖥️ 4. Backend Setup

```bash
cd server
npm install
npm start

---

### 🛢️ 5. MongoDB Setup

-Create a .env file inside the server/ directory with the following content:

```env
MONGO_URI=mongodb://<DB_HOST>:<DB_PORT>/<DB_NAME>

-Example (for local MongoDB):

```env
MONGO_URI=mongodb://127.0.0.1:27017/TrendSync

📚 Tech Stack
Frontend: React + Tailwind CSS + Vite

Backend: Node.js + Express

Database: MongoDB

Authentication: JWT, OAuth (Google, Facebook)

Scheduling: Calendar view with media previews