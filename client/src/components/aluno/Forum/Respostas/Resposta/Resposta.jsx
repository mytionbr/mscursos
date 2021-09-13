import { Avatar, Box, Card, IconButton, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import moment from "moment";
import React from "react";
import useStyles from "./styles";
function Resposta({resposta}) {
  const classes = useStyles();

  const Informations = ({ date, user }) => {
    return (
      <Box className={classes.informations}>
        <Box className={classes.user}>
            <Avatar className={classes.avatarIcon}>{user.nome[0].toUpperCase()}</Avatar>
            <Typography variant="body1">{user.nome}</Typography>
          </Box>
        <Box style={{flexGrow: 1}} />
        <Typography variant="body1">
            {moment(date).startOf().fromNow()}
        </Typography>
      </Box>
    );
  };

  const Corpo = ({ conteudo, date, user }) => {
    return (
      <Box className={classes.corpo}>
        <Informations date={date} user={user} />
        <Box className={classes.content}>
          <Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(conteudo),
            }}
          />
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Card className={classes.rootContainer}>
      <Corpo
        conteudo={resposta.conteudo}
        date={resposta.data_atualizacao}
        user={resposta.usuario}
      />
    </Card>
  );
}

export default Resposta;
