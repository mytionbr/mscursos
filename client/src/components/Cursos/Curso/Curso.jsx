import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import CodeIcon from "@material-ui/icons/Code";
import { Link } from "react-router-dom";

function Curso() {
  const classes = useStyles();

  const Picture = () => {
    return (
     <Box>
         <Link className={classes.picture} to="/">
            <CodeIcon className={classes.pictureItem} />
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
            Java
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
