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
          <Typography variant="subtitle1">{Number(percent).toFixed(0)}%</Typography>
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
        <Rating name="read-only" style={{fontSize: '1.7rem'}} precision={0.1}  value={ratingAverage} readOnly />
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
          starValue={5}
          percent={ratingStars["5"] ? ratingStars["5"] : 0}
        />
        <RatingByStar
          starValue={4}
          percent={ratingStars["4"] ? ratingStars["4"] : 0}
        />
        <RatingByStar
          starValue={3}
          percent={ratingStars["3"] ? ratingStars["3"] : 0}
        />
        <RatingByStar
          starValue={2}
          percent={ratingStars["2"] ? ratingStars["2"] : 0}
        />
        <RatingByStar
          starValue={1}
          percent={ratingStars["1"] ? ratingStars["1"] : 0}
        />
      </Grid>
    </Grid>
    </Box>
  );
}

export default CommentsRating;
