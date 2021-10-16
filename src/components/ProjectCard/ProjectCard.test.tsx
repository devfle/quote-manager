/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import { SavedProjects } from "../../App";
import { BrowserRouter as Router } from "react-router-dom";

const TestProjectCard = () => {
  return (
    <Router>
      <ProjectCard />
    </Router>
  );
};

describe("renders project card", () => {
  it("tests if project cards will be rendered", () => {
    const project = {
      projectData: [
        { id: "one", title: "Softwaredevelopment", description: "", quoteStyle: "apa", formData: [] },
        { id: "two", title: "Maths", description: "", quoteStyle: "apa", formData: [] },
      ],
      setProjectData: () => {},
    };
    render(
      <SavedProjects.Provider value={project}>
        <TestProjectCard />
      </SavedProjects.Provider>
    );
    expect(screen.getByText(/Softwaredevelopment/i)).toBeInTheDocument();
    expect(screen.getByText(/Maths/i)).toBeInTheDocument();
  });

  it("tests if nothing is rendered when project data is empty", () => {
    const project = null;
    const { container } = render(
      <SavedProjects.Provider value={project}>
        <TestProjectCard />
      </SavedProjects.Provider>
    );
    expect(screen.queryByText(/Test Project/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Maths/i)).not.toBeInTheDocument();
    expect(container.getElementsByClassName("qm-project-card").length).toBe(0);
  });
});
