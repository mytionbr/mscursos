import { Box, Card, Typography } from '@material-ui/core'
import moment from 'moment';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../../core/LoadingBox/LoadingBox';
import MessageBox from '../../../core/MessageBox/MessageBox';
import useStyles from './styles'
function AssinaturaCard() {
    const classes = useStyles();
  
    const alunoInformations = useSelector((state) => state.alunoInformations);
    const { data: dataInfo , loading: loadingInfo, error: errorInfo } = alunoInformations;

    const AssinaturaName = ({name})=>{
        return (
            <Box className={classes.name}>
                <Typography variant='h4' align="center">
                    PLANO {name.toUpperCase()}
                </Typography>
            </Box>
        )
    }

    const AssinaturaInfo =({startDate,price,status})=>{
        return (
            <Box className={classes.info}>
                <Box className={classes.row}>
                    <Typography variant="h6">
                        Inicio
                    </Typography>
                    <Typography variant="body1">
                        {moment(startDate).format('L')}
                    </Typography>
                </Box>
                <Box className={classes.row}>
                    <Typography variant="h6">
                        Preço
                    </Typography>
                    <Typography variant="body1">
                        R$ {price}
                    </Typography>
                </Box>
                <Box className={classes.row}>
                    <Typography variant="h6">
                        Status
                    </Typography>
                    <Typography variant="body1">
                        {
                            status ?(
                                <span className={classes.paid}>Pago</span>
                            ) : (
                                <span className={classes.pending}>Pendente</span>
                            )
                        }

                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <>
        {
            loadingInfo ? (
                <LoadingBox />
            ) : errorInfo ? (
                <MessageBox type="error">
                    {errorInfo}
                </MessageBox>
            ) : (
                <Card>
                   <AssinaturaName name={dataInfo.assinatura.plano_nome} />
                   <AssinaturaInfo 
                    startDate={dataInfo.assinatura.data_inicio}
                    price={dataInfo.assinatura.preco} 
                    status={dataInfo.assinatura.status}/>
                </Card>
            )
        }
        </>
    )
}

export default AssinaturaCard
