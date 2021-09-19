import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ClassIcon from "@material-ui/icons/Class";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../../actions/alunoActions";
import { useHistory } from "react-router-dom";
function DashboardNavbar({ onMobileNavOpen, nav,handleSignout, ...rest }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const menuId = "primary-search-account-menu";
  const dispatch = useDispatch();

  const history = useHistory();

  const alunoSignin = useSelector((state) => state.alunoSignin);
  const { alunoInfo } = alunoSignin;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(onMobileNavOpen);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSearch = () => {
    history.push(`/aluno/app/busca/query?nome=${search}`);
    setSearch("");
  };

  return (
    <div>
      <AppBar elevation={0} position="absolute" {...rest}>
        <Toolbar className={classes.toolbar}>
          <Link to="/aluno/app" className={classes.brandLink}>
            <MenuBookIcon className={classes.brandIcon} />
            <Typography className={classes.brand} variant="h5" noWrap>
              Mscursos
            </Typography>
          </Link>
          <Box style={{ flexGrow: 1 }} />
          <Hidden smDown>
            <form className={classes.search}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="pesquisar"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
              <div>
                <InputBase
                  placeholder="Buscar..."
                  inputProps={{ "aria-label": "search" }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={handleChange}
                  value={search}
                />
              </div>
            </form>
          </Hidden>
          <Box style={{ flexGrow: 1 }} />
          <Hidden smDown>
            <div className={classes.sectionNav}>
              <Button
                component={NavLink}
                className={classes.navLink}
                to="/aluno/app/dashboard"
                color="inherit"
              >
                <DashboardIcon className={classes.icon} />
                Dashboard
              </Button>
              <Button
                component={NavLink}
                className={classes.navLink}
                to="/aluno/app/cursos"
                color="inherit"
              >
                <ClassIcon className={classes.icon} />
                Cursos
              </Button>
              <Button
                component={NavLink}
                className={classes.navLink}
                to="/aluno/app/forum"
                color="inherit"
              >
                <LibraryBooksIcon className={classes.icon} />
                Fórum
              </Button>

              <div>
                <Button
                  className={classes.navLink}
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  <AccountCircle className={classes.icon} />
                  Usuário
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  id={menuId}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to={`/aluno/app/perfil/${alunoInfo.aluno_id}`}
                  >
                    Perfil
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to={`/aluno/app/info/${alunoInfo.aluno_id}`}
                  >
                    Seus dados
                  </MenuItem>
                  <MenuItem onClick={handleSignout}>Sair</MenuItem>
                </Menu>
              </div>
            </div>
          </Hidden>
          <Hidden mdUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default DashboardNavbar;
