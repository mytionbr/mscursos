import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";


function MenuButton({id}) {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null)
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        history.push(`/professor/app/cursos/${id}`)
        handleClose()
    }

    const handleDelete = (id) => {
        handleClose()
    }

    return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        style={{
          background: '#506198',
          color:'#fff'
        }}
      >
        Opções
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={handleEdit}
          style={{
            color:'#ff9800',
            fontWeight:'600'
          }}>Editar</MenuItem>
        <MenuItem 
          onClick={handleDelete}
          style={{
            color:'#e91e63',
            fontWeight:'600'
          }}>Excluir</MenuItem>
      </Menu>
    </div>
  );
}

export default MenuButton;
