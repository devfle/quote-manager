import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import "./ProjectCard.scss";

interface ProjectCardProps {
  projects: {
    id: number;
    title: string;
    description: string;
  }[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
  const cardContent = projects.map((_) => {
    return (
      <Card key={_.id} sx={{ transition: "all .2s linear", cursor: "pointer", width: 280 }} className="qm-project-card">
        <CardContent>
          <Typography variant="h5" className="qm-project-card__headline">
            {_.title}
          </Typography>
          <Typography>{_.description}</Typography>
        </CardContent>
      </Card>
    );
  });

  return <Box sx={{ display: "flex" }}>{cardContent}</Box>;
};

export default ProjectCard;
