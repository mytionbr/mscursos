import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

function CommentsRating({ ratingAverage, totalRating, ratingStars }) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: "1rem",
      borderRadius: "0.5rem",
      flexGrow: 1,
    },
    colorPrimary: {
      backgroundColor: "#bbbcbd",
    },
    bar: {
      borderRadius: "0.5rem",
      backgroundColor: "#757b81",
    },
  }))(LinearProgress);

  const RatingByStar = ({ starValue, percent }) => {
    console.log(percent)
    return (
      <Grid
        container
        alignItems="center"
        style={{
          display: "flex",
        }}
        spacing={1}
      >
        <Grid item xs={9}>
          <BorderLinearProgress
            thickness={4}
            variant="determinate"
            size={100}
            value={percent}
          />
        </Grid>
        <Grid item xs={2}>
          <Rating name="read-only" value={starValue} readOnly />
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">{percent}%</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
        style={{
            minWidth: "100%",
            padding: '1rem 0',
          }}
        >
    <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
      <Grid
        xs={3}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" style={{fontWeight: '700'}}>
          {ratingAverage}
        </Typography>
        <Rating name="read-only" style={{fontSize: '1.7rem'}} value={ratingAverage} readOnly />
        <Typography variant="subtitle1" gutterBottom>
          {totalRating} Avaliações
        </Typography>
      </Grid>
      <Grid
        xs={9}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <RatingByStar
          starValue={ratingStars["star5"].star}
          percent={ratingStars["star5"].percent}
        />
        <RatingByStar
          starValue={ratingStars["star4"].star}
          percent={ratingStars["star4"].percent}
        />
        <RatingByStar
          starValue={ratingStars["star3"].star}
          percent={ratingStars["star3"].percent}
        />
        <RatingByStar
          starValue={ratingStars["star2"].star}
          percent={ratingStars["star2"].percent}
        />
        <RatingByStar
          starValue={ratingStars["star1"].star}
          percent={ratingStars["star1"].percent}
        />
      </Grid>
    </Grid>
    </Box>
  );
}

export default CommentsRating;
