import React, {useState} from 'react'
import Curso from './Curso/Curso'
import useStyles from './styles'

function Cursos() {
    const [state, setState] = useState([{},{},{},{}])
    const classes = useStyles()



    console.log(state)
    return (
        <div className={classes.row}> 
            {state.map((item,index )=>
                    <Curso />
            )}           
        </div>
    )
}

export default Cursos
