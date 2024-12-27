import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="secondary" onClick={() => navigate(-1)} style={{marginTop:'1rem',display:'block'}}>
      Back
    </Button>
  );
};

export default BackButton;
