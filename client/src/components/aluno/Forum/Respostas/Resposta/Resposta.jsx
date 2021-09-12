import { Avatar, Box, Card, IconButton, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import moment from "moment";
import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import useStyles from "./styles";
function Resposta({resposta}) {
  const classes = useStyles();

  const handlePositiveFeedback = () => {
    alert("Positivo");
  };

  const handleNegativeFeedback = () => {
    alert("Positivo");
  };

  const InsideColumn = ({ feedback }) => {
    return (
      <Box className={classes.insideColumn}>
        <IconButton
          className={classes.feedback}
          onClick={handlePositiveFeedback}
        >
          <ArrowDropUpIcon />
        </IconButton>
        <Typography variant="h6">{feedback}</Typography>
        <IconButton
          className={classes.feedback}
          onClick={handleNegativeFeedback}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </Box>
    );
  };

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
      <InsideColumn feedback={resposta.feedback} />
      <Corpo
        conteudo={resposta.conteudo}
        date={resposta.date}
        user={resposta.user}
      />
    </Card>
  );
}

export default Resposta;
