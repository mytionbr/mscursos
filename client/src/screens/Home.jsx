import { Container } from "@material-ui/core"
import Cursos from "../components/Cursos/Cursos"

const Home = () => {
    return (
        <div>
            <Container>
                <h1>Conheça os nossos cursos</h1>
                <Cursos />
            </Container>
        </div>
    )
}

export default Home