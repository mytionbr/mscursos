import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import useStyles from "./styles";
import Signin from "../../../components/Signin/Signin";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../actions/professorActions";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import { Helmet } from "react-helmet";
function SigninProfessor(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const professorSignin = useSelector((state) => state.professorSignin);
  const { professorInfo, loading, error } = professorSignin;

  const dispatch = useDispatch();

  const redirect = "/professor/app";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (professorInfo) {
      props.history.push(redirect);
    }
  }, [professorInfo, props.history, redirect]);

  return (
    <>
      <Helmet>
        <title> Login | mscursos </title>
      </Helmet>

      <Container className={classes.container} component="main">
        {loading && <LoadingBox />}
        {error && <MessageBox type="error">{error}</MessageBox>}
        <Signin
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
}

export default SigninProfessor;
