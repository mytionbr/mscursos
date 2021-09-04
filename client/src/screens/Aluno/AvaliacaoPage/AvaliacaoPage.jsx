import { Box, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import Rating from "@material-ui/lab/Rating";

function AvaliacaoPage(props) {
  const dispatch = useDispatch();

  const aulaInfoList = useSelector((state) => state.aulaInfoList);
  const { data: dataInfo } = aulaInfoList;

  const avaliacaoDetails = useSelector((state) => state.avaliacaoDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    data: dataDetails,
  } = avaliacaoDetails;

  const avaliacaoSave = useSelector((state) => state.avaliacaoDetails);
  const {
    loading: loadingSave,
    error: errorSave,
    data: dataSave,
  } = avaliacaoDetails;

  const [valor, setValor] = useState(0);
  const [comentario, setComentario] = useState("");

  const handleSubmit = () => {
    dispatch(
      saveAvaliacao({
        curso_id: dataInfo.curso.curso_id,
        valor: valor,
        comentario: comentario,
      })
    );
  };

  useEffect(() => {
    if (dataInfo) {
      dispatch(detailsAvaliacao(dataInfo.curso.curso_id));
    }
    if (dataDetails) {
      setValor(dataDetails.valor);
      setComentario(dataDetails.comentario);
    }
  }, [dataDetails, dataInfo, dispatch]);

  return (
    <>
      {loadingDetails || loadingSave ? (
        <LoadingBox />
      ) : errorDetails ? (
        <MessageBox type="error">{errorDetails}</MessageBox>
      ) : errorSave ? (
        <MessageBox type="error">{errorSave}</MessageBox>
      ) : (
        <Box
          style={{ minWidth: "100%", minHeigth: "100%", padding: "1rem 2rem" }}
        >
          <Container>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Avaliação</Typography>
              <Rating
                name="simple-controlled"
                value={valor}
                onChange={(event, newValue) => {
                  setValor(newValue);
                }}
              />
            </Box>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              value={comentario}
              onChange={(event, newValue) => {
                setComentario(newValue);
              }}
              variant="outlined"
            />
          </Container>
        </Box>
      )}
    </>
  );
}

export default AvaliacaoPage;
