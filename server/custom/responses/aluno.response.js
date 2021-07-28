import dataFormat from "../../utils/dataFormat.js"

export const alunoResponseSuccess = (res,aluno) => {
    
        aluno.senha = undefined
        aluno.data_nascimento = dataFormat(aluno.data_nascimento)    
      
    res.status(200).json(aluno)
}



