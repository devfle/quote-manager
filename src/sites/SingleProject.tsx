/* React Dependencies */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Internal Dependencies */
import QuoteForm from "../components/QuoteForm/QuoteForm";
import GenericDialog from "../components/GenericDialog/GenericDialog";
import Quote from "../components/Quote/Quote";
import { SavedProjects, ProjectData, Snack } from "../App";
import { FormData } from "../components/QuoteForm/QuoteForm";

/* Material UI */
import { Card, CardContent, DialogContentText, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, SpeedDial, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* Other Dependencies */
import { v4 as uuid } from "uuid";

const SingleProject = () => {
  const [quoteStyle, setQuoteStyle] = React.useState<string>("iu");
  const [welcomePopup, setWelcomePopup] = React.useState<boolean>(false);
  const [deletePopup, setDeletePopup] = React.useState<boolean>(false);

  const [singleProjectData, setSingleProjectData] = React.useState<null | ProjectData>(null);
  const [sortedProjectData, setSortedProjectData] = React.useState<null | FormData[]>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const snack = React.useContext(Snack);
  let projectSettings = React.useContext(SavedProjects);

  if (!projectSettings?.setProjectData) {
    throw new Error("project data not found");
  }

  if (!projectSettings?.projectData) {
    projectSettings.projectData = [];
  }

  const { projectData, setProjectData } = projectSettings;

  const backToProjects = (message: string): void => {
    if (typeof snack !== "function") {
      return;
    }

    snack({ visible: true, message });
    navigate("/Projects", { replace: true });
  };

  const findDataById = (id: string | number, data: ProjectData[]): ProjectData | null => {
    if (!data || !data.length || !id) {
      backToProjects("The Project does not exsist.");
      return null;
    }
    const foundData = data.find((_) => _.id === id);
    if (!foundData) return null;

    return foundData;
  };

  const switchQuoteStyle = (_: React.ChangeEvent<HTMLInputElement>): void => {
    setQuoteStyle(_.target.value);
  };

  const deleteQuote = (index: number): void => {
    if (!singleProjectData) return;
    const updatedFormData = singleProjectData.formData.filter((_formItem: FormData, formElmIndex: number) => formElmIndex !== index);
    deleteQuoteData(updatedFormData);
  };

  const sortQuotes = (): FormData[] | null => {
    if (!singleProjectData) {
      return null;
    }

    const sortedProjectData: FormData[] = singleProjectData?.formData?.sort((firstItem: FormData, secondItem: FormData) => {
      firstItem.lastname ??= "o.V";
      secondItem.lastname ??= "o.V";

      return firstItem.lastname > secondItem.lastname ? 1 : secondItem.lastname > firstItem.lastname ? -1 : 0;
    });

    return sortedProjectData;
  };

  const deleteCurrentProject = (): void => {
    const updatedProjectData = projectData.filter((obj: ProjectData) => id !== obj.id);
    setProjectData(updatedProjectData);
    backToProjects("Projekt was deleted.");
  };

  const persistQuoteStyle = (): void => {
    const updatedProjectData = projectData.map((obj: ProjectData) => {
      if (id !== obj.id) {
        return obj;
      }

      return {
        ...obj,
        quoteStyle,
      };
    });
    setProjectData(updatedProjectData);
    setWelcomePopup(false);
  };

  const deleteQuoteData = (data: FormData[]): void => {
    const updatedProjectData = projectData.map((obj: ProjectData) => {
      if (id !== obj.id) {
        return obj;
      }

      return {
        ...obj,
        formData: [...data],
      };
    });
    setProjectData(updatedProjectData);
  };

  const persistFormData = React.useCallback(
    (data: FormData) => {
      const updatedProjectData = projectData.map((obj: ProjectData) => {
        if (id !== obj.id || !data) {
          return obj;
        }

        return {
          ...obj,
          formData: [...obj.formData, data],
        };
      });
      setProjectData(updatedProjectData);
    },
    [id, projectData, setProjectData]
  );

  React.useEffect(() => {
    id && setSingleProjectData(findDataById(id, projectData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, projectData]);

  React.useEffect(() => {
    if (!welcomePopup && singleProjectData?.quoteStyle === null) {
      setWelcomePopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProjectData]);

  React.useEffect(() => {
    const getSortedQuotes = sortQuotes();
    if (!getSortedQuotes) return;
    setSortedProjectData(getSortedQuotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProjectData]);

  return (
    <div className="qm-single-project">
      <SpeedDial onClick={() => setDeletePopup(true)} sx={{ position: "fixed", bottom: 32, right: 32 }} icon={<DeleteForeverIcon />} ariaLabel="delete this project"></SpeedDial>
      <GenericDialog
        dialogTitle={`Welcome to your new Project: ${singleProjectData && singleProjectData?.title}`}
        isOpen={welcomePopup}
        dialogActionBtnText="Start"
        dialogActionMethod={() => persistQuoteStyle()}
        isAbortable={false}
      >
        <>
          <DialogContentText>Choose your citation rule. Unfortunately, only the citation guideline of the international university (iu) is currently supported.</DialogContentText>
          <FormControl sx={{ marginBlockStart: "16px" }} component="fieldset">
            <FormLabel component="legend">Select your quote style:</FormLabel>
            <RadioGroup onChange={switchQuoteStyle} row aria-label="quote style" name="row-radio-buttons-group">
              <FormControlLabel checked value="iu" control={<Radio />} label="IU" />
              <FormControlLabel disabled value="apa" control={<Radio />} label="APA" />
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
        <DialogContentText>Do you really want to delete your project? This cannot be undone. You can always create a new project.</DialogContentText>
      </GenericDialog>
      <div className="qm-card-wrapper">
        <QuoteForm persistFormData={persistFormData} />
        <Card sx={{ mb: 2, mx: 1, padding: "16px 24px" }} className="qm-card">
          <Typography sx={{ marginBlockEnd: "16px" }} className="qm-card__headline" variant="h5">
            Your Quotes
          </Typography>
          <CardContent sx={{ p: 0 }}>
            <ul style={{ lineHeight: 1.4, listStyle: "none" }} className="qm-card__quote-list">
              {sortedProjectData?.map((_: FormData, index: number) => (
                <li style={{ marginBlockEnd: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }} key={uuid()}>
                  <Quote source={_.source} formData={_} />
                  <IconButton onClick={() => deleteQuote(index)} className="qm-card__delete-icon" sx={{ ml: 1, visibility: "hidden" }} aria-label="delete quote">
                    <DeleteForeverIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleProject;
