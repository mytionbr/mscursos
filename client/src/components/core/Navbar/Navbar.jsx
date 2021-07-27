import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core"
import MenuBookIcon from '@material-ui/icons/MenuBook';
import useStyles from './styles'
import { Link } from "react-router-dom";

const Navbar = () => {
    const classes = useStyles()  

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
              <Link to="/" className={classes.brand}>
               <MenuBookIcon className={classes.brandIcon}/>
                <Typography variant="h4">
                 Escola Admin
                </Typography>
              </Link>
              <div className={classes.nav} >
                <Button className={classes.navbarLink} component={Link} to="/" variant="contained" color="primary">Matricule-se</Button>
                <Button className={classes.navbarLink} component={Link} to="/" variant="contained" color="primary">Login</Button>
              </div>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Navbar