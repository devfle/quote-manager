/* React Dependencies */
import React from "react";
import { Link } from "react-router-dom";

/* Internal Dependencies */
import { SavedProjects } from "../../App";
import "./ProjectCard.scss";

/* Material UI */
import { Card, CardContent, Typography, Box } from "@mui/material";

const ProjectCard: React.FC = () => {
  const projectSettings = React.useContext(SavedProjects);

  /* if there are no project data, we can exit from this componenet */
  if (!projectSettings?.projectData) {
    return null;
  }

  /* prepare card content */
  const cardData = projectSettings?.projectData.map((_: { id: string | number; title: string; description?: string }) => {
    return (
      <Link key={_.id} className="qm-project-card" to={`/Quote/${_.id}`}>
        <Card sx={{ transition: "all .2s linear", cursor: "pointer", width: 310, minHeight: 120 }}>
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

  return <Box sx={{ display: "flex" }}>{cardData}</Box>;
};

export default ProjectCard;
