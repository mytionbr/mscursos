import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { green } from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";
function TotalAssignment(props) {
  const { loading = false, title, count,color,icon } = props;
  
  return (
    <Card style={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: "space-between" }}>
          <Grid item>
            {loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography color="textSecondary" gutterBottom variant="h4">
                {title}
              </Typography>
            )}
            {loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
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
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: {color},
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
