import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAluno } from "../../../../actions/alunoActions";
import { ALUNO_UPDATE_RESET } from "../../../../constants/alunoConstantes";
import { isValidCPF } from "../../../../utils/isValidCPF";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import SuccessAlert from "../../../SuccessAlert/AlertSuccess";
import useStyles from "./styles";
function PerfilUpdateForm() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const alunoInformations = useSelector((state) => state.alunoInformations);
  const { data: dataInfo , loading: loadingInfo, error: errorInfo } = alunoInformations;

  const alunoUpdate = useSelector((state) => state.alunoUpdate);
  const { data: dataUpdate , loading: loadingUpdate, error: errorUpdate } = alunoUpdate;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  
  const [successUpdate, setSuccessUpdate] = useState(false)

  useEffect(()=>{
    if(dataInfo){
        setNome(dataInfo.aluno.nome)
        setCpf(dataInfo.aluno.cpf)
        setDataNascimento(new Date(dataInfo.aluno.data_nascimento).toISOString().substring(0, 10))
        setEmail(dataInfo.aluno.email)
        setTelefone(dataInfo.aluno.telefone)
    }
  },[dataInfo])

  useEffect(()=>{
    if(dataUpdate){
      setSuccessUpdate(true)
    } else {
      setSuccessUpdate(false)
    }
  },[dataUpdate, dispatch])

  const handleChangeNome = (event) => {
    const { value } = event.target;
    setNome(value);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleChangeTelefone = (event) => {
    const { value } = event.target;
    setTelefone(value);
  };

  const handleChangeDataNascimento = (event) => {
    const { value } = event.target;
    setDataNascimento(value);
  };

  const handleChangeCpf = (event) => {
    const { value } = event.target;
    setCpf(value);
  };

  const handleChangeSenha = (event) => {
    const { value } = event.target;
    setSenha(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let cpfFormatado = cpf.replace( /\D/g , "") 
    setCpf(cpfFormatado)

    if(senha.length !== 0 && senha.length < 6){
      alert("A senha deve ter o tamanho mínimo de 6 caracteres");
    } else if(cpf.length < 11){ 
      alert("O CPF deve ter 11 caracteres");
    }else if (!isValidCPF(cpf)){
      alert("CPF invalido");
    }else  {
      dispatch(
        updateAluno({
          nome,
          email,
          data_nascimento:dataNascimento,
          senha,
          cpf,
          telefone,
        })
      );
    }
  };

  
  return (
      <>
        {loadingInfo ? (
           <LoadingBox />
        ) : errorInfo ? (
            <MessageBox type="error">{errorInfo}</MessageBox>
        ) : (
            <form  
                onSubmit={handleSubmit}
                autoComplete={false}
                noValidate>
            <Card className={classes.rootContainer}>
              <CardHeader subheader="As informações podem ser modificadas" />
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
                      required
                      variant="outlined"
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
                      label="Cpf"
                      name="cpf"
                      onChange={handleChangeCpf}
                      type="text"
                      value={cpf}
                      required
                      variant="outlined"
                      color="secondary"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Telefone"
                      name="telefone"
                      onChange={handleChangeTelefone}
                      type="phone"
                      required
                      value={telefone}
                      variant="outlined"
                      color="secondary"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="* Caso não queira substituir a sua senha atual, não preencha esse campo"
                      label="Senha"
                      name="cpf"
                      onChange={handleChangeSenha}
                      type="password"
                      value={senha}
                      variant="outlined"
                      color="secondary"
                    />
                  </Grid>
                </Grid>
                {loadingUpdate && <LoadingBox />}
                {errorUpdate && <MessageBox type={"error"}>{errorUpdate}</MessageBox>}
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
            </Card>
          </form>
        )
        }
        {
          successUpdate && (
            <SuccessAlert message={'Perfil atualizado com sucesso!'} />
          )
        }
      </>
  );
}

export default PerfilUpdateForm;
