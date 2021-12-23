import React from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

function Navigation() {
  const navigationPointList: string[] = ["Dashboard", "Quotes", "Settings"];
  const navigationPoints = navigationPointList.map((navigationString) => (
    <li key={navigationString} className="qm-navigation__list-item">
      <Link className="qm-navigation__link" to={`/${navigationString}`}>
        {navigationString}
      </Link>
    </li>
  ));
  return (
    <nav className="qm-navigation">
      <Avatar alt="User Avatar" sx={{ width: 90, height: 90 }} className="qm-navigation__avatar">
        DF
      </Avatar>
      <ul className="qm-navigation__list">{navigationPoints}</ul>
    </nav>
  );
}

export default Navigation;
