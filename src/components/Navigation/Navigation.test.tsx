import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";

const navigationItems = [
  { title: "Dashboard", icon: DashboardIcon, link: "Hello" },
  { title: "Projects", icon: ArticleIcon, link: "World" },
];

describe("tests navigation component", () => {
  it("tests if navigation renders correctly", () => {
    render(
      <Router>
        <Navigation showTitle navigationItems={navigationItems} />
      </Router>
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });

  it("tests if navigation renders without title", () => {
    render(
      <Router>
        <Navigation showTitle={false} navigationItems={navigationItems} />
      </Router>
    );
    expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Projects/i)).not.toBeInTheDocument();
  });
});
