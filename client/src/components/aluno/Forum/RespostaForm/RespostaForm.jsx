import { Box, Button, Card, FormHelperText, InputLabel, Typography } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listResponse, saveResposta } from "../../../../actions/postActions";
import { POST_SAVE_RESPONSE_RESET } from "../../../../constants/postConstantes";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import useStyles from './styles'
function RespostaForm() {
  const classes = useStyles()
  const [resposta, setResposta] = useState("");
  const dispatch = useDispatch();
  
  const postSaveResponse = useSelector((state) => state.postSaveResponse);
  const { loading, error, data } = postSaveResponse;

  const postInformations = useSelector((state) => state.postInformations);
  const {
    data: dataPost,
  } = postInformations;

  useEffect(()=>{
    if(data && dataPost ){
        dispatch({type: POST_SAVE_RESPONSE_RESET})
        dispatch(listResponse(dataPost.post.post_id));
        setResposta('')
    }
  },[data, dataPost, dispatch])

  const handleRespostaSubmit = (event) => {
    event.preventDefault();

    if(!resposta){
        alert('O campo de resposta está vazio')
    } else {
        dispatch(saveResposta(resposta, dataPost.post.post_id))
    }
  };

  return (
    <Box>
        <Typography variant="h6" gutterBottom>Sua Resposta</Typography>
    
    <Card>
      <form className={classes.boxContainer} onSubmit={handleRespostaSubmit}>
        <Box>
          <MDEditor value={resposta} onChange={setResposta} />
        </Box>
        <Button
            type="submit"
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            Enviar
          </Button>
      </form>
      {
          loading ? (
              <LoadingBox />
          ) : error && (
              <MessageBox type="error">
                  {error}
              </MessageBox>
          ) 
      }
    </Card>
    </Box>
  );
}

export default RespostaForm;
