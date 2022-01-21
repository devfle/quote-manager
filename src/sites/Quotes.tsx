import React from "react";
import { SpeedDial, SpeedDialIcon, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField } from "@mui/material";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { SavedProjects, ProjectData } from "../App";
import { v4 as uuidv4 } from "uuid";

function Quotes() {
  const [showDialog, setShowDialog] = React.useState(false);
  const [projectFormData, setProjectFormData] = React.useState({ title: "", description: "" });
  const { setProjectData } = React.useContext(SavedProjects);

  const toggleDialog = (): void => {
    setShowDialog((prevDialogState) => !prevDialogState);
  };

  const resetProjectDataForm = (): void => {
    setProjectFormData({ title: "", description: "" });
    toggleDialog();
  };

  const handleInput = (_: React.ChangeEvent<HTMLInputElement>): void => {
    setProjectFormData((prevFormData) => {
      return { ...prevFormData, [_.target.name]: _.target.value };
    });
  };

  const updateProjectData = (): void => {
    setProjectData((prevProjectData: null | Array<ProjectData>) => {
      const generateNewData = { id: uuidv4(), quoteStyle: null, ...projectFormData };
      return [...(prevProjectData ? prevProjectData : []), generateNewData];
    });
    resetProjectDataForm();
  };

  return (
    <div className="qm-quotes">
      <SpeedDial onClick={toggleDialog} sx={{ position: "absolute", bottom: 32, right: 32 }} icon={<SpeedDialIcon />} ariaLabel="add new projekt"></SpeedDial>
      <Dialog keepMounted aria-describedby="alert-dialog-slide-description" open={showDialog}>
        <DialogTitle>Create new Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, amet! Unde eaque repudiandae vero ex repellendus dolorem minus voluptatem veniam culpa cupiditate voluptas ab, quasi
            voluptatum odio tempora architecto dolor.
          </DialogContentText>
          <TextField
            value={projectFormData.title}
            name="title"
            onChange={handleInput}
            sx={{ marginBlockStart: "24px", width: "100%" }}
            id="demo-helper-text-misaligned-no-helper"
            label="Project Name"
          />
          <TextField
            value={projectFormData.description}
            name="description"
            onChange={handleInput}
            sx={{ marginBlockStart: "16px", width: "100%" }}
            id="demo-helper-text-misaligned-no-helper"
            label="Description"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetProjectDataForm}>Cancel</Button>
          <Button onClick={updateProjectData}>Create</Button>
        </DialogActions>
      </Dialog>
      <ProjectCard />
    </div>
  );
}

export default Quotes;
