import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'

function Signin({setEmail, setPassword, handleSubmit}) {
    const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Login</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
      <Box className={classes.inputs}>
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
          type="email"
          onChange={(e)=> setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Senha"
          name="password"
          type="password"
          autoComplete="password"
          color={"secondary"}
          onChange={(e)=> setPassword(e.target.value)}
        />
        </Box>
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
