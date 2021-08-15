import { Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyle from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

const PaymentInfo = ({ data }) => {
  const classes = useStyle();

  return (
    <Paper className={classes.card}>
      <div className={classes.header}>
        <Typography variant="subtitle1" gutterBottom>
          Informações sobre a compra
        </Typography>
      </div>
      <Divider />
      <Divider />
      <div className={classes.plan}>
        <Typography variant="h4" gutterBottom>
          Plano {data.title}
        </Typography>
      </div>
      <div className={classes.price}>
        <Typography variant="h5" gutterBottom>
          {data.price}
        </Typography>
      </div>
      <ul className={classes.listAdvantages}>
        {data.advantages.map((advantage) => (
          <li className={classes.advantage}>
            <span className={classes.advantageIcon}>
              {advantage.itHas ? (
                <DoneIcon className={classes.hasIcon} />
              ) : (
                <ClearIcon className={classes.notHasIcon} />
              )}
            </span>
            <p className={classes.advantageDescription}>
              {advantage.description}
            </p>
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default PaymentInfo;
