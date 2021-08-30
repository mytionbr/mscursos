import { AppBar, Box, Button, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import LoadingBox from '../../../core/LoadingBox/LoadingBox';
import MessageBox from '../../../core/MessageBox/MessageBox';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';

function AulaNavbar({onMobileNavOpen, ...rest}) {
    
    const dispatch = useDispatch()
    const aulaInfomations = useSelector((state) => state.aulaInfomations);
    const { loading, error, data:aula } = aulaInfomations;

    const handleFinishAula = ()=>{
        console.log('oi')
    }

    return (
        <AppBar
            elevation={0}
            {...rest}
        >
            <Toolbar
                style={{
                backgroundColor: '#29292E',
                color:'#fff'
            }}>
                 <Hidden mdUp>
                    <IconButton 
                        color="inherit"
                        onClick={onMobileNavOpen}>
                            <MenuIcon />
                    </IconButton>
                   </Hidden>
                <Box style={{flexGrow: 1}}/>
                {
                    loading ? (
                        <>
                            <Box mx={1}>
                                <Skeleton variant="rect" width={'10rem'} height={20} />
                            </Box>
                            <Box mx={1}>
                                <Skeleton variant="rect" width={'5rem'} height={20} />
                            </Box>
                        </>
                    ) : error ? (
                        <MessageBox type='error'>{error}</MessageBox>
                    ) : aula ? (
                    <>
                         <Typography variant='h4'>
                            {aula.nome}
                        </Typography>
                        <Button
                            onClick={handleFinishAula}
                        >
                            Finalizar aula
                        </Button>
                    </>
                    ) : (
                        ''
                    ) 
                }
               
                
            </Toolbar>            
        </AppBar>
    )
}

export default AulaNavbar
