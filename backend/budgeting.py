import json
from models import BudgetRequest, BudgetResponse

def calculate_budget_summary(budget_request: BudgetRequest) -> dict:
    # Calculate the total expenses
    total_expenses = sum(category.amount for category in budget_request.expense_categories)
    
    # Calculate the remaining balance
    remaining_balance = budget_request.monthly_income - total_expenses
    
    # Calculate the savings percentage
    savings_percentage = (remaining_balance / budget_request.monthly_income) * 100  # Assuming savings is the second last category

    # Return a dictionary of calculated values
    return {
        "total_income": budget_request.monthly_income,
        "total_allocated_expenses": total_expenses,
        "remaining_balance": remaining_balance,
        "savings_percentage": savings_percentage,
    }


def get_budget_feedback_from_llm(groq, calculated_summary: dict, budget_request: BudgetRequest) -> BudgetResponse:
    # Create the prompt to pass to the LLM for feedback generation
    prompt = {
        "role": "system",
        "content": (
            "You are a financial budgeting expert. Your task is to analyze the user's "
            "budget based on their provided income, expense categories, age range, savings goals, "
            "and their calculated budget summary. Provide feedback on the user's budget including "
            "Category Analysis and Real-time Tips. Also give tips to increase savings to savings goal and if saving goal is met appreciate. Give atleast two real-time tips and maximum 5 where needed."
            "In real-time tips add comments relevant to age_range.\n"
            "Please structure the output JSON as follows:\n"
            f"{json.dumps(BudgetResponse.model_json_schema(), indent=3)}"
        )
    }

    user_input = {
        "role": "user",
        "content": json.dumps({
            "total_income": calculated_summary["total_income"],
            "total_allocated_expenses": calculated_summary["total_allocated_expenses"],
            "remaining_balance": calculated_summary["remaining_balance"],
            "savings_percentage": calculated_summary["savings_percentage"],
            "expense_categories": [
                {"name": category.name, "amount": category.amount}
                for category in budget_request.expense_categories
            ],
            "age_range": budget_request.age_range,
            "savings_goals": budget_request.savings_goals
        })
    }

    # Use Groq's chat completion API to get feedback from the LLM
    chat_completion = groq.chat.completions.create(
        messages=[prompt, user_input],
        model="llama3-70b-8192",  # You can adjust the model as necessary
        temperature=0.5,  # Lower temperature for more focused results
        stream=False,
        response_format={"type": "json_object"}
    )

    # Parse and return the result
    return BudgetResponse.model_validate_json(chat_completion.choices[0].message.content)


def print_budget_feedback(budget_response: BudgetResponse):
    print("Budget Summary:")
    print(f"Total Income: ₹{budget_response.total_income}")
    print(f"Total Allocated Expenses: ₹{budget_response.total_allocated_expenses}")
    print(f"Remaining Balance: ₹{budget_response.remaining_balance}")
    print(f"Savings Percentage: {budget_response.savings_percentage}%\n")

    print("Category Analysis:")
    for analysis in budget_response.category_analysis:
        print(f"- {analysis.category_name}: {analysis.message}")

    print("\nReal-time Feedback:")
    for feedback in budget_response.real_time_feedback:
        print(f"- {feedback.message}")
    for feedback in budget_response.real_time_feedback:
        print(f"- {feedback.tips}")


def analyze_budget(groq,budget_request):
    # Step 1: Calculate budget summary
    calculated_summary = calculate_budget_summary(budget_request)

    # Step 2: Get feedback from LLM based on calculated summary
    budget_response = get_budget_feedback_from_llm(groq, calculated_summary, budget_request)

    # Step 3: Print the feedback
    # print_budget_feedback(budget_response)
    return budget_response



# # Step 1: Calculate budget summary
# calculated_summary = calculate_budget_summary(budget_request)

# # Step 2: Get feedback from LLM based on calculated summary
# budget_response = get_budget_feedback_from_llm(calculated_summary, budget_request)

# # Step 3: Print the feedback
# print_budget_feedback(budget_response)