import {
  Avatar,
  Card,
  CardContent,
  Fade,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";

function CursoCard(props) {
  const { name, percent, icon, action, size } = props;

  const handleSize = (size)=>{
    switch(size){
      case 'primary':
        return {name: 'h4', avatar:{height: '6.5rem', width: '6.5rem', svg: '3rem'}}
      case 'secondary':
        return {name: 'h5',avatar:{height: '6rem', width: '6rem', svg: '3rem'}}
        case 'tertiary':
          return {name: 'h6',avatar:{height: '5rem', width: '5rem', svg: '1rem'}}
      default:
        return {name: 'h4', avatar:{height: '6rem', width: '6rem', svg: '3rem'}}
    }
  }

  const cardSize = handleSize(size)
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
    <Fade appear={true} in={true} timeout={700}>
    <Card className={classes.card} onClick={action} {...props}>
      <CardContent>
        <Grid container className={classes.gridContainer}>
          <Grid item className={classes.gridHeader} xs={4}>
            <Avatar 
              className={classes.avatar}
              style={{
                height: cardSize.avatar.height,
                width: cardSize.avatar.width,
                "& > svg ": {
                  fontSize: cardSize.avatar.svg,
                },
              }}>{icon}</Avatar>
          </Grid>
        
        <Grid item xs={8} className={classes.gridPercent}>
        <Typography align={'right'}  gutterBottom variant={cardSize.name}>
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
    </Fade>
  );
}

export default CursoCard;
