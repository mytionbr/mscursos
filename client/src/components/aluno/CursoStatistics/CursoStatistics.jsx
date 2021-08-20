import { Box, Typography } from "@material-ui/core";
import React from "react";
import useStyles from './styles'
import ClassIcon from '@material-ui/icons/Class';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
function CursoStatistics({
  aulas,
  duracao,
  alunos,
  atualizado,
  avaliacao,
  progresso,
}) {
    const classes = useStyles()
  return( 
  <Box className={classes.container}>
      <Typography variant="h5" gutterBottom>
        <ClassIcon /> {aulas.length} aulas 
      </Typography>
      <Typography variant="h5" gutterBottom>
        <TimelapseIcon /> {duracao} duracao 
      </Typography>
      <Typography variant="h5" gutterBottom>
        <PeopleIcon /> {alunos} alunos 
      </Typography>
      <Typography variant="h5" gutterBottom>
        <EventIcon /> atualizado em {atualizado} 
      </Typography>
      <Typography variant="h5" gutterBottom>
        <EventIcon /> avaliação {avaliacao} 
      </Typography>
      {
          progresso && (
            <Typography variant="h5" gutterBottom>
            <SlowMotionVideoIcon />  {progresso}% 
          </Typography>
          )
      }
    
  </Box>
  )

}

export default CursoStatistics;
