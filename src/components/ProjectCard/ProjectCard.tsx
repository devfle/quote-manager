import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { SavedProjects } from "../../App";

import "./ProjectCard.scss";

const ProjectCard: React.FC = () => {
  const { projectData } = React.useContext(SavedProjects);
  const cardContent =
    projectData &&
    projectData.map((_: { id: string | number; title: string; description?: string }) => {
      return (
        <Link key={_.id} className="qm-project-card" to={`/Quote/${_.id}`}>
          <Card sx={{ transition: "all .2s linear", cursor: "pointer", width: 280 }}>
            <CardContent>
              <Typography variant="h5" className="qm-project-card__headline">
                {_.title}
              </Typography>
              <Typography>{_.description}</Typography>
            </CardContent>
          </Card>
        </Link>
      );
    });

  return <Box sx={{ display: "flex" }}>{cardContent}</Box>;
};

export default ProjectCard;
