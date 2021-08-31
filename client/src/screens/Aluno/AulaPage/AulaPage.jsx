import { Box, Container, Typography } from '@material-ui/core';
import DOMPurify from 'dompurify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAulasInfo, informationsAula } from '../../../actions/aulaActions';
import LoadingBox from '../../../components/core/LoadingBox/LoadingBox';
import MessageBox from '../../../components/core/MessageBox/MessageBox';

function AulaPage(props) {
    const aulaId = props.match.params.aulaId
    
    const dispatch = useDispatch()
    const aulaInfomations = useSelector((state) => state.aulaInfomations);
    const { loading, error, data:aula } = aulaInfomations;
    console.log( loading, error, aula )
    
    useEffect(() => {
        console.log()
        if(aulaId){
            dispatch(informationsAula(aulaId));
        }
       
      }, [aulaId, dispatch]);
    
    return (
        <>
            {
                loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox type="error">
                        {error}
                    </MessageBox>
                ) : (
                    <Box style={{minWidth: '100%', minHeigth: '100%',padding:"1rem"}}>
                        <Container>
                            {aula ? (
                        <Typography>
                            <div
                                dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(aula.conteudo),
                                }}/> 
                        </Typography>
                            ) : (
                                <Typography variant="h3">
                                    Bem vindo ao curso
                                </Typography>
                            )}
                        </Container>
                    </Box>
                )
            }
        </>
    )
}

export default AulaPage
