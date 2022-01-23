import { Typography } from "@mui/material";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Typography className="dashboard__date">22:15</Typography>
      <Typography className="dashboard__quote">"Lorem ipsum dolor sit amet"</Typography>
    </div>
  );
};

export default Dashboard;
