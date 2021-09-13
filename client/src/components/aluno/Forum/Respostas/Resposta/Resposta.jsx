import { Avatar, Box, Button, Card, Chip, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPosts, informationsPost, listResponse, markResponseAsSolution } from "../../../../../actions/postActions";
import { POST_SOLUTION_RESET } from "../../../../../constants/postConstantes";
import LoadingBox from "../../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../../core/MessageBox/MessageBox";
import useStyles from "./styles";
function Resposta({resposta,refToResponse}) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const postInformations = useSelector((state) => state.postInformations);
  const { data: dataPost } = postInformations;

  const postMarkSolution = useSelector((state) => state.postMarkSolution);
  const { loading: loadingSolution,error:errorSolution,data: dataSolution } = postMarkSolution;

  const alunoSignin = useSelector((state)=> state.alunoSignin)
  const {alunoInfo} = alunoSignin

  const [solucao, setSolucao] = useState(false)
  const [markSolution, setMarkSolution] = useState(false)
  
  const ref = useRef(null)

  useEffect(()=>{
    if(resposta && resposta.solucao){
      setSolucao(true)
    }else {
      setSolucao(false)
    }
    if(dataPost && !dataPost.post.solucionado && Number(alunoInfo.aluno_id) === Number(dataPost.post.aluno.aluno_id)){
      setMarkSolution(true)
    }else {
      setMarkSolution(false)
    }
  },[alunoInfo, dataPost, resposta])

  useEffect(()=>{
    if(dataSolution){
      dispatch({type:POST_SOLUTION_RESET})
      dispatch(listResponse(dataPost.post.post_id))
      dispatch(informationsPost(dataPost.post.post_id))
    }
  },[dataPost, dataSolution, dispatch])

  
  const handleMarkSolution = ()=>{
    dispatch(markResponseAsSolution({
      resposta_id: resposta.resposta_id,
      post_id: dataPost.post.post_id,
      aluno_id: dataPost.post.aluno_id
    }))
  }

  const Informations = ({ date, user }) => {
    return (
      <Box className={classes.informations}>
        <Box className={classes.user}>
            <Avatar className={classes.avatarIcon}>{user.nome[0].toUpperCase()}</Avatar>
            <Typography variant="body1">{user.nome}</Typography>
        </Box>
          {
            solucao && (
              <Chip label={'SOLUÇÃO'} className={classes.solutionChip} />
            ) 
          }
          {
            markSolution && (
              <Button
                onClick={handleMarkSolution}
                color="secondary"
                variant="contained"
              >
                MARCAR COMO SOLUÇÃO
              </Button>
            )
          }
          {
            loadingSolution ?(
              <LoadingBox />
            ):  errorSolution && (
              <MessageBox type="error">
                {errorSolution}
              </MessageBox>
            )
          }
        <Box style={{flexGrow: 1}} />
        <Typography variant="body1">
            {moment(date).startOf().fromNow()}
        </Typography>
      </Box>
    );
  };

  const Corpo = ({ conteudo, date, user }) => {
    return (
      <Box className={classes.corpo}>
        <Informations date={date} user={user} />
        <Box className={classes.content}>
          <Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(conteudo),
            }}
          />
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Card className={classes.rootContainer} ref={resposta && resposta.solucao ? refToResponse : ref}>
      <Corpo
        conteudo={resposta.conteudo}
        date={resposta.data_atualizacao}
        user={resposta.usuario}
      />
    </Card>
  );
}

export default Resposta;
