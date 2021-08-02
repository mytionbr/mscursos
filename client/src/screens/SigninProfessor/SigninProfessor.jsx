import React, { useEffect, useState } from "react";
import {
  Container
} from "@material-ui/core";
import useStyles from "./styles";
import Signin from "../../components/Signin/Signin";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/professorActions";
import LoadingBox from "../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../components/core/MessageBox/MessageBox";

function SigninProfessor() {
  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const professorSignin = useSelector((state) => state.professorSignin)
  const { professorInfo, loading, error } = professorSignin

  const dispatch = useDispatch()

  const handleSubmit = (e) =>{
      e.preventDefault()
      dispatch(signin(email,password))
  }

  useEffect(() => {
    if(professorInfo){
      alert('Seja bem vindo')
    }
  }, [professorInfo])

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      {loading && <LoadingBox />}
      {error && <MessageBox type="error">{error}</MessageBox>}
      <Signin setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
    </Container>
  );
}

export default SigninProfessor;
