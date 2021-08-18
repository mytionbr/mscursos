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

function DashboardNavbar({ onMobileNavOpen, nav, ...rest }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(onMobileNavOpen);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    onMobileNavOpen();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Editar</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar elevation={0} {...rest}>
        <Toolbar
          style={{
            backgroundColor: "#fff",
            color: "#506198",
          }}
        >
          <Link to="/" className={classes.brandLink}>
            <Typography className={classes.brand} variant="h6" noWrap>
              Mscursos
            </Typography>
          </Link>
          <Box style={{ flexGrow: 1 }} />
          <div>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div>
              <InputBase
                placeholder="Buscar..."
                inputProps={{ "aria-label": "search" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </div>
          <Box style={{ flexGrow: 1 }} />
          <Hidden mdDown>
            <div className={classes.sectionNav}>
              <Button
                component={NavLink}
                className={classes.navLink}
                to="/"
                color="inherit"
              >
                Dashboard
              </Button>
              <Button
                component={NavLink}
                className={classes.navLink}
                to="/"
                color="inherit"
              >
                Forum
              </Button>
              <Button
                component={NavLink}
                className={classes.navLink}
                to="/"
                color="inherit"
              >
                Forum
              </Button>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
