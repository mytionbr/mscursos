import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Fade,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { getIconByCategoria } from "../../../../utils/getIconByCategoria";
import { useHistory } from "react-router";
import ProgressBar from "../../../ProgressBar/ProgressBar";

function CursoCard(props) {
  const { name, percent, size, categoriaId, slug } = props;
  const history = useHistory();

  const action = () => {
    history.push(`/aluno/app/curso/${slug}`);
  };

  const handleSize = (size) => {
    switch (size) {
      case "primary":
        return {
          name: "h4",
          avatar: { height: "6.5rem", width: "6.5rem", svg: "3rem" },
        };
      case "secondary":
        return {
          name: "h5",
          avatar: { height: "6rem", width: "6rem", svg: "3rem" },
        };
      case "tertiary":
        return {
          name: "h6",
          avatar: { height: "5rem", width: "5rem", svg: "1rem" },
        };
      default:
        return {
          name: "h4",
          avatar: { height: "6rem", width: "6rem", svg: "3rem" },
        };
    }
  };

  const cardSize = handleSize(size);
  const classes = useStyles();

  const Icon = getIconByCategoria(categoriaId);

  return (
    <Fade appear={true} in={true} timeout={700}>
      <Card className={classes.card} onClick={action} {...props}>
        <CardActionArea>
          <CardContent>
            <Grid container className={classes.gridContainer}>
              <Grid item className={classes.gridHeader} xs={4}>
                <Avatar
                  className={classes.avatar}
                  style={{
                    height: cardSize.avatar.height,
                    width: cardSize.avatar.width,
                    "& > svg ": {
                      fontSize: cardSize.avatar.svg,
                    },
                  }}
                >
                  {<Icon />}
                </Avatar>
              </Grid>

              <Grid item xs={8} className={classes.gridPercent}>
                <Typography
                  align={"right"}
                  gutterBottom
                  variant={cardSize.name}
                >
                  {name}
                </Typography>
                <Typography
                  align={"right"}
                  color="textSecondary"
                  gutterBottom
                  variant="h5"
                >
                  {percent}%
                </Typography>
                <ProgressBar
                  percent={percent}
                  color={"#1a90ff"}
                  className={classes.percent}
                />
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
}

export default CursoCard;
