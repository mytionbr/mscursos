import { Avatar, Box, Button, Divider, Drawer, Hidden, List, ListItem, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Navitem from '../NavItem/NavItem'
import {getIconByCategoria} from '../../../../utils/getIconByCategoria'
import LoadingBox from '../../../core/LoadingBox/LoadingBox';
import MessageBox from '../../../core/MessageBox/MessageBox';
import { findAulasInfo } from '../../../../actions/aulaActions';
import ProgressBar from '../../../ProgressBar/ProgressBar';

function AulaSidebar({onMobileClose, openMobile}) {
            
    const dispatch = useDispatch();
    const aulaInfoList = useSelector((state) => state.aulaInfoList);
    const { loading, error, data } = aulaInfoList;

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
                flexDirection: 'flex-start',
                padding:'0.5rem 1rem',
            }}>
                <Link 
                to={`/aluno/app/curso/${data.curso.slug}`}
                style={{textDecoration:'none'}}>
                <Typography
                    variant="h6"
                    style={{
                        color: "#fff"
                    }}
                >
                    Voltar
                </Typography>
                </Link>
            </Box>
            <Box style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                padding:'0.5rem 1rem',
            }}>
                <Avatar
                    component={Link}
                    style={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64,
                        background:'#506198'
                    }}
                    to={`/aluno/app/curso/${data.curso.slug}`}
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
            <Box style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                padding:'1rem',
            }}>
                <Typography
                    variant="body1"
                    style={{
                        color: "#fff"
                    }}
                >
                    {data.curso.progresso}%
                </Typography>
                <ProgressBar
             percent={data.curso.progresso}
             color={'#1a90ff'}
             style={{
               width: '100%',
             }}
          />
                
            </Box>
            
            <Divider style={{background:"#fff"}} />
            <Box style={{}}>
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
                    <Box style={{flexGrow: 1}} />
                    <ListItem
                        disableGutters
                    >
                        <Box style={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItens:'center',
                            padding:'1rem 0'
                        }}>
                        <Button 
                            component={Link} 
                            variant="contained"
                            to={`/aluno/app/curso/${data.curso.slug}/avaliacao`}
                            style={{
                                
                                justifyContent: 'flex-start',
                                letterSpacing: 0,
                                textTransform: 'none',
                                backgroundColor:'#506198',
                                color: '#fff',
                                fontSize:"1.2rem"
                                
                            }}>
                            Avalie o curso
                        </Button>
                        </Box>
                    </ListItem>
                </List>
            </Box>
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
                        width: 310,
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
                        width: 310,
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
