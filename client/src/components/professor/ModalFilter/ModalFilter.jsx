import { Avatar, Drawer, IconButton } from "@material-ui/core";
import React from "react";

import useStyles from './styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function ModalFilter({ onModalClose, openModal, form }) {
  const classes = useStyles()
  
  return (
    <>
      <Drawer
        anchor="right"
        onClose={onModalClose}
        open={openModal}
        variant="temporary"
        className={classes.paper}
       
      >
        <div className={classes.btnBack}>
            <Avatar className={classes.avatar}>
                <IconButton onClick={onModalClose}>
                    <ArrowBackIcon />
                </IconButton>
            </Avatar>
        </div>
        {form}        
      </Drawer>
    </>
  );
}

export default ModalFilter;
