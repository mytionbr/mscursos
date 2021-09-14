import { Avatar, Container, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
function PerfilHeader() {
    const classes = useStyles()
    
    const dispatch = useDispatch()
    const alunoInfomations = useSelector((state) => state.alunoInfomations);
    const { loading, error, data } = alunoInfomations;
    
    return (
        <Container className={classes.rootContainer}>
            <Avatar className={classes.avatar}>
                {data.user.nome[0].toUpperCase()}
            </Avatar>
            <Typography variant="H4">
                {data.user.nome[0].toUpperCase()}
            </Typography>
        </Container>
    )
}

export default PerfilHeader
