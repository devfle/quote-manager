/* React Dependencies */
import { NavLink } from "react-router-dom";
import React from "react";

/* Internal Dependencies */
import "./Navigation.scss";

/* Material UI */
import { IconButton, Typography, useMediaQuery, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavigationProps {
  navigationItems: { title: string; icon: React.FC<any>; link: string }[];
}

const Navigation: React.FC<NavigationProps> = ({ navigationItems }) => {
  const [showNavigation, setShowNavigation] = React.useState(true);
  const isTablet = useMediaQuery("(min-width: 1024px)");

  /* close navigation on small devices */
  React.useEffect(() => {
    setShowNavigation(isTablet);
  }, [isTablet]);

  /* create navigation structure */
  const navigation = navigationItems.map((_) => (
    <li key={_.title} className="qm-navigation__list-item">
      <NavLink style={{ display: "flex", alignItems: "center" }} className="qm-navigation__link" to={`/${_.link}`}>
        <_.icon sx={{ mr: 1 }} />
        {_.title}
      </NavLink>
    </li>
  ));

  return (
    <>
      {!isTablet ? (
        <IconButton className="qm-burger-button" sx={{ zIndex: 20, alignSelf: "flex-start" }} onClick={() => setShowNavigation((prevNavState) => !prevNavState)} aria-label="toggle navigation">
          <MenuIcon />
        </IconButton>
      ) : null}
      <nav className={`${showNavigation ? "qm-navigation--is-visible" : ""} qm-navigation`}>
        <Avatar alt="User Avatar" sx={{ width: 90, height: 90 }} className="qm-navigation__avatar">
          User
        </Avatar>
        <ul className="qm-navigation__list">{navigation}</ul>
        <Typography sx={{ position: "absolute", bottom: 24, px: 3 }} variant="body2" className="qm-navigation__version">
          Version 1.0.0
        </Typography>
      </nav>
    </>
  );
};

export default Navigation;
