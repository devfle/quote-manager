import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import * as React from "react";

interface DialogProps {
  dialogTitle: string;
  dialogText?: string;
  dialogActionBtnText: string;
  dialogCloseBtnText?: string;
  isOpen: boolean;
  isAbortable?: boolean;
  children?: JSX.Element;
  dialogCloseMethod: () => void;
  dialogActionMethod: () => void;
}

const GenericDialog: React.FC<DialogProps> = ({ children, dialogTitle, isAbortable = true, dialogText, dialogActionBtnText, dialogCloseBtnText, isOpen, dialogActionMethod, dialogCloseMethod }) => {
  return (
    <Dialog keepMounted aria-describedby="alert-dialog-slide-description" open={isOpen}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {isAbortable && <Button onClick={dialogCloseMethod}>{dialogCloseBtnText ?? "Cancel"}</Button>}
        <Button onClick={dialogActionMethod}>{dialogActionBtnText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
