import React, {useState} from 'react'
import Curso from './Curso/Curso'
import useStyles from './styles'
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch } from 'react-redux';
import { findCursos } from '../../actions/cursoActions';
function Cursos({data}) {

    const [state, setState] = useState(data.cursos)
    const classes = useStyles()

    const dispatch = useDispatch()

    const handlerPagination = (event,value) => {
        dispatch(findCursos({
            nome: data.params.nome || '',
            categorias: data.params.categoria || [],
            pagination: value
        }))
    }

    return (
        <>
        <div className={classes.row}> 
            {state.map((curso)=>
                    <Curso curso={curso} />
            )}    
        </div>
        <div className={classes.row}>
            <Pagination 
                className={classes.pagination} 
                page={data.page} 
                count={data.totalPages} 
                color="secondary" 
                onChange={handlerPagination}/>       
        </div>
        </>
    )
}

export default Cursos
