import json
from fastapi import HTTPException
from models import Scenario, BusinessScenarioRequest, BusinessScenarioResponse, BusinessRiskAnalysis, FinancialInsights

# Function to generate a business scenario using Groq LLM
def generate_business_scenario(groq, business_type: str, pricing_strategy: str) -> Scenario:
    try:
        chat_completion = groq.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a creative financial assistant. "
                        "Generate a business scenario for understanding financial terms and Decision Points."
                        "Please structure the output JSON as follows:\n"
                        f"{json.dumps(Scenario.model_json_schema(), indent=2)}"
                    ),
                },
                {
                    "role": "user",
                    "content": f"Create a scenario for a {business_type} business with a {pricing_strategy} pricing strategy. The scenario will helps users understand how to make business driving decisions.",
                },
            ],
            model="llama3-70b-8192",
            temperature=0.8,
            stream=False,
            response_format={"type": "json_object"},
        )
        scenario_json = chat_completion.choices[0].message.content
        return Scenario.model_validate_json(scenario_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating business scenario: {str(e)}")

def generate_financial_insights(groq, scenario: Scenario) -> FinancialInsights:
    try:
        chat_completion = groq.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a financial expert tasked with analyzing business scenarios. "
                        "Your goal is to provide actionable financial insights in a user-friendly JSON format. "
                        "Focus on describing the scenario, listing critical questions for decision-making, "
                        "and explaining key decision points along with their direct impact on business components. "
                        "Ensure that all fields adhere strictly to the following JSON schema:\n"
                        f"{json.dumps(FinancialInsights.model_json_schema(), indent=2)}"
                    ),
                },
                {
                    "role": "user",
                    "content": f"Analyze the following scenario and provide insights: {json.dumps(scenario.model_dump())}. "
                               "Explain the scenario in simple terms, list critical decision-making questions, "
                               "and detail key decision points with a clear impact description, ensuring all fields match the schema.",
                },
            ],
            model="llama3-70b-8192",
            temperature=0.5,
            stream=False,
            response_format={"type": "json_object"},
        )

        insights_json = chat_completion.choices[0].message.content
        return FinancialInsights.model_validate_json(insights_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating financial insights: {str(e)}")


def generate_risk_analysis(groq, scenario: Scenario) -> BusinessRiskAnalysis:
    try:
        chat_completion = groq.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a risk analyst specializing in evaluating business scenarios. "
                        "Your task is to provide a detailed risk analysis of the scenario and identify potential risks with explanations "
                        "specific to the situation. Additionally, list key one-word financial learnings relevant to the scenario. "
                        "Ensure that the output JSON adheres to the following schema:\n"
                        f"{json.dumps(BusinessRiskAnalysis.model_json_schema(), indent=2)}"
                    ),
                },
                {
                    "role": "user",
                    "content": f"Analyze the following scenario and provide risk analysis points with clear explanations specific to the context: "
                               f"{json.dumps(scenario.model_dump())}. Additionally, list one-word financial learnings related to the scenario.",
                },
            ],
            model="llama3-70b-8192",
            temperature=0.5,
            stream=False,
            response_format={"type": "json_object"},
        )

        risk_analysis_json = chat_completion.choices[0].message.content
        return BusinessRiskAnalysis.model_validate_json(risk_analysis_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating risk analysis: {str(e)}")
    
def handle_business_scenario(groq, data :BusinessScenarioRequest):
    # Step 1: Generate a scenario
    scenario = generate_business_scenario(groq, data.business_type, data.pricing_strategy)

    # Step 2: Get financial insights
    financial_insights = generate_financial_insights(groq, scenario)

    # Step 3: Perform risk analysis
    risk_analysis = generate_risk_analysis(groq, scenario)

    # Return results
    return BusinessScenarioResponse(
        financial_insights=financial_insights,
        risk_analysis=risk_analysis,
        )

# output = generate_business_scenario(groq,"cafe","premium")
# print(f"Output\n")
# print(output)
# financial_insights = generate_financial_insights(groq, output)
# print(f"\nInsight\n")
# print(financial_insights)
# risk_analysis = generate_risk_analysis(groq, output)
# print(f"\nRisk Analysis\n")
# print(risk_analysis)
# data = BusinessScenarioRequest(business_type="cafe",pricing_strategy="premium")
# output = handle_business_scenario(groq,data)
# print(output)