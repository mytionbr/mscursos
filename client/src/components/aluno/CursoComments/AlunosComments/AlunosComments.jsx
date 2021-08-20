import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
function AlunosComments({ comments }) {
  moment.locale("pt-br");

  const CommentInfo = ({ alunoNome, date }) => {
    return (
      <Grid container xs={2}>
        <Grid item xs={4}>
          <Avatar>{alunoNome[0]}</Avatar>
        </Grid>
        <Grid item direction="column" justifyContent="space-between" xs={8}>
          <Typography variant="body2">
            Há {moment().startOf(date).fromNow()}
          </Typography>
          <Typography variant="body1">{alunoNome}</Typography>
        </Grid>
      </Grid>
    );
  };

  const CommentContent = ({ rating, comment }) => {
    return (
      <Grid
        item
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Rating name="read-only" value={rating} readOnly />
        <Typography variant="body1">{comment}</Typography>
      </Grid>
    );
  };

  return (
    <Grid>
        {
            comments.map((comment) => (
                <Grid container spacing={2}>
                  <CommentInfo alunoNome={comment.aluno_nome} date={comment.data_criacao} />
                  <CommentContent rating={comment.avaliacao} comment={comment.conteudo} />
                </Grid>
              ))
        }
    </Grid>  
    )
}

export default AlunosComments;
