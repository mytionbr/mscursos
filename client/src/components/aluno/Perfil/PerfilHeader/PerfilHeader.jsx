import { Avatar, Container, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import useStyles from './styles'
function PerfilHeader() {
    const classes = useStyles()

    const alunoDetails = useSelector((state) => state.alunoDetails);
    const { data } = alunoDetails;
    
    return (
        <Container className={classes.rootContainer}>
            <Avatar className={classes.avatar}>
                <Typography variant="h3">
                {data.aluno.nome[0].toUpperCase()}
            </Typography>
            </Avatar>
            <Typography className={classes.name} align="center" variant="h3">
                {data.aluno.nome}
            </Typography>
        </Container>
    )
}

export default PerfilHeader
