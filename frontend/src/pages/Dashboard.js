import React from "react";
import { Typography, Container, Grid2, Card, CardContent, Button, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import About from "./About";

const Dashboard = () => {
  const benefits = [
    {
      feature_name: "Learn Budgeting",
      description: "Master the art of managing your expenses and savings.",
      icon: <InfoIcon color="primary" fontSize="medium" />,
    },
    {
      feature_name: "Start a Business",
      description: "Explore entrepreneurial skills and start your own venture.",
      icon: <InfoIcon color="secondary" fontSize="medium" />,
    },
    {
      feature_name: "Financial Simulations",
      description: "Practice financial decision-making through simulations.(yet to implement)",
      icon: <InfoIcon color="action" fontSize="medium" />,
    },
    {
      feature_name: "Coming Soon!",
      description: "Stay connected for more exciting features.",
      icon: <AnnouncementIcon color="error" fontSize="medium" />,
    },
  ];

  const navigate = useNavigate();
  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        marginTop="2rem"
        align="center"
        style={{ fontWeight: "bold", color: "#1E88E5" }}
      >
        FinFluence
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        style={{ color: "#757575", fontStyle: "italic" }}
      >
        Transforming Financial Knowledge into Power
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} sm={6} md={4}>
          <Card
            style={{
              border: "1px solid white",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Budgeting Feedback
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Get personalized insights to improve your budgeting skills.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={{ width: "80%" }}
              onClick={() => navigate("/budgeting")}
            >
              Start
            </Button>
          </Card>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <Card
            style={{
              border: "1px solid white",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Starting a Virtual Business
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Learn entrepreneurial skills and kickstart your virtual business.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              style={{ width: "80%" }}
              onClick={() => navigate("/business")}
            >
              Start
            </Button>
          </Card>
        </Grid2>
      </Grid2>


      <Grid2 marginTop="5rem">
        <Swiper spaceBetween={10} slidesPerView={3} grabCursor>
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <Grid2 item xs={12} sm={6} md={4}>
                <Card
                  style={{
                    border: "1px solid black",
                    padding: "0.5rem",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <Box display="flex" alignItems="center" justifyContent="center" gap="0.5rem" marginBottom="0.5rem">
                      {benefit.icon}
                      <Typography variant="subtitle1" fontWeight="bold">
                        {benefit.feature_name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid2>
      <About />
    </Container>
  );
};

export default Dashboard;