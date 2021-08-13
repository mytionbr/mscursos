import { Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import React from "react";

function SuccessAlert({message}) {
  const [open, setOpen] = React.useState(true);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">
         {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SuccessAlert;
