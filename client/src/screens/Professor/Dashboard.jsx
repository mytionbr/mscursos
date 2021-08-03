import React from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import TotalCursos from '../../components/professor/dashboard/TotalCursos/TotalCursos'
import TotalAlunos from '../../components/professor/dashboard/TotalAlunos/TotalAlunos'
import TotalAulas from '../../components/professor/dashboard/TotalAulas/TotalAulas'
import ActionCardResource from '../../components/ActionCardResource/ActionCardResource'
import TotalAssignment from '../../components/professor/dashboard/TotalAssignment/TotalAssignment'
import { blue, green, red } from '@material-ui/core/colors'
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ClassIcon from '@material-ui/icons/Class';

function Dashboard() {
    
    

    const items = {
        alunos: {
            title: 'Meus Alunos',
            count: 12,
            loading: '',
            color: green[600],
            icon: <PeopleOutlineIcon />
        },
        cursos: {
            title: 'Meus Cursos',
            count: 12,
            loading: '',
            color: blue[600],
            icon: <CollectionsBookmarkIcon />
        },
        aulas: {
            title: 'Minhas Aulas',
            count: 12,
            loading: '',
            color: red[600],
            icon: <ClassIcon />
        }

    }
    
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
                            <TotalAssignment
                                loading={items.cursos.loading} 
                                title={items.cursos.title} 
                                count={items.cursos.count}
                                color={items.cursos.color}
                                icon={items.cursos.icon}
                            />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xl={4}
                            xs={12}
                        >
                            <TotalAssignment
                                loading={items.alunos.loading} 
                                title={items.alunos.title} 
                                count={items.alunos.count}
                                color={items.alunos.color}
                                icon={items.alunos.icon}
                            />
                        </Grid>

                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xl={3}
                            xs={12}
                        >   
                             <TotalAssignment
                                loading={items.alunos.loading} 
                                title={items.alunos.title} 
                                count={items.alunos.count}
                                color={items.alunos.color}
                                icon={items.alunos.icon}
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
                                    description: 'Prepare uma nova aula'
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
