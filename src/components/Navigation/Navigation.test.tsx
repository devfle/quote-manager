import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";

describe("tests navigation component", () => {
  it("tests if navigation renders correctly", () => {
    const navigationItems = [
      { title: "Dashboard", icon: DashboardIcon, link: "Hello" },
      { title: "Projects", icon: ArticleIcon, link: "World" },
    ];
    render(
      <Router>
        <Navigation navigationItems={navigationItems} />
      </Router>
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });
});
