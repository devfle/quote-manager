import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const actions = [
  { icon: <SettingsIcon />, name: "Settings" },
  { icon: <DeleteForeverIcon />, name: "Delete Project" },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1, position: "absolute", bottom: 32, right: 32 }}>
      <SpeedDial ariaLabel="SpeedDial controlled open example" sx={{ position: "absolute", bottom: 0, right: 0 }} icon={<SpeedDialIcon />} onClose={handleClose} onOpen={handleOpen} open={open}>
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
        ))}
      </SpeedDial>
    </Box>
  );
}
