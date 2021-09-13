import React from "react";
import { useSelector } from "react-redux";
import Resposta from "./Resposta/Resposta";
function Respostas() {
  
  const postListResponse = useSelector((state) => state.postListResponse);
  const {
    data,
  } = postListResponse;
  
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
