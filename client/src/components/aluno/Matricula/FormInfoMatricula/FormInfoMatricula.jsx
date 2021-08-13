import React, { useState } from "react";
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

function FormInfoMatricula({ handleNext }) {
  
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState(
        moment(new Date()).format("YYYY-MM-DD")
    );
    const [cpf, setCpf] = useState("");
    
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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext()
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader 
            subheader="Cadastre as suas informações"
            title="Cadastro" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="nome"
                  helperText={'Insira o seu nome completo'}
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
                  helperText={'Insira o seu endereço de E-mail'}
                  onChange={handleChangeEmail}
                  required
                  type="email"
                  value={email}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="date"
                  label="Data de nascimento"
                  type="date"
                  helperText={'Insira a data do seu Nascimento'}
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
                  helperText="Insira o seu CPF"
                  label="Cpf"
                  name="cpf"
                  onChange={handleChangeCpf}
                  type="password"
                  value={cpf}
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
                  value={telefone}
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
              Próximo
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
}

export default FormInfoMatricula;
