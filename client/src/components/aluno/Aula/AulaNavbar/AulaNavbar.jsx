import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { findAulasInfo, finishAula, informationsAula } from "../../../../actions/aulaActions";
import { AULA_FINISH_RESET } from "../../../../constants/aulaConstantes";
function AulaNavbar({ onMobileNavOpen, ...rest }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const aulaInfomations = useSelector((state) => state.aulaInfomations);
  const { loading, error, data: aula } = aulaInfomations;

  const aulaFinish = useSelector((state) => state.aulaFinish);
  const {
    loading: loadingFinish,
    error: errorFinish,
    data: dataFinish,
  } = aulaFinish;

  const handleFinishAula = () => {
    dispatch(finishAula(aula))
  };


  return (
    <AppBar  elevation={0} {...rest} position="static">
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        {loading ? (
          <>
            <Box mx={1}>
              <Skeleton variant="rect" width={"10rem"} height={20} />
            </Box>
            <Box mx={1}>
              <Skeleton variant="rect" width={"5rem"} height={20} />
            </Box>
          </>
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : aula ? (
          <Box className={classes.infoContainer}>
            <Typography variant="h4" className={classes.title}>{aula.nome}</Typography>
            <Box style={{ flexGrow: 1 }} />
            {loadingFinish ? (
              <LoadingBox />
            ) : errorFinish ? (
              <MessageBox type="error">{errorFinish}</MessageBox>
            ) : dataFinish || aula.visualizacao_id ? (
              <Button
                variant="contained"
                color="secondary"
                disabled
                style={{
                    backgroundColor: "#35ca42",
                    color:"#fff"
                }}
              >
                Aula concluída
              </Button>
            ) : (
                <Button
                variant="contained"
                onClick={handleFinishAula}
                color="secondary"
              >
                Finalizar aula
              </Button>
            )}
          </Box>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AulaNavbar;
