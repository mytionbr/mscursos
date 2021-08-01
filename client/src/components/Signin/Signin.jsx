import {
  Avatar,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'

function Signin() {
    const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Login</Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          color={"secondary"}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="senha"
          label="Senha"
          name="senha"
          autoComplete="senha"
          color={"secondary"}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Entrar
        </Button>
      </form>
    </Paper>
  );
}

export default Signin;
