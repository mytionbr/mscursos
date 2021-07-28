import dataFormat from "../utils/dataFormat.js"

export const alunoResponseSuccess = (res,aluno) => {
    aluno.senha = undefined
    aluno.dataNascimento = dataFormat(aluno.data_nascimento)
    aluno.data_nascimento = undefined
    
    res.status(200).json(aluno)
}

