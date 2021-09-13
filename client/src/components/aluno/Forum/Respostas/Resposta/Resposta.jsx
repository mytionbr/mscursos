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
        <Box style={{ flexGrow: 1 }} />
        <Box className={classes.detailsContainer}>
          <Typography variant="body1">
            {moment().startOf(date).fromNow()}
          </Typography>
          <Box className={classes.user}>
            <Avatar className={classes.avatarIcon}>{user.nome[0]}</Avatar>
            <Typography variant="body2">{user.nome}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  const Corpo = ({ conteudo, date, user }) => {
    return (
      <Box className={classes.corpo}>
        <Box className={classes.content}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(conteudo),
            }}
          />
        </Box>
        <Informations date={date} user={user} />
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
