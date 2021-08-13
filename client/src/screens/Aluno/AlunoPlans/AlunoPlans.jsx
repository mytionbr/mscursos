import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import PlanCard from '../../../components/PlanCard/PlanCard'
import useStyles from './styles'
import {data} from './data'

function AlunoPlans() {
    const classes = useStyles()
    
    const plans = data

    return (
        <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "2rem 0",
        }}
      >
        <Container>
             <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
                <Grid item spacing={3} style={{ padding: "2rem 0", textAlign:'center', width:'100%' }}>
                    <Typography variant="h4">
                        Adquira o conhecimento necessário para avançar em sua carreira
                    </Typography>
                    <Typography variant="h6">
                        Comece a estudar agora
                    </Typography>
                </Grid>
                <Container className={classes.plansContainer}>
                    {plans.map(plain => (
                        <PlanCard 
                            icon={plain.icon}
                            title={plain.title}
                            price={plain.price}
                            advantages={plain.advantages} 
                            action={plain.action}/>
                    ))
                    }
                </Container>
             </Grid>
        </Container>
        </Box>
    )
}

export default AlunoPlans
