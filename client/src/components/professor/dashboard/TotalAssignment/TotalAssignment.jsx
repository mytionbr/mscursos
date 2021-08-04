import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
function TotalAssignment(props) {
  const { loading = false, title, count,color,icon } = props;

  return (
    <Card style={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container  spacing={3} style={{ justifyContent: "space-between" }}>
          <Grid item style={{minWidth: '60%'}}>
            {loading ? (
              <Skeleton
                animation="wave"
                style={{ marginBottom: 6, height: '1rem', width: '100%'}}
              />
            ) : (
              <Typography color="textSecondary" gutterBottom variant="h4">
                {title}
              </Typography>
            )}
            {loading ? (
              <Skeleton
                animation="wave"
                style={{ marginBottom: 6, height: '1rem', width: '100%'}}
              />
            ) : (
              <Typography color="textPrimary" variant="h3">
                  {count}
              </Typography>
            )}
          </Grid>

          <Grid item>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={50}
                height={50}
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: color,
                  height: "4rem",
                  width: "4rem",
                }}
              >
               {icon}
              </Avatar>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TotalAssignment;
