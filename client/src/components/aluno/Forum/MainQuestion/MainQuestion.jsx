import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Typography,
  Fade
} from "@material-ui/core";
import React, { useRef } from "react";
import useStyles from "./styles";
import moment from "moment";
import CheckIcon from "@material-ui/icons/Check";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import {Link} from 'react-router-dom'
import LinkPerfil from "../../LinkPerfil/LinkPerfil";
import 'moment/locale/pt-br'
function MainQuestion({refToResponse}) {
  const classes = useStyles();
  moment.locale('pt-br')
  const dispatch = useDispatch();
  const postInformations = useSelector((state) => state.postInformations);
  const {  data } = postInformations;

  const postListResponse = useSelector((state) => state.postListResponse);
  const {
    loading: loadingResponse,
    error: errorResponse,
    data: dataResponse,
  } = postListResponse;

  
  const handleScroll = ()=>{
    refToResponse.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
        <Typography variant="body1"> por <LinkPerfil alunoId={aluno.aluno_id}>{aluno.nome}</LinkPerfil></Typography>
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
          <Box style={{ flexGrow: 1 }} />
          <Typography variant="body1" className={classes.date} >
            {moment(dataCriacao).startOf().fromNow()}
          </Typography>
        </Box>
      </Box>
    );
  };

  const InsideColumn = ({ solucionado }) => {
    return (
      <Box className={classes.sideColumn}>
        {loadingResponse ? (
          <LoadingBox />
        ) : (
          dataResponse && (
            <>
              {solucionado && (
                <Box className={classes.answered}>
                  <Avatar className={classes.avatarIcon}>
                    <CheckIcon className={classes.icon} />
                  </Avatar>
                  <p className={classes.linkResposta} onClick={()=>handleScroll(data.solucao_id)}>
                    Ver resposta
                  </p>
                </Box>
              )}
              <Typography variant="h5" className={classes.respostas}>
                {dataResponse && dataResponse.total_respostas}
              </Typography>
              <Typography variant="h6">respostas</Typography>
            </>
          )
        )}
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

  const Corpo = ({ solucionado, conteudo }) => {
    return (
      <Box className={classes.corpoContainer}>
        <InsideColumn solucionado={solucionado} />
        <Conteudo conteudo={conteudo} />
      </Box>
    );
  };

  const tags = getTags(
    { curso_id: data.post.curso_id, nome: data.post.curso_nome },
    { categoria_id: data.post.categoria_id, nome: data.post.categoria_nome }
  );

  return (
    <Fade appear={true} in={true} timeout={700}>
    <Card>
      <Box className={classes.rootContainer}>
        <Title
          title={data.post.titulo}
          dataCriacao={data.post.data_criacao}
          tags={tags}
          aluno={data.post.aluno}
        />
        <Corpo solucionado={data.post.solucionado} conteudo={data.post.conteudo} />
      </Box>
    </Card>
    </Fade>
  );
}

export default MainQuestion;
