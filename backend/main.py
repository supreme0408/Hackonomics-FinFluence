from fastapi import FastAPI, HTTPException
import os
from budgeting import analyze_budget
from business import handle_business_scenario
from models import BudgetRequest,BudgetResponse,BusinessScenarioRequest, BusinessScenarioResponse
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
groq = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def check_server():
    return "Server is up and running!"

@app.post("/budget-challenge", response_model=BudgetResponse)
def handle_budget_feedback_request(data: BudgetRequest):
    """
    API endpoint for Budgeting Challenge.
    """
    try:
        return analyze_budget(groq,data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# FastAPI Endpoint
@app.post("/business-scenario", response_model=BusinessScenarioResponse)
def handle_business_scenario_request(data: BusinessScenarioRequest):
    """
    API endpoint for Virtual Business module.
    """
    try:
        return handle_business_scenario(groq,data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")