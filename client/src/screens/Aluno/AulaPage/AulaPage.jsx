import { Box, Container } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAulasInfo, informationsAula } from '../../../actions/aulaActions';
import LoadingBox from '../../../components/core/LoadingBox/LoadingBox';
import MessageBox from '../../../components/core/MessageBox/MessageBox';

function AulaPage(props) {
    const aulaId = props.match.params.aulaId
    const cursoSlug = props.match.params.cursoSlug;


    const dispatch = useDispatch()
    const aulaInfomations = useSelector((state) => state.aulaInfomations);
    const { loading, error, data:aula } = aulaInfomations;

    useEffect(() => {
        dispatch(findAulasInfo(cursoSlug));
    }, [dispatch, cursoSlug]);


    useEffect(() => {
        if(aulaId){
            dispatch(informationsAula(aulaId));
        }
      }, [aulaId, dispatch]);

    return (
        <div>
            {
                loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox type="error">
                        {error}
                    </MessageBox>
                ) : (
                    <Box style={{minWidth: '100%', minHeigth: '100%', color: '#fff'}}>
                        <Container>
                            {aula ? (
                                aula.conteudo
                            ) : (
                                ''
                            )}
                        </Container>
                    </Box>
                )
            }
        </div>
    )
}

export default AulaPage
