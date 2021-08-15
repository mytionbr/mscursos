import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  TextField,
  Box,
  Button,
} from "@material-ui/core";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import { register } from "../../../../actions/alunoActions";

function FormInfoMatricula({ handleNext }) {
  const dispatch = useDispatch();
  const alunoRegister = useSelector((state) => state.alunoRegister);
  const { alunoInfo, loading, error } = alunoRegister;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

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
  const handleChangeConfirmSenha = (event) => {
    const { value } = event.target;
    setConfirmSenha(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (senha !== confirmSenha) {
      alert("As senhas não correspondem");
    } else {
      dispatch(
        register(
          nome,
          email,
          dataNascimento,
          senha,
          cpf,
          telefone,
        )
      );
    }
  };

  useEffect(() => {
    if (alunoInfo) {
      handleNext();
      alert('boa')
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            subheader="Cadastre as suas informações"
            title="Cadastro"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="nome"
                  helperText={"Insira o seu nome completo"}
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
                  helperText={"Insira o seu endereço de E-mail"}
                  onChange={handleChangeEmail}
                  required
                  type="email"
                  value={email}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid  item md={6} xs={12}>
                <TextField
                  id="date"
                  label="Data de nascimento"
                  type="date"
                  helperText={"Insira a data do seu Nascimento"}
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
                  helperText="Insira o seu CPF"
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
                  helperText="Insira o seu número de telefone"
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
                  helperText="Insira a sua Senha"
                  label="Senha"
                  name="cpf"
                  onChange={handleChangeSenha}
                  type="password"
                  value={senha}
                  required
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Digite a senha novamente"
                  label="Confirme Senha"
                  name="confirmSenha"
                  onChange={handleChangeConfirmSenha}
                  type="password"
                  value={confirmSenha}
                  required
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
            </Grid>
            {loading && <LoadingBox />}
            {error && <MessageBox type={"error"}>{error}</MessageBox>}
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
              Próximo
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
}

export default FormInfoMatricula;
