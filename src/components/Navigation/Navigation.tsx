/* React Dependencies */
import { NavLink } from "react-router-dom";
import React from "react";

/* Internal Dependencies */
import "./Navigation.scss";

/* Material UI */
import { IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavigationProps {
  navigationItems: { title: string; icon: React.FC<any>; link: string }[];
  showTitle: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ navigationItems, showTitle }) => {
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
        {showTitle ? _.title : ''}
      </NavLink>
    </li>
  ));

  return (
    <>
      {!isTablet && showTitle ? (
        <IconButton className="qm-burger-button" sx={{ zIndex: 20, alignSelf: "flex-start" }} onClick={() => setShowNavigation((prevNavState) => !prevNavState)} aria-label="toggle navigation">
          <MenuIcon />
        </IconButton>
      ) : null}
      <nav className={`${showNavigation ? "qm-navigation--is-visible" : ""} ${!showTitle ? 'qm-navigation--is-small' : ''} qm-navigation`}>
        <ul className="qm-navigation__list">{navigation}</ul>
      </nav>
    </>
  );
};

export default Navigation;
