import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

function PlanCard({ icon, title, price, advantages, action, ...rest }) {
  const classes = useStyles();
  return (
    <Card className={classes.card} {...rest}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <div className={classes.headerIcon}>{icon}</div>
          <Typography variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.headerPrice} variant="h5" component="h2">
            {price}
          </Typography>
        </div>
        <ul className={classes.listAdvantages}>
          {advantages.map((advantage) => (
            <li className={classes.advantage}>
              <span className={classes.advantageIcon}>
                {advantage.itHas ? (
                  <DoneIcon className={classes.hasIcon} />
                ) : (
                  <ClearIcon className={classes.notHasIcon}  />
                )}
              </span>
              <p className={classes.advantageDescription}>
                {advantage.description}
              </p>
            </li>
          ))}
        </ul>
        <Button
          className={classes.buttonEnroll}
          variant="contained"
          color="primary"
          onClick={action}
        >
          Matricule-se
        </Button>
      </CardContent>
     
    </Card>
  );
}

export default PlanCard;
