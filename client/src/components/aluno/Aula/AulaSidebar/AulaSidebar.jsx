import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Navitem from '../Navitem'
import {getIconByCategoria} from '../../../../utils/getIconByCategoria'
import LoadingBox from '../../../core/LoadingBox/LoadingBox';
import MessageBox from '../../../core/MessageBox/MessageBox';
import { findAulasInfo } from '../../../../actions/aulaActions';

function AulaSidebar({onMobileClose, openMobile}) {
            
    const dispatch = useDispatch();
    const aulaInfoList = useSelector((state) => state.aulaInfoList);
    const { loading, error, data } = aulaInfoList;

    console.log(data)

    useEffect(() =>{
        if (openMobile && onMobileClose) {
            onMobileClose()
        }
    }, [])

    const Picture = () => {
        let Icon = getIconByCategoria(data.curso.categoria_id)
    
        return (
         <Box>
             <Icon style={{fontSize:'2.5rem'}}  />
          </Box>
        );
      };
    

    function Content(){ 
        return (
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
                    to="/aluno/app"
                >
                    <Picture />
                </Avatar>
                <Typography
                    variant="h5"
                    style={{
                        color: "#fff"
                    }}
                >
                    {data.curso.nome}
                </Typography>
            </Box>
            <Divider style={{background:"#fff"}} />
            <Box style={{padding:'1rem'}}>
                <List>
                    {
                        data.aulas.map((aula)=>(
                            <Navitem
                                href={`/aluno/app/curso/${data.curso.slug}/aulas/${aula.aula_id}`}
                                key={aula.slug}
                                title={aula.nome}
                                visualization={aula.visualizacao_id}
                                />
                        ))
                    }
                </List>
            </Box>
            <Box style={{flexGrow: 1}} />
        </Box>
    )}  

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
                        width: 256,
                        background: "#19191C"
                    }
                }}
            >
                {
                    loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox type="error">
                            {error}
                        </MessageBox>
                    ) : (
                        <Content/>
                    )
                }
                
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
                        background: "#212121"
                    }
                }}
            >
                {
                    loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox type="error">
                            {error}
                        </MessageBox>
                    ) : (
                        <Content/>
                    )
                }
            </Drawer>
        </Hidden>
    </>
    )
}

export default AulaSidebar
