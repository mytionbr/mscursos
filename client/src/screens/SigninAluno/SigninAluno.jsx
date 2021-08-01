import React from 'react'
import {Container, Grid,  SvgIcon,  Typography } from '@material-ui/core'


import useStyles from './styles'
import {ReactComponent as Illustration} from '../../assets/undraw_book.svg';
import Signin from '../../components/Signin/Signin';

function SigninAluno() {
    const classes = useStyles()

    return (
        <Container>
            <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
                <Grid item xs={2} sm={4}>
                    <Signin />
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
