import React from "react";
import "./Navigation.scss";

import Avatar from "@mui/material/Avatar";

function Navigation() {
  return (
    <nav className="qm-navigation">
      <Avatar alt="User Avatar" sx={{ width: 72, height: 72 }} className="qm-navigation__avatar">
        DF
      </Avatar>
    </nav>
  );
}

export default Navigation;
