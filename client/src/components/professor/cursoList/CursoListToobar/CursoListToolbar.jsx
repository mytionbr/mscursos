import { Box, Breadcrumbs, Button, Card, Link, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import {Link as LinkRoute} from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function CursoListToolbar(props) {
    const classes = useStyles()
    const history = useHistory()
    return (
        <Box {...props}>
            <Box>
                <Breadcrumbs>
                    <Link color="inherit">
                        <LinkRoute to="/professor/app/dashboard"> 
                            dashboard
                        </LinkRoute>
                    </Link>
                    <Link color="inherit">
                        <LinkRoute to="/professor/app/cursos"> 
                            Cursos
                        </LinkRoute>
                    </Link>
                </Breadcrumbs>
            </Box>
            <Box className={classes.boxContainer}>
                <Box>
                    <Typography variant="h4">
                        Cursos
                    </Typography>
                </Box>

                <Box>
                        <Button 
                            className={classes.buttonAddCurso}  
                            variant="contained"
                            onClick={()=> history.push('/professor/app/cursos/novo')}    
                        >
                            Criar novo Curso
                        </Button>
                        <Button 
                            className={classes.buttonAddCurso}  
                            variant="contained">
                            Filtrar
                        </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CursoListToolbar
