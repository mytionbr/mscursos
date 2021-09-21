import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@material-ui/core";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";

import useStyles from "./styles";
import { ReactComponent as Illustration } from "../../../assets/undraw_book.svg";
import Signin from "../../../components/Signin/Signin";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../actions/alunoActions";

function SigninAluno(props) {
  const classes = useStyles();

  const redirect = "/aluno/app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alunoSignin = useSelector((state) => state.alunoSignin);
  const { alunoInfo, loading, error } = alunoSignin;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (alunoInfo) {
      props.history.push(redirect);
    }
  }, [alunoInfo, props.history]);

  return (
    <Container>
      <Box
        style={{
          minHeight: "100%",
          padding: "2rem 0",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          
        >
          <Grid item xs={12} md={4} className={classes.signinContainer}>
          <Box style={{ maxWidth: '23rem'}}>
            {loading && <LoadingBox />}
            {error && <MessageBox type="error">{error}</MessageBox>}
            <Signin
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <div className={classes.presentationContainer}>
              <Typography variant="h4" align="center">
                Estude na hora e no lugar que quiser
              </Typography>
              <Illustration className={classes.illustration} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SigninAluno;
