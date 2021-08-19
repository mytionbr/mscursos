import {
  Box,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ClassIcon from "@material-ui/icons/Class";
import PeopleIcon from "@material-ui/icons/People";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";
function DashboardSidebar({ onMobileClose, handleSignout, openMobile }) {
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, []);

  const items = [
    {
      href: "/aluno/app/dashboard",
      icon: <DashboardIcon/>,
      title: "Dashboard",
    },
    {
      href: "/aluno/app/cursos",
      icon: <LibraryBooksIcon/>,
      title: "Cursos",
    },
    {
      href: "/aluno/app/forum",
      icon: <ClassIcon/>,
      title: "Fórum",
    },
    {
      href: "/aluno/app/perfil",
      icon: <PeopleIcon/>,
      title: "Perfil",
    },
    {
      href: "/professor/app/perfil/editar",
      icon: <PersonIcon/>,
      title: "Editar perfil",
    },
    {
      href: "/aluno/signout",
      icon: <ExitToAppIcon/>,
      title: "Sair",
      action: handleSignout,
    },
  ];

  const content = (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box style={{ padding: "1rem" }}>
        <List>
          {items.map((item) => (
            <ListItem button component={NavLink} to={item.href} key={item.title}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box style={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
     
      <Hidden mdUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        style:{
                            width: 256
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
    </>
  );
}

export default DashboardSidebar;
