import { Container, Grid } from "@material-ui/core"
import Cursos from "../components/Cursos/Cursos"
import FilterForm from "../components/FilterForm/FilterForm"

const Home = () => {
    return (
        <div>
            <Container>
                <h1>Conheça os nossos cursos</h1>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}> 
                        <Cursos />
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