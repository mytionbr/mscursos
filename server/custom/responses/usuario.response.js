
export const usuarioResponseSuccess = (res,usuario) => {
    
    usuario._id = undefined
    usuario.senha = undefined    
      
    res.status(200).json(usuario)
}



