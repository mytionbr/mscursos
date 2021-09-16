import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Fade,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { getIconByCategoria } from "../../../../../utils/getIconByCategoria";
import useStyles from "./styles";
function SearchCursoCard({ name, categoriaId, description, slug }) {
  const classes = useStyles();
  const Icon = getIconByCategoria(categoriaId);
  const history = useHistory();

  const handleClick = () => {
    history.push(`/aluno/app/curso/${slug}`);
  };

  return (
    <Fade appear={true} in={true} timeout={700}>
      <Card
        elevation={6}
        onClick={handleClick}
      >
        <CardActionArea  className={classes.rootContainer}>
          <Box className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>{<Icon />}</Avatar>
          </Box>
          <Box className={classes.detailsContainer}>
            <Typography variant="h5" className={classes.nome}>
              {name}
            </Typography>
            <Typography variant="body1" className={classes.description}>
              {description}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Fade>
  );
}

export default SearchCursoCard;
