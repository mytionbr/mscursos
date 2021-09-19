import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AlunosComments from "./AlunosComments/AlunosComments";
import CommentsRating from "./CommentsRating/CommentsRating";

function CursoComments({ avaliacoes, stars, curso }) {
  return (
    <Box
      style={{
        minWidth: "100%",
        padding: "2rem 0",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography variant="h5" gutterBottom>
          Feedback dos alunos
        </Typography>
        <CommentsRating
          ratingAverage={Number(curso.avaliacao_media).toFixed(1)}
          totalRating={curso.avaliacao_total}
          ratingStars={stars}
        />
        <AlunosComments comments={avaliacoes} />
      </Grid>
    </Box>
  );
}

export default CursoComments;
