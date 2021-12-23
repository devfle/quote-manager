import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.scss";
import Dashboard from "./sites/Dashboard";
import Quotes from "./sites/Quotes";
import Settings from "./sites/Settings";

// custom components
import Navigation from "./components/Navigation/Navigation";
import { Typography } from "@mui/material";

// set app into dark mode
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="quote-manager">
          <Navigation />
          <Typography variant="h4" className="quote-manager-title">
            Dashboard
          </Typography>
          <Switch>
            <Route exact path="/Dashboard">
              <Dashboard title="Moin" />
            </Route>
            <Route path="/Quotes">
              <Quotes />
            </Route>
            <Route path="*">
              <Settings />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
