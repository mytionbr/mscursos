import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@material-ui/core"
import {MenuBook} from '@material-ui/icons';

import { withRouter } from "react-router-dom"


const Menu = withRouter(({history}) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar >
              <Grid spacing={2} >
                <MenuBook />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{margin:'7px'}}>
                    Escola Admin
                </Typography> 
              </Grid>
           
           <Grid direction="row" spacing={2} style={{'position':'absolute', 'right':'10px'}}>
            <Button color="inherit">Matricule-se</Button>
            <Button color="inherit">Login</Button>
           </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    )
})

export default Menu