import React, {useState} from 'react'
import Curso from './Curso/Curso'
import useStyles from './styles'
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch } from 'react-redux';
import { findCursos } from '../../actions/cursoActions';
import MessageBox from '../core/MessageBox/MessageBox';
function Cursos({data}) {

    const [state, setState] = useState(data.cursos)
    const classes = useStyles()
    console.log(state)
    const dispatch = useDispatch()

    const handlePagination = (event,value) => {
        dispatch(findCursos({
            nome: data.params.nome || '',
            categorias: data.params.categoria || [],
            pagination: value
        }))
    }

    return (
        <>
        <div className={classes.row}> 
            {
                state.length > 0 
                ? (
                    state.map((curso)=>
                        <Curso curso={curso} />
                )   
                ) :
                (
                    <MessageBox type="info">Nenhum curso encontrado</MessageBox>
                )
            }
           
        </div>
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
