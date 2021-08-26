import React, {useState} from 'react'
import Curso from './Curso/Curso'
import useStyles from './styles'
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch } from 'react-redux';
import { findCursos } from '../../actions/cursoActions';
import MessageBox from '../core/MessageBox/MessageBox';
import { Grid } from '@material-ui/core';

function Cursos({data}) {

    const [state, setState] = useState(data.cursos)
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const handlePagination = (event,value) => {
        dispatch(findCursos({
            nome: data.params.nome || '',
            categorias: Array(...data.params.categoria) || [],
            pagination: value
        }))
    }

    return (
        <>
        <Grid container spacing={2}> 
            {
                state.length > 0 
                ? (
                    state.map((curso,index)=>
                    <Grid item >
                        <Curso curso={curso}  />
                    </Grid>
                )   
                ) :
                (
                    <MessageBox type="info">Nenhum curso encontrado</MessageBox>
                )
            }
           
        </Grid>
        <div className={classes.row}>
            <Pagination 
                className={classes.pagination} 
                page={data.page} 
                count={data.totalPages} 
                color="secondary" 
                onChange={handlePagination}/>       
        </div>
        </>
    )
}

export default Cursos
