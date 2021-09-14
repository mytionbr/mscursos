import { Card, Container } from '@material-ui/core'
import React from 'react'
import Statistic from './Statistic/Statistic';
import useStyles from './styles'
import SchoolIcon from '@material-ui/icons/School';
import ForumIcon from '@material-ui/icons/Forum';
import { useSelector } from 'react-redux';
function PerfilStatistics() {
    const classes = useStyles()
    const alunoDetails = useSelector((state) => state.alunoDetails);
    const { data } = alunoDetails;

    return (
        <Container className={classes.rootContainer}>
            <Card className={classes.card}>
                <Statistic 
                    icon={<SchoolIcon />} 
                    info={data.aluno.total_cursos} 
                    description={'Cursos concluídos'} />
                <Statistic 
                    icon={<ForumIcon />} 
                    info={data.aluno.total_posts} 
                    description={'Posts no fórum'} />
            </Card>
        </Container>
    )
}

export default PerfilStatistics
