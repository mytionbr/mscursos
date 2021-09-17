import {
  Avatar,
  Grid,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";
import React from "react";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
import LinkPerfil from "../../LinkPerfil/LinkPerfil";
function AlunosComments({ comments }) {

  const CommentInfo = ({ alunoNome,alunoId, date }) => {
    return (
      <Grid container xs={3}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          xs={3}
        >
          <Avatar>{alunoNome[0].toUpperCase()}</Avatar>
        </Grid>
        <Grid
          xs={9}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography 
            variant="body2"
            style={{
              color: "grey"
            }}>
           {moment(date).startOf().fromNow()}
          </Typography>
          <Typography variant="body1">
            <LinkPerfil alunoId={alunoId}>
              {alunoNome}
            </LinkPerfil>
            </Typography>
        </Grid>
      </Grid>
    );
  };

  const CommentContent = ({ rating, comment }) => {
    return (
      <Grid
      item 
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      xs={9}
      >
        <Rating name="read-only" value={rating} readOnly 
        style={{
          fontSize:'1rem'
        }}/>
        <Typography variant="body1" style={{ wordWrap: 'break-word', marginLeft:'2px' }} >{comment}</Typography>
      </Grid>
    );
  };

  return (
    <Container style={{
      padding: '1rem'
    }}>
      {comments.map((comment) => (
        <Grid container alignItens="center" 
        style={{
          margin:'0.5rem 0',
          borderBottom: '1px solid #afacac',
          padding: '0.5rem'
        }}>
          <CommentInfo
            alunoNome={comment.aluno_nome}
            date={comment.data_criacao}
            alunoId={comment.aluno_id}
          />
          <CommentContent
            rating={comment.valor}
            comment={comment.comentario}
          />
        </Grid>
      ))}
    </Container>
  );
}

export default AlunosComments;
