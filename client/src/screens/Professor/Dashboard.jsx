import React from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import TotalCursos from '../../components/professor/dashboard/TotalCursos/TotalCursos'
import TotalAlunos from '../../components/professor/dashboard/TotalAlunos/TotalAlunos'
import TotalAulas from '../../components/professor/dashboard/TotalAulas/TotalAulas'
import ActionCardResource from '../../components/ActionCardResource/ActionCardResource'

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
                            lg={4}
                            sm={6}
                            xl={4}
                            xs={12}
                        >
                            <TotalCursos />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xl={4}
                            xs={12}
                        >
                            <TotalAlunos />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TotalAulas />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <ActionCardResource 
                                resource={{
                                    name: 'Novo Curso',
                                    description: 'Crie um novo curso'
                                }} 
                            />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                              <ActionCardResource 
                                resource={{
                                    name: 'Nova Aula',
                                    description: 'Crie um nova aula'
                                }} 
                            />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                              <ActionCardResource 
                                resource={{
                                    name: 'Nova nota',
                                    description: 'Avalie seus alunos'
                                }} 
                            />
                        </Grid>

                    </Grid>
              </Container>
          </Box> 
        </>
    )
}

export default Dashboard
