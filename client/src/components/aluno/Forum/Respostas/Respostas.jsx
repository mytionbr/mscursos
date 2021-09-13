import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Resposta from "./Resposta/Resposta";
function Respostas() {
  
  const dispatch = useDispatch();
  const postInformations = useSelector((state) => state.postInformations);
  const { loading, error, data } = postInformations;
  
  return (
      <>
        {
            data.respostas.map(resposta =>(
               <Resposta resposta={resposta}/>
            ))
        }
      </>
    
  );
}

export default Respostas;
