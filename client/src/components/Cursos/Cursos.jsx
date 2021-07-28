import React, {useState} from 'react'
import Curso from './Curso/Curso'
import useStyles from './styles'
import Pagination from '@material-ui/lab/Pagination';
function Cursos() {
    const [state, setState] = useState([{},{},{},{},{},{},{},{},])
    const classes = useStyles()

    return (
        <div className={classes.row}> 
            {state.map((item,index )=>
                    <Curso />
            )}    

            <Pagination className={classes.pagination} count={10} color="secondary" />       
        </div>
    )
}

export default Cursos
