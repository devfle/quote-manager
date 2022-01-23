import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.scss";
import Dashboard from "./sites/Dashboard";
import Quotes from "./sites/Quotes";
import SingleProject from "./sites/SingleProject";
import React from "react";

// custom components
import Navigation from "./components/Navigation/Navigation";
import { Typography } from "@mui/material";

// set app into dark mode
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
}

// TODO: fix any type
export const SavedProjects = React.createContext<any>([]);

const fetchData = (dataID: string): ProjectData | null => {
  let data = localStorage.getItem(dataID);
  if (data) {
    return JSON.parse(data);
  }
  console.warn(`failed to fetch data with the id: ${dataID}`);
  return null;
};

const persistData = (dataID: string, data: string | object | number): void => {
  localStorage.setItem(dataID, JSON.stringify(data));
};

function App() {
  const [projectData, setProjectData] = React.useState<ProjectData | null>(null);
  const project = { projectData, setProjectData };

  //TODO: maybe add custom react hook for persist data in local storage
  React.useEffect(() => {
    setProjectData(fetchData("project"));
    console.log("fetch");
  }, []);

  //TODO: maybe check for old state and only persist when state is realy changed
  //TODO: Persist is triggered two times at beginning.
  React.useEffect(() => {
    console.log(projectData);
    projectData && persistData("project", projectData);
  }, [projectData]);

  return (
    <SavedProjects.Provider value={project}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <div className="quote-manager">
            <Navigation />
            <Typography variant="h4" className="quote-manager-title"></Typography>
            <Switch>
              <Route path="/Projects">
                <Quotes />
              </Route>
              <Route path="/Quote/:id">
                <SingleProject />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </SavedProjects.Provider>
  );
}

export default App;
