import React from "react";
import { SpeedDial, SpeedDialIcon, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField } from "@mui/material";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function Quotes() {
  const [showDialog, setShowDialog] = React.useState(false);
  const [projectFormData, setProjectFormData] = React.useState({ title: "", description: "" });

  // TODO: save data for first step in local storage until backend ist ready
  const [projectData, setProjectData] = React.useState([{ id: 0, title: "Your Title", description: "lorem ipsum dolor sit amet" }]);

  const toggleDialog = () => {
    setShowDialog((prevDialogState) => !prevDialogState);
  };

  const resetProjectDataForm = () => {
    setProjectFormData({ title: "", description: "" });
    toggleDialog();
  };

  const transferProjectData = () => {
    // TODO: replace the length if items can be deleted it is not unique anymore
    createNewProject({ id: projectData.length, ...projectFormData });
    resetProjectDataForm();
  };

  // TODO: make desciption as type optional
  const createNewProject = (newProjectData: { id: number; title: string; description: string }) => {
    newProjectData.title && setProjectData((prevProjectData) => [...prevProjectData, newProjectData]);
  };

  // TODO: replace any type
  const handleInput = (_: any) => {
    setProjectFormData((prevFormData) => {
      return { ...prevFormData, [_.target.name]: _.target.value };
    });
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
          <Button onClick={transferProjectData}>Create</Button>
          <Button onClick={resetProjectDataForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ProjectCard projects={projectData} />
    </div>
  );
}

export default Quotes;
