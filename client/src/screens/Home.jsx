import { Container, Grid } from "@material-ui/core"
import Cursos from "../components/Cursos/Cursos"
import FilterForm from "../components/FilterForm/FilterForm"
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import { filterCursos, listCursos } from "../actions/cursoActions"
import LoadingBox from '../components/core/LoadingBox/LoadingBox'
import MessageBox from '../components/core/MessageBox/MessageBox'

const Home = () => {
    const dispatch = useDispatch()
    const cursoFilter = useSelector((state) => state.cursoFilter)
    const { loading, error, cursos } = cursoFilter
    
    useEffect(()=>{
        dispatch(filterCursos({
            nome: '',
            categorias: []
        }))
    },[dispatch])

    return (
        <div>
            <Container >
                <h1>Conheça os nossos cursos</h1>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        {loading ? (
                            <LoadingBox />
                        ): error ? (
                            <MessageBox type="error">{error.message}</MessageBox>
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