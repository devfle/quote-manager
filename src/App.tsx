import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

// Custom Components
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <Router>
      <div className="quote-manager">
        <Navigation />
        <h1 className="quote-manager-title">Dashboard</h1>
        <Switch>
          <Route exact path="/">
            <h1>Esel</h1>
          </Route>
          <Route path="/Quotes">
            <h1>Quotes</h1>
          </Route>
          <Route path="*">
            <h1>Seite nicht gefunden.</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
