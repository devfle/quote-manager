import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface SpeedDialProps {
  setDeletePopup: (state: boolean) => void;
}

const ControlledOpenSpeedDial: React.FC<SpeedDialProps> = ({ setDeletePopup }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const menuItems = [
    { icon: <SettingsIcon />, name: "Settings", action: setDeletePopup },
    { icon: <DeleteForeverIcon />, name: "Delete Project", action: setDeletePopup },
  ];

  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1, position: "absolute", bottom: 32, right: 32 }}>
      <SpeedDial ariaLabel="SpeedDial controlled open example" sx={{ position: "absolute", bottom: 0, right: 0 }} icon={<SpeedDialIcon />} onClose={handleClose} onOpen={handleOpen} open={open}>
        {menuItems.map((menuItem) => (
          <SpeedDialAction key={menuItem.name} icon={menuItem.icon} tooltipTitle={menuItem.name} onClick={() => menuItem.action(true)} />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ControlledOpenSpeedDial;
