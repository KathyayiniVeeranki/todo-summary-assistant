# 📝 Todo Summary Assistant

A full-stack web application that allows users to manage personal to-do tasks, generate summaries using an LLM (Cohere), and post them directly to a Slack channel.

---

## 🚀 Features
- Add, edit, delete to-do items
- View current to-do list
- Click to summarize pending tasks using Cohere LLM
- Automatically send the summary to a configured Slack channel

---

## 🧱 Tech Stack


- Frontend      →   React + Vite + Tailwind CSS   
- Backend       → Node.js + Express    
- LLM API       → Cohere                        
- Database      → Supabase         
- Slack Posting → Incoming Webhooks             

---

## 🛠️ Setup Instructions
### 1. Git Repository
This project was initially set up locally without cloning from GitHub. The Git repository was initialized using:
```bash
git init
```
After setting up the project and writing some code, it was connected to a GitHub repository using:
```bash
git remote add origin https://github.com/your-username/todo-summary-assistant.git
git add .
git commit -m "Initial commit"
git push -u origin main
```
This allowed the project to be developed locally first and later version-controlled with GitHub.
### 2. Environment Variables
Create .env file:
➤ /backend/.env
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
COHERE_API_KEY=your-cohere-api-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxx/yyyy/zzzz
```
### 3. Install Frontend Dependencies
```bash
npm create vite@latest frontend --template react
cd frontend
npm install
```
To Run 
```bash
npm run dev
```
Open http://localhost:5173 in browser.
### 4. Install Backend Dependencies
```bash
mkdir backend && cd backend
npm init -y
npm install express cors axios dotenv pg
```
To Run 
```bash
npm run dev
```
---
## 💬Slack Setup
- Go to [https://api.slack.com/apps](https://api.slack.com/apps)
- Create Account
- Create a new app → Enable Incoming Webhooks
- Add a new webhook and select a channel
- Copy the webhook URL and paste it in .env as:
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```
---
## 🤖 Cohere Setup (LLM)
- Create an account at [https://dashboard.cohere.com](https://dashboard.cohere.com)
- Go to API Keys
- Copy your key and paste into .env:
```bash
COHERE_API_KEY=your-api-key
```
This key is used to summarize the user's to-do items.

---
## 🛠️ Supabase Setup

- Go to [https://supabase.com](https://supabase.com) → Create a project
- Go to SQL Editor and run:
```sql
create extension if not exists "uuid-ossp";

create table todos (
  id uuid default uuid_generate_v4() primary key,
  text text not null,
  created_at timestamp default now()
);
```
- In Settings > API, copy:  SUPABASE_URL,
anon public key → Use as SUPABASE_KEY in .env

---

## 🧠 Architecture & Design Decisions
### 📦 Project Structure

```bash
todo-summary-assistant/
├── backend/
|   ├── index.js
|   ├── routes/
|   │   └── todos.js
|   ├── services/
|   │   │── db.js
|   |   │── slack.js
|   |   └── cohere.js
|   └── .env
|
├── frontend/
|   ├── index.html
|   ├── public/
|   │   └── todos.js
|   └── src/
|       │── app.jsx
|       │── main.jsx
|       └── components
|           │── AddTodo.jsx
|           │── SummaryButton.jsx
|           └── TodoList.jsx
|   
└── README.md
```

### ✨ Design Highlights

- Modular services: Each external integration (Supabase, Slack, Cohere) is isolated into a services/ file for separation of concerns.
- Single responsibility components: React components are built for clarity (AddTodo, TodoList, SummaryButton).
- Backend API-first: All functionality is powered by REST APIs; frontend is decoupled and can be swapped out.
---

## 🧪 Sample Summary Flow

1. Add todos like:
- "Finish resume"
- "Prepare for interview"
2. Click Summarize & Send to Slack
3. Output: 
- 🧠 Summary: You need to finish your resume and prepare for your upcoming interview.

## 🙋‍♂️ Author

### Kathyayini Veeranki
- GitHub: [https://github.com/KathyayiniVeeranki](https://github.com/KathyayiniVeeranki)
- Linkedin: [https://www.linkedin.com/in/v-kathyayini-168995286/](https://www.linkedin.com/in/v-kathyayini-168995286/)

