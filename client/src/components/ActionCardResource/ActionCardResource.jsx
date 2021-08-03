import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

function ActionCardResource({ resource, ...rest }) {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardActionArea>
        <CardContent>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <Avatar
              style={{
                background: "#fff",
                height: "10rem",
                width: "8rem",
              }}
            >
              <AddIcon
                style={{
                  color: "#757575",
                  height: "100%",
                  width: "100%",
                }}
              />
            </Avatar>
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {resource.name}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {resource.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionCardResource;
