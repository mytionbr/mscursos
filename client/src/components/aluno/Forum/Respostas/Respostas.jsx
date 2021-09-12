import React from "react";
import Resposta from "./Resposta/Resposta";
function Respostas({ respostas }) {
  return (
      <>
        {
            respostas.map(resposta =>(
               <Resposta resposta={resposta}/>
            ))
        }
      </>
    
  );
}

export default Respostas;
