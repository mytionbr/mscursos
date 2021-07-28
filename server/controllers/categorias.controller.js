import pool from '../database/pool.js'

export const list = async (req,res) =>{
    try{
        const { rows } = await pool.query(
            'SELECT * from categoria')
        
        const categorias = rows

        res.status(200).json(categorias)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}