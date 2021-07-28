import { Container, Grid } from "@material-ui/core"
import Cursos from "../components/Cursos/Cursos"
import FilterForm from "../components/FilterForm/FilterForm"
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import { listCursos } from "../actions/cursoActions"

const Home = () => {
    const dispatch = useDispatch()
    const cursoList = useSelector((state) => state.cursoList)
    const { loading, error, cursos } = cursoList
    
    console.log(loading, error, cursos )

    useEffect(()=>{
        dispatch(listCursos())
    },[dispatch])

    return (
        <div>
            <Container>
                <h1>Conheça os nossos cursos</h1>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        {loading ? (
                            'Carregando...'
                        ) : error ? (
                            {error}
                        ) : (
                            <Cursos cursos={cursos} />
                        )}
                        
                    </Grid>
                    <Grid item xs={12} sm={4}> 
                        <FilterForm />
                    </Grid>
                </Grid>
               
            </Container>
        </div>
    )
}

export default Home