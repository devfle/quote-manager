/* React Dependencies */
import React from "react";

/* Internal Dependencies */
import { SavedProjects, ProjectData } from "../App";
import EmptyState from "../components/EmptyState/EmptyState";
import ProjectCard from "../components/ProjectCard/ProjectCard";

/* Material UI */
import { SpeedDial, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

/* Other Dependencies */
import { v4 as uuidv4 } from "uuid";

interface InitProjectData {
  title: string;
  description?: string | undefined;
  id: string | number;
  quoteStyle: null | string;
  formData: [];
}

function Quotes() {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [projectFormData, setProjectFormData] = React.useState<{ title: string; description?: string }>({ title: "", description: "" });

  // TODO: create helper function
  const projectSettings = React.useContext(SavedProjects);

  if (!projectSettings?.setProjectData) {
    throw new Error("xy");
  }

  const { setProjectData } = projectSettings;

  React.useEffect(() => {
    if (projectFormData.title && isError) {
      setIsError(false);
    }
  }, [projectFormData.title, isError]);

  const toggleDialog = (): void => {
    setShowDialog((prevDialogState: boolean) => !prevDialogState);
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

  const initProject = (): InitProjectData => {
    return {
      id: uuidv4(),
      quoteStyle: null,
      formData: [],
      ...projectFormData,
    };
  };

  const updateProjectData = (): void => {
    if (!projectFormData.title) {
      setIsError(true);
      return;
    }

    setProjectData((prevProjectData: null | ProjectData[]) => {
      return [...(prevProjectData ? prevProjectData : []), initProject()];
    });

    resetProjectDataForm();
  };

  return (
    <div className="qm-quotes">
      <SpeedDial onClick={toggleDialog} sx={{ position: "absolute", bottom: 32, right: 32 }} icon={<Add />} ariaLabel="add new projekt"></SpeedDial>
      <Dialog keepMounted aria-describedby="alert-dialog-slide-description" open={showDialog}>
        <DialogTitle>Create new Project</DialogTitle>
        <DialogContent>
          <DialogContentText>Create a new project. Enter a title and a short description to start. Your projects will be saved locally in your browser.</DialogContentText>
          <TextField
            value={projectFormData.title}
            name="title"
            onChange={handleInput}
            sx={{ mt: 3, width: "100%" }}
            id="demo-helper-text-misaligned-no-helper"
            label="Project Name"
            error={isError}
            helperText={isError && "Can not be empty"}
          />
          <TextField value={projectFormData.description} name="description" onChange={handleInput} sx={{ mt: 2, width: "100%" }} id="demo-helper-text-misaligned-no-helper" label="Description" />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetProjectDataForm}>Cancel</Button>
          <Button variant="contained" onClick={updateProjectData}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {!!projectSettings?.projectData?.length ? <ProjectCard /> : <EmptyState />}
    </div>
  );
}

export default Quotes;
