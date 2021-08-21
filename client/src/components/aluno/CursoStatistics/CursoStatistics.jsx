import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import ClassIcon from "@material-ui/icons/Class";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Rating from "@material-ui/lab/Rating";
function CursoStatistics({
  aulas,
  duracao,
  alunos,
  atualizado,
  avaliacao,
  progresso,
}) {
  const classes = useStyles();
  const Statistic = ({ icon, title, data }) => {
    return (
      <Grid alignItems="center" justifyContent="center" container>
        <Grid item className={classes.icon}>
          {icon}
        </Grid>
        <Grid direction="column">
          <Typography variant="h6"  align="right" className={classes.text}>
            {title}
          </Typography>
          <Typography variant="h6" align="right" className={classes.text}>
            {data}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box className={classes.container}>
      <Statistic 
        icon={<ClassIcon />} 
        title={"Aulas"} 
        data={aulas.length} />
      <Statistic
        icon={<TimelapseIcon />}
        title={"Duração"}
        data={`${duracao} horas`}
      />
      <Statistic 
        icon={<PeopleIcon />} 
        title={"alunos"} 
        data={alunos} />
      <Statistic
        icon={<EventIcon />}
        title={"Atualizado em"}
        data={atualizado}
      />
      <Statistic
        icon={<ThumbUpAltIcon />}
        title={"Avaliação"}
        data={
        <Rating className={classes.rating} name="read-only" value={progresso} readOnly /> 
      }
      />
      {progresso && (
        <Statistic
          icon={<SlowMotionVideoIcon />}
          title={"Progresso"}
          data={`${progresso}%`}
        />
      )}
    </Box>
  );
}

export default CursoStatistics;
