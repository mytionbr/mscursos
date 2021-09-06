import { IconButton, InputBase, Paper } from '@material-ui/core';
import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles'

function InputFilter({handleSearch, state, setState}) {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.inputRoot}>
            <InputBase 
              className={classes.input}
              placeholder="Pesquise por um post"
              inputProps={{'aria-label': 'pesquise por um post'}}
              value={state}
              onChange={(event)=>setState(event.target.value)}
              />
              <IconButton 
                  type="submit" 
                  className={classes.iconButton} 
                  aria-label="pesquisar" 
                  onClick={handleSearch}>
                  <SearchIcon />
              </IconButton>

        </Paper>
    )
}


export default InputFilter
