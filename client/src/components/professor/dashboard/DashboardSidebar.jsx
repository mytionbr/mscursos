import React, { useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import Navitem from './Navitem';
import { useSelector } from 'react-redux';

function DashboardSidebar({onMobileClose,handleSignout, openMobile}) {
    console.log(onMobileClose, openMobile)
   
    const location = useLocation()

    const professorSignin = useSelector((state) => state.professorSignin)
    const {professorInfo} = professorSignin



    const user = {
        office: 'Professor',
        name: professorInfo.nome
    }
        

    const items = [
        {
            href: '/professor/app/dashboard',
            icon: DashboardIcon,
            title: 'Dashboard'
        },
        {
            href: '/professor/app/cursos',
            icon: LibraryBooksIcon,
            title: 'Cursos'
        },
        {
            href: '/professor/app',
            icon: PeopleIcon,
            title: 'Alunos'
        },
        {
            href: '/professor/app',
            icon: ClassIcon,
            title: 'Notas'
        },
        {
            href: '/professor/app',
            icon: PersonIcon,
            title: 'Perfil'
        },
        {
            href: '/professor/signout',
            icon: ExitToAppIcon,
            title: 'Sair',
            action: handleSignout
        },
    ]


    useEffect(() =>{
        if (openMobile && onMobileClose) {
            onMobileClose()
        }
    }, [location.pathname])

    const content = (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                padding:'2rem',
            }}>
                <Avatar
                    component={Link}
                    style={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64,
                        background:'#506198'
                    }}
                    to="/professor/app/dashboard"
                >
                    <PersonIcon
                        style={{
                            width: 64,
                            height: 64,
                        }}
                    />
                </Avatar>
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
            <Box style={{padding:'1rem'}}>
                <List>
                    {
                        items.map((item)=>(
                            <Navitem
                                href={item.href}
                                key={item.title}
                                title={item.title}
                                icon={item.icon}
                                action={item.action}/>
                        ))
                    }
                </List>
            </Box>
            <Box style={{flexGrow: 1}} />
        </Box>
    )

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
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        style: {
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
