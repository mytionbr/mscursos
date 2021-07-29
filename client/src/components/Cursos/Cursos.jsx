import React, {useState} from 'react'
import Curso from './Curso/Curso'
import useStyles from './styles'
import Pagination from '@material-ui/lab/Pagination';
function Cursos({cursos}) {
    const [state, setState] = useState(cursos)
    const classes = useStyles()

    return (
        <>
        <div className={classes.row}> 
            {state.map((curso)=>
                    <Curso curso={curso} />
            )}    
        </div>
        <div className={classes.row}>
            <Pagination className={classes.pagination} count={10} color="secondary" />       
        </div>
        </>
    )
}

export default Cursos
