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
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
function CursoStatistics({
  aulasTotal,
  duracao,
  alunosTotal,
  atualizado,
  avaliacao,
  progresso,
  loading,
}) {
  const classes = useStyles();
  const Statistic = ({ icon, title, data }) => {
    return (
      <Grid alignItems="center" justifyContent="center" container>
        <Grid item className={classes.icon}>
          {icon}
        </Grid>
        <Grid direction="column">
          <Typography variant="h6" align="right" className={classes.text}>
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
      {loading ? (
        <Skeleton variant="rect" width={"10rem"} height={40} />
      ) : (
        <Statistic icon={<ClassIcon />} title={"Aulas"} data={aulasTotal} />
      )}
      {loading ? (
        <Skeleton variant="rect" width={"10rem"} height={40} />
      ) : (
        <Statistic
          icon={<TimelapseIcon />}
          title={"Duração"}
          data={`${Number(duracao).toFixed(0)} minutos`}
        />
      )}
      {loading ? (
        <Skeleton variant="rect" width={"10rem"} height={40} />
      ) : (
        <Statistic icon={<PeopleIcon />} title={"alunos"} data={alunosTotal} />
      )}
      {loading ? (
        <Skeleton variant="rect" width={"10rem"} height={40} />
      ) : (
        <Statistic
          icon={<EventIcon />}
          title={"Atualizado em"}
          data={moment(atualizado).format("L")}
        />
      )}
      {loading ? (
        <Skeleton variant="rect" width={"10rem"} height={40} />
      ) : (
        <Statistic
          icon={<ThumbUpAltIcon />}
          title={"Avaliação"}
          data={
            <Rating
              className={classes.rating}
              name="read-only"
              value={Number(avaliacao).toFixed(2)}
              readOnly
            />
          }
        />
      )}
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
