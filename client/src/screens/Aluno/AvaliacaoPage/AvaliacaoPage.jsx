import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import Rating from "@material-ui/lab/Rating";
import { detailsAvaliacao, saveAvaliacao } from "../../../actions/cursoActions";
import { CURSO_AVALIACAO_DETAILS_RESET, CURSO_AVALIACAO_SAVE_RESET } from "../../../constants/cursoConstants";
import { AULA_INFORMATIONS_RESET } from "../../../constants/aulaConstantes";

function AvaliacaoPage(props) {
  const dispatch = useDispatch();

  const aulaInfoList = useSelector((state) => state.aulaInfoList);
  const { data: dataInfo } = aulaInfoList;

  const avaliacaoDetails = useSelector((state) => state.avaliacaoDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    data: dataDetails,
    empty: dataEmpty
  } = avaliacaoDetails;

  const avaliacaoSave = useSelector((state) => state.avaliacaoSave);
  const {
    loading: loadingSave,
    error: errorSave,
    success: successSave,
  } = avaliacaoSave;

  const [valor, setValor] = useState(0);
  const [comentario, setComentario] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(
      saveAvaliacao({
        curso_id: dataInfo.curso.curso_id,
        valor: valor,
        comentario: comentario,
      })
    );
  };

  useEffect(() => {

    dispatch({type:AULA_INFORMATIONS_RESET})
    
    if (dataInfo && !dataDetails && !dataEmpty && !successSave) {
      dispatch(detailsAvaliacao(dataInfo.curso.curso_id));
    }

    if(dataInfo && dataDetails && dataInfo.curso.curso_id !== dataDetails.curso_id){
      dispatch({type: CURSO_AVALIACAO_DETAILS_RESET})
      dispatch({type: CURSO_AVALIACAO_SAVE_RESET})
    }
 
    if (dataDetails && !loadingSave) {
      setValor(dataDetails.valor);
      setComentario(dataDetails.comentario);
    }
  }, [dataDetails, dataEmpty, dataInfo, successSave, dispatch, loadingSave]);

  return (
    <>
      {loadingDetails  ? (
        <LoadingBox />
      ) : errorDetails ? (
        <MessageBox type="error">{errorDetails}</MessageBox>
      )  : (
        <Box
          style={{ minWidth: "100%", minHeigth: "100%", padding: "1rem 2rem" }}
        >
          <Container>
            <form 
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
            <Box 
              component="fieldset" 
              borderColor="transparent" 
              >
              <Typography variant="h5">Avaliação</Typography>
              <Rating
                name="simple-controlled"
                value={valor}
                onChange={(event, newValue) => {
                  setValor(newValue);
                }}
                style={{
                  fontSize: "2.5rem"
                }}
              />
            </Box>
            <Box 
              component="fieldset" 
              mb={1} 
              borderColor="transparent" 
              >
            <TextField
              id="outlined-multiline-static"
              label="Comentário"
              multiline
              rows={4}
              value={comentario}
              onChange={(event) => {
                setComentario(event.target.value);
              }}
              variant="outlined"
              fullWidth
              color="secondary"
            />
            </Box>
            <Box 
              component="fieldset" 
              mb={1} 
              borderColor="transparent" 
              style={{width:"100%"}}
              >
            <Button type="submit" fullWidth variant="contained" color="secondary">
              Salvar
            </Button>
            </Box>
            </form>
            {
              loadingSave ? (
                <LoadingBox/>
              ) :              
              successSave && (
                <MessageBox type="success">
                  Comentário adicionado
                </MessageBox>
              )
            }
            {
               errorSave && (
                <MessageBox type="error">{errorSave}</MessageBox>
              )
            }
            

          </Container>
        </Box>
      )}
    </>
  );
}

export default AvaliacaoPage;
