import React, { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  MenuItem,
  Card,
  CardContent,
  Grid2,
  Box,
} from "@mui/material";
import {
  Savings,
  Category,
  Feedback,
  Add,
  Clear,
} from "@mui/icons-material";
import BackButton from "../components/BackButton";

const BudgetingChallenge = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [ageRange, setAgeRange] = useState("student");
  const [savingsGoal, setSavingsGoal] = useState(10);
  const [response, setResponse] = useState(null);
  const [isClick, setIsClick] = useState(0);

  const addExpense = () => {
    setExpenses([...expenses, { name: "", amount: 0 }]);
  };

  const handleFeedback = async () => {
    setIsClick(1);
    const requestData = {
      monthly_income: income,
      expense_categories: expenses,
      age_range: ageRange,
      savings_goals: savingsGoal,
    };

    try {
      const res = await fetch("http://localhost:8000/budget-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsClick(0);
  };

  return (
    <Container>
      <BackButton />
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ fontWeight: "bold", color: "#1976D2" }}
      >
        Smart Budget Feedback
      </Typography>

      {/* Input Section */}
      <Box
        sx={{
          display: "grid2",
          grid2TemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          label="Monthly Income"
          type="number"
          onChange={(e) => setIncome(parseInt(e.target.value, 10))}
          fullWidth
        />
        <TextField
          label="Savings Goal (%)"
          type="number"
          onChange={(e) => setSavingsGoal(parseInt(e.target.value, 10))}
          fullWidth
          value={savingsGoal}
        />
        <TextField
          label="Age Range"
          select
          fullWidth
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="early professional">Early Professional</MenuItem>
          <MenuItem value="young professional">Young Professional</MenuItem>
          <MenuItem value="retired">Retired</MenuItem>
        </TextField>
      </Box>

      {/* Expenses Table */}
      <Table>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  label="Expense Name"
                  fullWidth
                  onChange={(e) => {
                    const updatedExpenses = [...expenses];
                    updatedExpenses[index].name = e.target.value;
                    setExpenses(updatedExpenses);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  onChange={(e) => {
                    const updatedExpenses = [...expenses];
                    updatedExpenses[index].amount = parseInt(e.target.value, 10) || 0;
                    setExpenses(updatedExpenses);
                  }}
                />
              </TableCell>
              <TableCell
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => {
                  const updatedExpenses = expenses.filter((_, i) => i !== index);
                  setExpenses(updatedExpenses);
                }}
              >
                <Clear />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={addExpense} startIcon={<Add />}>
          Add Expense
        </Button>
        <Button
          variant="contained"
          color={isClick ? "warning" : "primary"}
          onClick={handleFeedback}
          disabled={!expenses.length || isClick}
        >
          {isClick ? "Generating..." : "Give Feedback"}
        </Button>
      </Box>

      {/* Response Cards */}
      {response && (
        <Grid2 container spacing={3} sx={{ mt: 3 }}>
          {/* Summary Card */}
          <Grid2 item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Savings color="primary" />
                  <Typography variant="h6">Budget Summary</Typography>
                </Box>
                <Typography>Total Income: ₹{response.total_income}</Typography>
                <Typography>Total Allocated Expenses: ₹{response.total_allocated_expenses}</Typography>
                <Typography>Remaining Balance: ₹{response.remaining_balance}</Typography>
                <Typography>Savings Percentage: {response.savings_percentage}%</Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Category Analysis Card */}
          <Grid2 item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Category color="secondary" />
                  <Typography variant="h6">Category Analysis</Typography>
                </Box>
                {response.category_analysis.map((analysis, index) => (
                  <Typography key={index}>
                    - {analysis.category_name}: {analysis.message}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid2>

          {/* Real-Time Feedback Card */}
          <Grid2 item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Feedback color="success" />
                  <Typography variant="h6">Real-Time Feedback</Typography>
                </Box>
                {response.real_time_feedback.map((feedback, index) => (
                  <Typography key={index}>- {feedback.message}</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
};

export default BudgetingChallenge;