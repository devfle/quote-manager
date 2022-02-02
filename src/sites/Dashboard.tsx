import { Typography } from "@mui/material";
import React from "react";
import GenericDialog from "../components/GenericDialog/GenericDialog";

const Dashboard: React.FC = () => {
  const [initialPopup, setInitialPopup] = React.useState(false);
  return (
    <div className="dashboard">
      <GenericDialog
        isOpen={initialPopup}
        dialogTitle="Welcome to Quote-Manager"
        dialogActionBtnText="Start"
        dialogCloseMethod={() => setInitialPopup(false)}
        dialogActionMethod={() => setInitialPopup(false)}
      >
        <p>Hello World</p>
      </GenericDialog>
      <Typography sx={{ lineHeight: 1.1 }} className="dashboard__date">
        22:15
      </Typography>
      <Typography className="dashboard__quote">"Lorem ipsum dolor sit amet"</Typography>
    </div>
  );
};

export default Dashboard;
