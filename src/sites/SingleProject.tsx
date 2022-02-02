import QuoteForm from "../components/QuoteForm/QuoteForm";
import { Card, CardContent, DialogContentText, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { SavedProjects, ProjectData } from "../App";
import SpeedDial from "../components/SpeedDial/SpeedDial";
import GenericDialog from "../components/GenericDialog/GenericDialog";

export default function SingleProject() {
  const [quoteStyle, setQuoteStyle] = React.useState<string | { quoteStyle: string }>("apa");
  const [welcomePopup, setWelcomePopup] = React.useState<boolean>(true);
  const [singleProjectData, setSingleProjectData] = React.useState<null | ProjectData | any>(null);
  const [deletePopup, setDeletePopup] = React.useState<boolean>(false);
  const { projectData, setProjectData } = React.useContext(SavedProjects);
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const findDataById = (id: string | number, data: Array<ProjectData>): ProjectData | undefined => {
    return data.find((_) => _.id === id);
  };

  const switchQuoteStyle = (_: React.ChangeEvent<HTMLInputElement>): void => {
    setQuoteStyle(_.target.value);
  };

  const deleteCurrentProject = (): void => {
    const updatedProjectData = projectData.filter((obj: ProjectData) => id !== obj.id);
    setProjectData(updatedProjectData);
    history.push("/Projects");
  };

  const persistQuoteStyle = (): void => {
    setSingleProjectData({ ...singleProjectData, quoteStyle });
    const updatedProjectData = projectData.map((obj: ProjectData) => {
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
      <SpeedDial setDeletePopup={setDeletePopup} />
      <GenericDialog
        dialogTitle={`Welcome to your new Project: ${singleProjectData && singleProjectData?.title}`}
        isOpen={welcomePopup}
        dialogActionBtnText="Start"
        dialogActionMethod={persistQuoteStyle}
        isAbortable={false}
        dialogCloseMethod={() => setWelcomePopup(false)}
      >
        <>
          <DialogContentText>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, amet! Unde eaque repudiandae vero ex repellendus dolorem minus voluptatem.</DialogContentText>
          <FormControl sx={{ marginBlockStart: "16px" }} component="fieldset">
            <FormLabel component="legend">Select your quote style:</FormLabel>
            <RadioGroup onChange={switchQuoteStyle} row aria-label="quote style" name="row-radio-buttons-group">
              <FormControlLabel checked value="apa" control={<Radio />} label="APA" />
              <FormControlLabel disabled value="harvard" control={<Radio />} label="Harvard" />
              <FormControlLabel disabled value="mla" control={<Radio />} label="MLA" />
            </RadioGroup>
          </FormControl>
        </>
      </GenericDialog>
      <GenericDialog
        dialogTitle={`Do you want to delete ${singleProjectData && singleProjectData?.title}?`}
        isOpen={deletePopup}
        dialogActionBtnText="Delete"
        dialogActionMethod={deleteCurrentProject}
        dialogCloseMethod={() => setDeletePopup(false)}
      >
        <DialogContentText>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</DialogContentText>
      </GenericDialog>
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
