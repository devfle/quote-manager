import QuoteForm from "../components/QuoteForm/QuoteForm";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { SavedProjects, ProjectData } from "../App";
import SpeedDial from "../components/SpeedDial/SpeedDial";

export default function SingleProject() {
  const [quoteStyle, setQuoteStyle] = React.useState<null | string | { quoteStyle: string }>(null);
  const [welcomePopup, setWelcomePopup] = React.useState<boolean>(true);
  const [singleProjectData, setSingleProjectData] = React.useState<null | ProjectData | any>(null);
  const { projectData, setProjectData } = React.useContext(SavedProjects);

  const { id } = useParams<{ id: string }>();

  const findDataById = (id: string | number, data: Array<ProjectData>): ProjectData | undefined => {
    return data.find((_) => _.id === id);
  };

  const switchQuoteStyle = (_: React.ChangeEvent<HTMLInputElement>): void => {
    setQuoteStyle(_.target.value);
  };

  const persistQuoteStyle = (): void => {
    setSingleProjectData({ ...singleProjectData, quoteStyle });
    //const dataIndex = findIndexById(id, projectData);
    const updatedProjectData = projectData.map((obj: any) => {
      debugger;
      if (id === obj.id) {
        return {
          ...obj,
          quoteStyle,
        };
      } else {
        return { ...obj };
      }
    });
    setProjectData(updatedProjectData);
    setWelcomePopup(false);
  };

  React.useEffect(() => {
    setSingleProjectData(findDataById(id, projectData));
  }, [id, projectData]);

  React.useEffect(() => {
    if (singleProjectData && singleProjectData.quoteStyle) {
      setWelcomePopup(false);
    }
  }, [singleProjectData]);

  return (
    <div className="qm-single-project">
      <SpeedDial />
      <Dialog keepMounted aria-describedby="alert-dialog-slide-description" open={welcomePopup}>
        <DialogTitle>Welcome to your new Project: {singleProjectData && singleProjectData?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, amet! Unde eaque repudiandae vero ex repellendus dolorem minus voluptatem.</DialogContentText>
          <FormControl sx={{ marginBlockStart: "16px" }} component="fieldset">
            <FormLabel component="legend">Select your quote style:</FormLabel>
            <RadioGroup onChange={switchQuoteStyle} row aria-label="quote style" name="row-radio-buttons-group">
              <FormControlLabel value="apa" control={<Radio />} label="APA" />
              <FormControlLabel disabled value="harvard" control={<Radio />} label="Harvard" />
              <FormControlLabel disabled value="mla" control={<Radio />} label="MLA" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={persistQuoteStyle}>Start</Button>
        </DialogActions>
      </Dialog>
      <div className="qm-card-wrapper">
        <QuoteForm />
        <Card className="qm-card">
          <CardContent>
            <Typography sx={{ marginBlockEnd: "16px" }} className="qm-card__headline" variant="h5">
              Your Quotes
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
