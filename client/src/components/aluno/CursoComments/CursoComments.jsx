import { Box, Container, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AlunosComments from './AlunosComments/AlunosComments'
import CommentsRating from './CommentsRating/CommentsRating'

function CursoComments({cursoId}) {
    
    const [curso, setCurso] = useState({
        avaliacao_media: 4,
        avaliacao_total: 200,
        stars:{
            '5':80,
            '4':15,
            '3':5,
            '2':3,
            '1':1
        }

    })
    const [comentarios, setComentarios] = useState([
        {
            aluno_nome: 'lucas',
            date: '2021-01-01',
            avaliacao: 5,
            conteudo: 'Muito bom'
        },
        {
            aluno_nome: 'lucas',
            date: '2021-01-01',
            avaliacao: 5,
            conteudo: 'Muito bom'
        },
        {
            aluno_nome: 'lucas',
            date: '2021-01-01',
            avaliacao: 5,
            conteudo: 'Muito bom'
        },
        {
            aluno_nome: 'lucas',
            date: '2021-01-01',
            avaliacao: 5,
            conteudo: 'Muito bom'
        },
        {
            aluno_nome: 'lucas',
            date: '2021-01-01',
            avaliacao: 5,
            conteudo: 'Muito bom'
        },
        
    ])

    return (
        <Box
        style={{
            minWidth: "100%",
            padding: '2rem',
          }}
        >
            <Container>
                <Typography variant="h4" gutterBottom>
                    Feedback dos alunos
                </Typography>
                <CommentsRating 
                    ratingAverage={curso.avaliacao_media}
                    totalRating={curso.avaliacao_total}
                    ratingStars={curso.stars}
                />
                <AlunosComments
                    comments={comentarios}
                />              
            </Container>
            
        </Box>
    )
}

export default CursoComments
