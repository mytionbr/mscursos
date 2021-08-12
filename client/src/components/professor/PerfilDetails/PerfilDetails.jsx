import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CartHeader,
  TextField,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import MessageBox from "../../core/MessageBox/MessageBox";
import LoadingBox from "../../core/LoadingBox/LoadingBox";
import { detailsProfessor, updateProfessorProfile } from "../../../actions/professorActions";
import { PROFESSOR_UPDATE_PROFILE_RESET } from "../../../constants/professorConstantes";
function PerfilDetails(props) {
  const dispatch = useDispatch();
  const professorDetails = useSelector((state) => state.professorDetails);
  const {
    loading: loadingProfile,
    error: errorProfile,
    professor,
  } = professorDetails;

  const professorUpdate = useSelector((state) => state.professorUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = professorUpdate;

  useEffect(() => {
    if (!professor) {
      dispatch({ type: PROFESSOR_UPDATE_PROFILE_RESET });
      dispatch(detailsProfessor());
    } else {
      setNome(professor.nome);
      setEmail(professor.email);
      setDataNascimento(professor.dataNascimento);
      setSenha(professor.senha);
    }
  }, [dispatch, professor]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");

  const handleChangeNome = (event) => {
    const { value } = event.target;
    setNome(value);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleChangeDataNascimento = (event) => {
    const { value } = event.target;
    setDataNascimento(value);
  };

  const handleChangeSenha = (event) => {
    const { value } = event.target;
    setSenha(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateProfessorProfile({
        professorId: professor.professor_id,
        nome,
        email,
        senha,
        dataNascimento,
      })
    );
  };

  return (
    <>
      {loadingProfile ? (
        <LoadingBox />
      ) : errorProfile ? (
        <MessageBox type="error">{errorProfile}</MessageBox>
      ) : (
        <form
          onSubmit={handleSubmit}
          autoComplete={false}
          noValidate
          {...props}
        >
          <Card>
            <CartHeader
              subheader="As informações podem ser modificadas"
              title="Perfil"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Escreva o seu nome"
                    label="Nome"
                    name="nome"
                    onChange={handleChangeNome}
                    required
                    value={nome}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Escreva o seu email"
                    label="Email"
                    name="email"
                    onChange={handleChangeEmail}
                    required
                    type="email"
                    value={email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="date"
                    label="Data de nascimento"
                    type="date"
                    value={dataNascimento}
                    onChange={handleChangeDataNascimento}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Sua senha"
                    label="Senha"
                    name="senha"
                    onChange={handleChangeSenha}
                    required
                    type="password"
                    value={senha}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button color="secondary" variant="contained">
                Save details
              </Button>
            </Box>
            {
                loadingUpdate ? (
                    <LoadingBox />
                ) : errorUpdate ? (
                    <MessageBox type="error">
                        {errorUpdate}
                    </MessageBox>
                ) : successUpdate && (
                    <MessageBox type="success">
                        Perfil atualizado com sucesso!
                    </MessageBox>
                )
            }
          </Card>
        </form>
      )}
    </>
  );
}

export default PerfilDetails;
