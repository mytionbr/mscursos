import { Box, Container, Grid } from '@material-ui/core'
import React from 'react'
import Helmet from 'react-helmet'

function Dashboard() {
    return (
        <>
            <Helmet>
                <title> Dashboard | mscursos </title>
            </Helmet>
            <DashboardNavbar/>
            <Box
        style={{
          minHeight: "100%",
          padding: '3rem 0',
        }}
      >
           <Container>
                <Grid container spacing={3}>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                        <CursoPrimary />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12} spacing={1} direction="column" justifyContent="flex-start" alignItems="center">
                        <ListCursoSecondary />
                    </Grid>
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                        <ListCursosDashboard />
                    </Grid>
                </Grid>
           </Container>
      </Box>

        </>
    )
}

export default Dashboard
