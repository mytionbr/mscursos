export const professorResponseSuccess = (res,professor) => {
    professor._id = undefined
    professor.senha = undefined 
    professor.data_nascimento = undefined
    professor.descricao = undefined
   
    res.status(200).json(professor)
}



