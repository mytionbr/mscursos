import { Box,  Card, CardActions, CardContent, CardMedia, Grow, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { getIconByCategoria } from "../../../utils/getIconByCategoria";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
function Curso({curso,localization}) {
  const classes = useStyles();
  
  const Picture = () => {
    let Icon = getIconByCategoria(curso.categoria_id)

    return (
     <Box>
         <Link className={classes.picture} to={`${localization}/curso/${curso.slug}`}>
            <Icon className={classes.pictureItem} />
         </Link>
      </Box>
    );
  };

  return (
    <Grow in={true}  style={{ transformOrigin: '0 0 0' }}
                    {...({ timeout: 1000 })}> 
      <Card className={classes.card}>
        <CardMedia title={"Programação Linear"} children={<Picture />} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {curso.nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {curso.descricao.slice(0,150) + '...'}
          </Typography>
        </CardContent>
        <CardActions  className={classes.actions}>
            <Link className={classes.link} to={`${localization}/curso/${curso.slug}`}>
              Saiba mais <ArrowForwardIcon/>
            </Link>
          </CardActions>
      </Card>
      </Grow>  
  );
}

export default Curso;
