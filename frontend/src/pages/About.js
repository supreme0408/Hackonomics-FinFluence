import React from "react";
import { Typography, Card, CardContent, Grid2, Box, Divider, Link } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import PersonIcon from "@mui/icons-material/Person";

const About = () => {
  return (
    <Card style={{ marginTop: "3rem", border: "1px solid #e0e0e0", padding: "1rem" }}>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <Box display="flex" alignItems="center" gap="0.5rem" marginBottom="1rem">
              <InfoIcon color="primary" />
              <Typography variant="h5" color="primary">
                About the Project
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              Our Financial Literacy Platform aims to spread awareness about financial literacy and economics in an engaging and interactive way. 
              This platform provides users with tools to learn budgeting, start a virtual business, and make informed financial decisions using real-world simulations.
            </Typography>
          </Grid2>

          <Grid2 item xs={12}>
            <Divider />
          </Grid2>

          <Grid2 item xs={12}>
            <Box display="flex" alignItems="center" gap="0.5rem" marginBottom="1rem">
              <EmojiObjectsIcon color="secondary" />
              <Typography variant="h5" color="secondary">
                Hackathon Alignment
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              This project was developed as part of an open-ended, beginner-friendly hackathon that encourages innovative ideas and solutions 
              to promote financial literacy. By integrating interactive simulations and educational content, our platform aligns with the hackathon's 
              goal to make learning about finance accessible and enjoyable for all.
            </Typography>
          </Grid2>

          <Grid2 item xs={12}>
            <Divider />
          </Grid2>

          <Grid2 item xs={12}>
            <Box display="flex" alignItems="center" gap="0.5rem" marginBottom="1rem">
              <PersonIcon color="action" />
              <Typography variant="h5" color="textPrimary">
                Created By
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              <strong>Name:</strong> Ramanuj
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>GitHub:</strong>{" "}
              <Link href="https://github.com/supreme0408/Hackonomics-FinFluence.git" target="_blank" rel="noopener">
                https://github.com/supreme0408
              </Link>
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default About;
