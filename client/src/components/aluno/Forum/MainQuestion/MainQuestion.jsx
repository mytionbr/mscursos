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
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";

function MainQuestion() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const postInformations = useSelector((state) => state.postInformations);
  const { loading, error, data } = postInformations;
  
  
  const getTags = (curso, categoria) => {
    let tags = [];
    if (curso.curso_id) {
      tags.push(curso);
    }
    if (categoria.categoria_id) {
      tags.push(categoria);
    }
    return tags;
  };

  const Tags = ({ tags }) => {
    return (
      <Box className={classes.tagsContainer}>
        {tags.map((tag) => (
          <Chip label={tag.nome} />
        ))}
      </Box>
    );
  };

  const User = ({ aluno }) => {
    return (
      <Box className={classes.userContainer}>
        <Avatar className={classes.avatarUser}>{aluno.nome[0]}</Avatar>
        <Typography variant="body1"> por {aluno.nome}</Typography>
      </Box>
    );
  };

  const Title = ({ title, dataCriacao, tags, aluno }) => {
    return (
      <Box className={classes.titleContainer}>
        <Box className={classes.title}>
          <Typography variant="h4">{title}</Typography>
        </Box>
       
        <Box className={classes.detailsContainer}>
          <Tags tags={tags} />
          <User aluno={aluno} />
          <Box style={{flexGrow: 1}} />
          <Typography variant="body1" className={classes.time}>
          {moment(dataCriacao).startOf().fromNow()}
        </Typography>
        </Box>
      </Box>
    )
  };

  const InsideColumn = ({ solucionado, respostaId, respostas }) => {
    return (
      <Box className={classes.sideColumn}>
        {solucionado && (
          <Box>
            <Avatar className={classes.avatarIcon}>
              <CheckIcon className={classes.icon} />
            </Avatar>
            <Link className={classes.linkResposta} to={`#${respostaId}`}>
              Ver resposta
            </Link>
          </Box>
        )}
        <Typography variant="h5" className={classes.respostas}>
          {respostas}
        </Typography>
        <Typography variant="h6">respostas</Typography>
      </Box>
    );
  };

  const Conteudo = ({ conteudo }) => {
    return (
      <Box className={classes.conteudo}>
        <Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(conteudo),
          }}
        />
        </Typography>
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

  const tags = getTags(
    { curso_id: data.post.curso_id, nome: data.post.curso_nome },
    { categoria_id: data.post.categoria_id, nome: data.post.categoria_nome }
  )

  console.log(tags)

  return (
    <Card>
      <Box className={classes.rootContainer}>
        <Title
          title={data.post.titulo}
          dataCriacao={data.post.data_criacao}
          tags={tags}
          aluno={data.post.aluno}

        />
        <Corpo
          respostas={data.post.total_respostas}
          solucionado={data.post.solucionado}
          respostaId={data.post.resposta_id}
          conteudo={data.post.conteudo}
        />
      </Box>
    </Card>
  );
}

export default MainQuestion;
