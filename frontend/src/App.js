import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BudgetingChallenge from "./pages/BudgetingChallenge";
import BusinessScenario from "./pages/BusinessScenario";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budgeting" element={<BudgetingChallenge />} />
        <Route path="/business" element={<BusinessScenario />} />
      </Routes>
    </Router>
  );
}

export default App;
