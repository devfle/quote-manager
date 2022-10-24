/* React Dependencies */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Internal Dependencies */
import { FormData } from "./components/QuoteForm/QuoteForm";
import Navigation from "./components/Navigation/Navigation";
import SingleProject from "./sites/SingleProject";
import Dashboard from "./sites/Dashboard";
import Quotes from "./sites/Quotes";
import "./App.scss";

/* Material UI */
import { Slide, SlideProps, Snackbar, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/* Other Dependencies */
import { v4 as uuid } from "uuid";

/* set app into dark mode */
//TODO: make mode depend on user settings
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export interface ProjectData {
  id: string | number;
  title: string;
  description?: string;
  quoteStyle: null | string;
  formData: FormData[];
}

export interface projectProvider {
  projectData: ProjectData[] | null;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData[] | null>>;
}

export const SavedProjects = React.createContext<null | projectProvider>(null);
export const Snack = React.createContext<null | React.Dispatch<
  React.SetStateAction<{
    visible: boolean;
    message: string;
  }>
>>(null);

const fetchData = (dataID: string): ProjectData[] | null => {
  let data = localStorage.getItem(dataID);
  if (data) {
    return JSON.parse(data);
  }
  // eslint-disable-next-line no-console
  console.warn(`failed to fetch data with the id: ${dataID}`);
  return null;
};

const persistData = (dataID: string, data: string | object | number): void => {
  localStorage.setItem(dataID, JSON.stringify(data));
};

const App = () => {
  const [projectData, setProjectData] = React.useState<ProjectData[] | null>(null);
  const [showSnackbar, setShowSnackbar] = React.useState({ visible: false, message: "" });
  const [navigationPointList] = React.useState([
    { title: "Dashboard", icon: DashboardIcon, link: "" },
    { title: "Projects", icon: ArticleIcon, link: "Projects" },
  ]);
  const [showNavigationTitle] = React.useState(false);

  const project = { projectData, setProjectData };

  React.useEffect(() => {
    setProjectData(fetchData("project"));
  }, []);

  React.useEffect(() => {
    projectData && persistData("project", projectData);
  }, [projectData]);

  type TransitionProps = Omit<SlideProps, "direction">;

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <SavedProjects.Provider value={project}>
      <Snack.Provider value={setShowSnackbar}>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <div className={`${!showNavigationTitle ? 'quote-manager--is-fullscreen' : ''} quote-manager`}>
              <Navigation showTitle={showNavigationTitle} navigationItems={navigationPointList} />
              <Typography variant="h4" className="quote-manager-title"></Typography>
              <Routes>
                <Route path="/Projects" element={<Quotes />} />
                <Route path="/Quote/:id" element={<SingleProject />} />
                <Route path="/" element={<Dashboard />} />
              </Routes>
              <Snackbar
                TransitionComponent={TransitionUp}
                open={showSnackbar.visible}
                onClose={() => setShowSnackbar({ visible: false, message: "" })}
                autoHideDuration={6000}
                message={showSnackbar.message}
                key={uuid()}
              />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </Snack.Provider>
    </SavedProjects.Provider>
  );
};

export default App;
