export const alunoResponseSuccess = (res,aluno) => {
    aluno._id = undefined
    aluno.senha = undefined 
    aluno.cpf = undefined
    aluno.telefone = undefined
    aluno.data_nascimento = undefined
    aluno.data_criacao = undefined
    aluno.data_update = undefined
   
    res.status(200).json(aluno)
}



