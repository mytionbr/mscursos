import React, { useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import Navitem from './Navitem';


const user = {
    avatar: AccountBoxIcon,
    office: 'Professor',
    name: 'Fulano'
}

const items = [
    {
        href: '/',
        icon: DashboardIcon,
        title: 'Dashboard'
    },
    {
        href: '/',
        icon: LibraryBooksIcon,
        title: 'Cursos'
    },
    {
        href: '/',
        icon: PeopleIcon,
        title: 'Alunos'
    },
    {
        href: '/',
        icon: ClassIcon,
        title: 'Notas'
    },
]

function DashboardSidebar({onMobileClose, openMobile}) {
    const location = useLocation()

    useEffect(() =>{
        if (openMobile && onMobileClose) {
            onMobileClose()
        }
    }, [location.pathname])

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                p: 2
            }}>
                <Avatar
                    component={Link}
                    src={user.avatar}
                    sx={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                    to="/app/"
                />
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.office}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{p:2}}>
                <List>
                    {
                        items.map((item)=>(
                            <Navitem
                                href={item.href}
                                key={item.title}
                                title={item.title}
                                icon={item.icon}/>
                        ))
                    }
                </List>
            </Box>
            <Box sx={{flexGrow: 1}} />
        </Box>
    )

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        sx:{
                            width: 256
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden lgDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 256,
                            top: 64,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    )
}

export default DashboardSidebar
