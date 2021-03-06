import { Card, CardContent, CardHeader, Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyle from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { formatMonetaryValue } from "../../../../utils/formatMonetaryValue";

const PaymentInfo = ({ data }) => {
  const classes = useStyle();

  return (
    <Card className={classes.card}>  
      <CardHeader className={classes.header} 
        title={'Informações sobre a compra'}
      />
        <Divider />
    <CardContent className={classes.content}>
      <div className={classes.plan}>
        <Typography variant="h4" gutterBottom>
          Plano {data.title}
        </Typography>
      </div>
      <div className={classes.price}>
        <Typography variant="h5" gutterBottom>
          {formatMonetaryValue(data.price)}
        </Typography>
      </div>
      <ul className={classes.listAdvantages}>
        {data.advantages.map((advantage) => (
          <li className={classes.advantage}>
            <span className={classes.advantageIcon}>
              {advantage.itHas ? (
                <DoneIcon className={[classes.hasIcon,classes.icon]} />
              ) : (
                <ClearIcon className={[classes.notHasIcon,classes.icon]} />
              )}
            </span>
            <p className={classes.advantageDescription}>
              {advantage.description}
            </p>
          </li>
        ))}
      </ul>
      </CardContent>
    </Card>
  );
};

export default PaymentInfo;
