import React from 'react'
import { Box, Container, Grid } from '@material-ui/core'

function Dashboard() {
    return (
        <>
          <Box sx={{
              backgroundColor:'background.default',
              minHeight: '100%',
              py: 3 
          }}>
              <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            
                        </Grid>


                    </Grid>
              </Container>
          </Box> 
        </>
    )
}

export default Dashboard
