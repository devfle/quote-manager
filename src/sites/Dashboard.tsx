/* React Dependencies */
import React from "react";

/* Internal Dependencies */
import { SavedProjects } from "../App";

/* Material UI */
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const dashboardClock = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(dashboardClock);
    };
  }, []);

  const projectSettings = React.useContext(SavedProjects);

  return (
    <div className="qm-dashboard">
      <Card sx={{ mb: 2, width: 400 }}>
        <CardContent>
          <Typography variant="h5">Welcome to the QuoteManager</Typography>
          <Typography sx={{ mt: 2 }}>With QuoteManager you have the ability to save and organize your sources for your term papers.</Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography sx={{ lineHeight: 1.1, fontSize: "clamp(32px, 3.5rem, 60px)" }} className="qm-dashboard__date">
            {currentTime.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: 2, width: 400 }}>
        <CardContent>
          <Typography sx={{ mb: 2 }} variant="h5">
            Statistics:
          </Typography>
          <Typography>{`Projects: ${projectSettings?.projectData?.length}`}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
