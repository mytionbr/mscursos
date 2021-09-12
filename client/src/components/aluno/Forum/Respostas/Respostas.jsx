import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Resposta from "./Resposta/Resposta";
function Respostas() {
  
  const dispatch = useDispatch();
  const postInfomations = useSelector((state) => state.postInfomations);
  const { loading, error, data } = postInfomations;
  
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
