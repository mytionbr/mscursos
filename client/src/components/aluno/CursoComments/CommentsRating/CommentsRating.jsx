import {  Grid, Typography } from "@material-ui/core";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

function CommentsRating({ ratingAverage, totalRating, ratingStars }) {
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
      backgroundColor: '#363738',
    },
  }))(LinearProgress);

  const RatingByStar = ({starValue, percent})=>{
    return (
      <Grid item justifyContent='space-evenly' alignItems='center'>
        <BorderLinearProgress   
             thickness={4}
             variant="determinate"
             size={100}
             value={percent}
             style={{
                height: 10,
                borderRadius: 5}} />
        <Rating name="read-only" value={starValue} readOnly /> 
        <Typography variant='subtitle2'>
          {percent}%
        </Typography>
      </Grid>
    )
  }

 
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid
        xs={3}
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          {ratingAverage}
        </Typography>
        <Rating name="read-only" value={ratingAverage} readOnly />
        <Typography variant="subtitle2" gutterBottom>
          {totalRating} Avaliações
        </Typography>
      </Grid>
      <Grid
        xs={9}
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
      </Grid>
      <RatingByStar starValue={ratingStars['5'].star} percent={ratingStars['5'].percent}   />
      <RatingByStar starValue={ratingStars['4'].star} percent={ratingStars['4'].percent}   />
      <RatingByStar starValue={ratingStars['3'].star} percent={ratingStars['3'].percent}   />
      <RatingByStar starValue={ratingStars['2'].star} percent={ratingStars['2'].percent}   />
      <RatingByStar starValue={ratingStars['1'].star} percent={ratingStars['1'].percent}   />
    </Grid>
  );
}

export default CommentsRating;
