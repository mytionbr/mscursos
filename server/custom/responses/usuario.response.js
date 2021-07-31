import dataFormat from "../../utils/dataFormat.js"

export const usuarioResponseSuccess = (res,usuario) => {
    
    usuario._id = undefined
    usuario.senha = undefined
    usuario.data_nascimento = dataFormat(usuario.data_nascimento)    
      
    res.status(200).json(usuario)
}



