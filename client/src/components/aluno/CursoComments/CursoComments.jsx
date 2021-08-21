import { Box, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AlunosComments from './AlunosComments/AlunosComments'
import CommentsRating from './CommentsRating/CommentsRating'

function CursoComments({cursoId}) {
    
    const [curso, setCurso] = useState({
        avaliacao_media: 4,
        avaliacao_total: 200,
        stars:{
            star5:{
                star:5,
                percent: 80
            },
            star4:{
                star:4,
                percent: 15
            },
            star3:{
                star:3,
                percent: 5
            },
            star2:{
                star:2,
                percent: 3 
            },
            star1:{
                star:1,
                percent: 2
            },
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
            padding: '2rem 0',
          }}
        >
            <Grid container direction='column' justifyContent="space-between" alignItems='flex-start'>
                <Typography variant="h5" gutterBottom>
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
            </Grid>          
        </Box>
    )
}

export default CursoComments
