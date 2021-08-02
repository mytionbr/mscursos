import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import {Code, DeveloperMode, FilterBAndW,PieChart,Translate,AllInclusive} from "@material-ui/icons/";
import { Link } from "react-router-dom";

function Curso({curso}) {
  const classes = useStyles();

  const Picture = () => {
    let Icon

    switch (curso.categoria_id) {
      case 1:
          Icon = (props) => <Code {...props}/>
        break;
      case 2:
          Icon = (props) => <DeveloperMode  {...props}/>
        break;
      case 3:
          Icon = (props) => <FilterBAndW  {...props}/>
        break;
      case 4:
          Icon = (props) => <PieChart  {...props}/>
        break;
      case 5:
          Icon = (props) => <Translate  {...props}/>
        break;
      case 6:
          Icon = (props) => <AllInclusive  {...props}/>
        break;
      default:
          Icon = (props) => <Code {...props}/>
        break;
    }
    console.log(Icon)
    return (
     <Box>
         <Link className={classes.picture} to="/">
            <Icon className={classes.pictureItem} />
         </Link>
      </Box>
    );
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia title={"Programação Linear"} children={<Picture />} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {curso.nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {curso.descricao}
          </Typography>
          <CardActions  >
            <Button size="small" color="secondary" >
              Saiba mais
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default Curso;
