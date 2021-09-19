import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core"
import MenuBookIcon from '@material-ui/icons/MenuBook';
import useStyles from './styles'
import { Link } from "react-router-dom";
import logo from '../../../assets/mscursos - logo cut.png'
const Navbar = () => {
    const classes = useStyles()  

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
              <Link to="/" className={classes.brand}>
               <img src={logo} alt="logo" style={{width: '100%',height: '40px'}}/>
              </Link>
              <div className={classes.nav} >
                <Button className={classes.navbarLink} component={Link} to="/aluno/matriculas" variant="contained" color="primary">Matricule-se</Button>
                <Button className={classes.navbarLink} component={Link} to="/aluno/signin" variant="contained" color="primary">Login</Button>
              </div>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Navbar