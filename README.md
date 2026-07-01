# PulsePredict 📈

A high-fidelity, full-stack stock forecasting platform combining **FastAPI (Python)**, **React (Vite)**, and **Scikit-Learn Machine Learning models**. The application pulls live historical data from global stock exchanges via Yahoo Finance (`yfinance`), trains custom time-series linear regression models dynamically, and renders interactive, dark-glassmorphic price trend graphs.

### 🌐 Live Deployment
* **Production Web App**: [pulse-predict-73lvc05f2-shashank19.vercel.app](https://pulse-predict-73lvc05f2-shashank19.vercel.app/)
* **FastAPI Microservice Engine**: [pulsepredict-backend.onrender.com](https://pulsepredict-backend.onrender.com/)

---

## ✨ Features

* **Machine Learning Forecaster**: Trains a sequential `LinearRegression` model dynamically on 2 years of daily close data to predict the next day's closing price.
* **Model Caching**: Serializes and caches trained models locally on the server (`.pkl`) to optimize response times.
* **Robust Database Integration**: SQLite database tracking user profiles, secure credentials, and chronological search history logs.
* **Interactive Data Visualization**: Taller, dark-themed Recharts `AreaChart` with dynamic gridlines and custom tooltips showing 30-day closing histories.
* **Stateful Analytics Dashboard**: Responsive grid cells showing key daily metrics: Open, Volume, High, Low, and Dynamic Currencies (`₹`, `$`, `£`).
* **Secure Session Control**: OAuth2 password form login flow with dynamic JWT token validation.
* **CSV Bulk Forecasting**: Batch-mode input processing via spreadsheet uploads logging multiple targets to history automatically.

---

## 🛠️ Technology Stack

* **Frontend**: React (Vite), Tailwind CSS, Recharts, Axios, React Router.
* **Backend**: FastAPI, SQLAlchemy ORM, Uvicorn, Python 3.11.
* **Machine Learning**: Scikit-Learn, Pandas, NumPy, yfinance, Joblib.
* **Containerization & Deployment**: Docker (Render Web Service), Nginx, Vercel.

---

## 🚀 Local Installation & Setup

To run PulsePredict locally, follow these steps:

### 1. Run the Backend Microservice
```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r app/requirements.txt

# Start the FastAPI hot-reload server
uvicorn app.main:app --reload --port 8000
```
The API documentation will be available locally at `http://127.0.0.1:8000/docs`.

### 2. Run the React Frontend Client
```bash
cd frontend

# Install package dependencies
npm install

# Run hot-reload development server
npm run dev
```
Open your browser at `http://localhost:5173`.