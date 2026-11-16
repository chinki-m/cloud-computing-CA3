# StackWise 🚀

> **Build Smarter. Choose Better.**

StackWise is an intelligent developer assistant that recommends the ideal technology stack for any software project. Users describe their project idea, select their team size, experience level, and target scale, and instantly receive custom tech recommendations, architecture plans, folder structures, learning roadmaps, and hosting recommendations.

Built with a premium dark-themed SaaS aesthetic, StackWise features fluid animations, glassmorphism UI cards, interactive scoring, and preset demos (Netflix, Swiggy, Uber, etc.).

---

## Architecture & Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion (for animations), Lucide React (for icons)
- **Backend:** FastAPI (Python 3.9+), Uvicorn
- **AI Engine:** Google Gemini API (`gemini-2.5-flash`)
- **Deployment Config:** Built for Vercel (Frontend) and Render (Backend)

---

## Project Structure

```
stackwise/
├── backend/                  # FastAPI Backend
│   ├── main.py               # Main application and API logic
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Backend env variables template
├── frontend/                 # React Frontend
│   ├── src/                  # React sources (components, styles, App)
│   │   ├── components/       # Reusable React components
│   │   ├── App.jsx           # Parent UI component and coordinator
│   │   ├── main.jsx          # React DOM mounting
│   │   └── index.css         # Styling, Google Fonts, and Custom CSS utilities
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── postcss.config.js     # PostCSS configuration
│   ├── vite.config.js        # Vite build configurations
│   └── index.html            # Core entry layout
├── vercel.json               # Root build configurations for Vercel
├── .gitignore                # Target git ignore definitions
├── .env.example              # Centralized environment variable template
└── README.md                 # Project instruction manual (this file)
```

---

## Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.9+)
- A Gemini API Key from Google AI Studio.

---

### 1. Backend Setup (FastAPI)

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux:**
     ```bash
     source venv/bin/activate
     ```

4. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create your local environment file:
   ```bash
   copy .env.example .env
   # On macOS/Linux: cp .env.example .env
   ```

6. Open the newly created `.env` file and insert your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   ```

7. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The backend will be running at `http://localhost:8000`. You can inspect the interactive OpenAPI documentation at `http://localhost:8000/docs`.

---

### 2. Frontend Setup (React/Vite)

1. Open a new terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install the required Node packages:
   ```bash
   npm install
   ```

3. Create your local environment file:
   ```bash
   copy .env.example .env
   # On macOS/Linux: cp .env.example .env
   ```
   *Note: In local mode, the frontend will automatically fallback to requesting `http://localhost:8000` if no environment variable is provided.*

4. Launch the Vite local development server:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`. Open this URL in your web browser.

---

## Deployment Instructions

### 1. Backend Deployment (Render)

Render is ideal for hosting the FastAPI backend web service.

1. Push the StackWise repository to your GitHub profile.
2. Log in to [Render](https://render.com/) and click **New > Web Service**.
3. Select and connect your StackWise GitHub repository.
4. Configure the Web Service settings:
   - **Name:** `stackwise-backend`
   - **Language:** `Python 3` (or choose Docker if preferred, but Python is simpler)
   - **Root Directory:** `backend` (Crucial: Render will change context to `/backend` before building)
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Advanced** to add the following **Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `FRONTEND_URL`: The URL of your Vercel frontend (e.g., `https://stackwise.vercel.app` - configure this *after* deploying the frontend, or update it later).
6. Click **Create Web Service**. Render will deploy the API and provide a live URL (e.g. `https://stackwise-backend.onrender.com`).

---

### 2. Frontend Deployment (Vercel)

Vercel is optimized for building and serving Vite React applications.

1. Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
2. Select your StackWise GitHub repository.
3. Vercel will automatically detect the configuration from the root `vercel.json`.
4. In the configuration dashboard, ensure:
   - **Framework Preset:** Vite
   - **Root Directory:** Keep as the repository root `./` (our root `vercel.json` redirects the build command correctly to frontend).
5. Open the **Environment Variables** accordion and add:
   - `VITE_API_URL`: The URL of your newly deployed Render backend service (e.g. `https://stackwise-backend.onrender.com`).
6. Click **Deploy**. Vercel will compile the React code and output a production URL.
7. *Post-deploy step:* Copy your Vercel URL, go back to your Render backend web service dashboard, and update the `FRONTEND_URL` environment variable to match it. This ensures CORS requests succeed.
