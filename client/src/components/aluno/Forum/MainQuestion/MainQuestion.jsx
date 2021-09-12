import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Link,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import moment from "moment";
import CheckIcon from "@material-ui/icons/Check";
import DOMPurify from 'dompurify';

function MainQuestion({title, dataCriacao, tags, conteudo,respostas, solucionado, respostaId }) {
  const classes = useStyles();

  const Tags = ({ tags }) => {
    return (
      <Box className={classes.tagsContainer}>
        {tags.map((tag) => (
          <Chip label={tag.nome} />
        ))}
      </Box>
    );
  };

  const User = ({aluno})=>{
    return (
      <Box className={classes.userContainer}>
          <Avatar className={classes.avatarIcon}>
             {aluno.nome[0]}
          </Avatar>
          por {aluno.nome}
      </Box>
    )
  }

  const Title = ({ title, dataCriacao, tags, aluno }) => {
    return () => {
      <Box className={classes.titleContainer}>
        <Box className={classes.title}>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="body2">
          <span className={classes.emphasis}>Perguntado</span>
          {moment().startOf(dataCriacao).fromNow()}
        </Typography>
        <Tags tags={tags} />
        <User aluno={aluno}  />
        <Divider />
      </Box>;
    };
  };

  const InsideColumn = ({ solucionado, respostaId, respostas }) => {
    return (
      <Box className={classes.sideColumn}>
        {solucionado && (
          <Box>
            <Avatar className={classes.avatarIcon}>
              <CheckIcon className={classes.icon} />
            </Avatar>
            <Link className={classes.linkResposta} to={`#${respostaId}`}>Ver resposta</Link>
          </Box>
        )}
        <Typography variant="h6" className={classes.respostas}>
          {respostas}
        </Typography>
        <Typography variant="body1">respostas</Typography>
      </Box>
    );
  };

  const Conteudo = ({conteudo}) => {
    return (
      <Box className={classes.conteudo}>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(conteudo),
          }}
        />
      </Box>
    );
  };

  const Corpo = ({ respostas, solucionado, respostaId, conteudo }) => {
    return (
      <Box className={classes.corpoContainer}>
        <InsideColumn
          respostas={respostas}
          solucionado={solucionado}
          respostaId={respostaId}
        />
        <Conteudo conteudo={conteudo} />
      </Box>
    );
  };

  return (
    <Card>
      <Box className={classes.rootContainer}>
        <Title title={title}  dataCriacao={dataCriacao} tags={tags} />
        <Corpo respostas={respostas} solucionado={solucionado} respostaId={respostaId} conteudo={conteudo} />
      </Box>
    </Card>
  );
}

export default MainQuestion;
