import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid2,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import BackButton from "../components/BackButton";
import InsightsIcon from "@mui/icons-material/Insights";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const BusinessScenario = () => {
  const [businessType, setBusinessType] = useState("");
  const [pricingStrategy, setPricingStrategy] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartPreparing = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://hackonomics-fin-fluence-backend.vercel.app/business-scenario", {
        business_type: businessType,
        pricing_strategy: pricingStrategy,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching scenario data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ p: 3 }}>
      <BackButton />
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ fontWeight: "bold", color: "#1976D2" }}
      >
        Financial Insights Assistant
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Business Type"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          fullWidth
        />
        <TextField
          label="Pricing Strategy"
          value={pricingStrategy}
          onChange={(e) => setPricingStrategy(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color={!loading ? "primary" : "warning"}
          onClick={handleStartPreparing}
          disabled={loading}
        >
          {loading ? "Loading..." : "Start Preparing"}
        </Button>
      </Box>

      {/* Result Section */}
      {result && (
        <Grid2 container spacing={3}>
          {/* Financial Insights */}
          <Grid2 item xs={12} md={6}>
            <Typography
              variant="h5"
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <InsightsIcon color="primary" />
              Financial Insights
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Scenario Description
                </Typography>
                <Typography>{result.financial_insights.scenario_description}</Typography>

                <Typography variant="h6" sx={{ mt: 2 }} display="flex" alignItems="center" gap={1}>
                  <HelpOutlineIcon color="secondary" />
                  Critical Questions
                </Typography>
                <List>
                  {result.financial_insights.critical_questions.map((question, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={question} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  Decision Points
                </Typography>
                <List>
                  {Object.entries(result.financial_insights.decision_points).map(
                    ([decision, impact], index) => (
                      <ListItem key={index}>
                        <ListItemText primary={decision} secondary={impact} />
                      </ListItem>
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid2>

          {/* Risk Analysis */}
          <Grid2 item xs={12} md={6}>
            <Typography
              variant="h5"
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <WarningAmberIcon color="error" />
              Risk Analysis
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Risk Points
                </Typography>
                <List>
                  {result.risk_analysis.risk_analysis.map((risk, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={risk} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  Learnings
                </Typography>
                <Swiper spaceBetween={10} slidesPerView={4} grabCursor>
                  {result.risk_analysis.learnings.map((learning, index) => (
                    <SwiperSlide key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "burlywood",
                          color: "white",
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        {learning}
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
};

export default BusinessScenario;
