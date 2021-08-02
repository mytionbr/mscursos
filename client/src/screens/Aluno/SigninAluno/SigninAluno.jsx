import React, { useEffect, useState } from 'react'
import {Container, Grid, Typography } from '@material-ui/core'
import LoadingBox from '../../../components/core/LoadingBox/LoadingBox'
import MessageBox from '../../../components/core/MessageBox/MessageBox'

import useStyles from './styles'
import {ReactComponent as Illustration} from '../../../assets/undraw_book.svg';
import Signin from '../../../components/Signin/Signin';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../../actions/alunoActions';

function SigninAluno(props) {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alunoSignin = useSelector((state) => state.alunoSignin)
    const { alunoInfo, loading, error } = alunoSignin

    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if(alunoInfo) {
            alert('Seja bem vindo')
        }
    }, [alunoInfo])

    return (
        <Container>
            <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
                <Grid item xs={2} sm={4}>
                    {loading && <LoadingBox />}
                    {error && <MessageBox type="error">{error}</MessageBox>}
                    <Signin setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
                </Grid>
                <Grid item xs={8} sm={8}>
                   <div className={classes.presentationContainer}> 
                        <Typography  className={classes.presentation} variant="h4">
                            Estude na hora e no lugar que quiser
                        </Typography>
                        <Illustration className={classes.illustration}/>
                   </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SigninAluno
