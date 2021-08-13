import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import MessageBox from "../../core/MessageBox/MessageBox";
import LoadingBox from "../../core/LoadingBox/LoadingBox";
import { detailsProfessor, updateProfessorProfile } from "../../../actions/professorActions";
import { PROFESSOR_UPDATE_PROFILE_RESET } from "../../../constants/professorConstantes";
import moment from 'moment';
import SuccessAlert from "../../SuccessAlert/AlertSuccess";
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
      setDataNascimento(DateParse(professor.data_nascimento));
      setSenha(professor.senha);
    }
  }, [dispatch, professor]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
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
        professor_id: professor.professor_id,
        nome,
        email,
        senha,
        dataNascimento,
      })
    );
  };

  const DateParse = (date)=>{
    let dateString = String(date)
    let parts = dateString.split('-')
    parts.forEach(i=>{
      if(Number(i) < 10){
        i = '0' + i
      }
    })
   
    return moment(new Date(...parts)).format("YYYY-MM-DD")
  }

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
            <CardHeader
              subheader="As informações podem ser modificadas"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="nome"
                    onChange={handleChangeNome}
                    required
                    value={nome}
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChangeEmail}
                    required
                    type="email"
                    value={email}
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="date"
                    label="Data de nascimento"
                    type="date"
                    value={dataNascimento}
                    fullWidth
                    onChange={handleChangeDataNascimento}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    color="secondary"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="* Caso não queira substituir a sua senha atual, não preencha esse campo"
                    label="Senha"
                    name="senha"
                    onChange={handleChangeSenha}
                    type="password"
                    value={senha}
                    variant="outlined"
                    color="secondary"
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
              <Button type="submit" color="secondary" variant="contained">
                Salvar
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
                  <SuccessAlert message='Perfil atualizado com sucesso!' />
                )
            }
          </Card>
        </form>
      )}
    </>
  );
}

export default PerfilDetails;
