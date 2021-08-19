import {
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";

function CursoCard(props) {
  const { name, percent, icon, action } = props;

  const classes = useStyles();
  
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: '1rem',
      borderRadius: '0.5rem',
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: '0.5rem',
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

  return (
    <Card className={classes.card} onClick={action} {...props}>
      <CardContent>
        <Grid container className={classes.gridContainer}>
          <Grid item className={classes.gridHeader} xs={4}>
            <Avatar className={classes.avatar}>{icon}</Avatar>
          </Grid>
        
        <Grid item xs={8} className={classes.gridPercent}>
        <Typography align={'right'}  gutterBottom variant="h4">
              {name}
        </Typography>
          <Typography align={'right'} color="textSecondary" gutterBottom variant="h5">
            {percent}%
          </Typography>
          <BorderLinearProgress
             thickness={4}
             variant="determinate"
             size={100}
             value={percent}
             className={classes.percent}
          />
        </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CursoCard;
