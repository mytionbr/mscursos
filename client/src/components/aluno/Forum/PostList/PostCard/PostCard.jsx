import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import CheckIcon from "@material-ui/icons/Check";
import moment from "moment";
import {Link } from 'react-router-dom'
function PostCard({
  title,
  totalResponses,
  isAnswered,
  tags,
  dateUpdate,
  postId,
  user,
  date,
}) {
  const classes = useStyles();

  const Title = ({ title, href }) => {
    return (
      <Link className={classes.title} to={href}>
        <Typography variant="h6">{title}</Typography>
      </Link>
    );
  };

  const AsnweredIcon = ({ isAnswered }) => {
    const [style, setStyle] = useState({});

    useEffect(() => {
      if (isAnswered) {
        setStyle(classes.answered);
      } else {
        setStyle(classes.notAsnwered);
      }
    }, [isAnswered]);

    return (
      <Avatar className={[style, classes.avatarIcon]}>
        <CheckIcon className={classes.icon} />
      </Avatar>
    );
  };

  const Tags = ({ tags }) => {
    return (
      <Box className={classes.tagsContainer}>
        {tags.map((tag) => (
          <Chip label={tag.nome} />
        ))}
      </Box>
    );
  };

  const TotalResponses = ({ total }) => {
    return (
      <Box className={classes.responsesContainer}>
        <Typography
          variant="h4"
          style={{ fontWeight: "700", color: "#9c9999" }}
        >
          {total}
        </Typography>
        <Typography variant="h6">respostas</Typography>
      </Box>
    );
  };

  const Description = ({ title, tags }) => {
    return (
      <Box className={classes.descriptionContainer}>
        <Title title={title} href={`/aluno/app/forum/post/${postId}`} />
        <Tags tags={tags} />
      </Box>
    );
  };

  const Informations = ({ user, dateUpdate }) => {
    return (
      <Box className={classes.informationsContainer}>
        <Box item>
          <Avatar
            className={[classes.avatarIcon, classes.icon, classes.avatarUser]}
          >
            {user.nome[0].toUpperCase()}
          </Avatar>
        </Box>
        <Box className={classes.userContainer}>
          <Typography variant="h6" className={classes.userName}>
            {user.nome}
          </Typography>
          <Typography variant="body2">
            atualizado em {moment().startOf(dateUpdate).fromNow()}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Card className={classes.card}>
      <Box className={classes.rootContainer}>
        <Box className={classes.presentationContainer}>
          <Box className={classes.iconContainer}>
            <AsnweredIcon isAnswered={isAnswered} />
          </Box>
          <Box>
            <Description title={title} tags={tags} />
          </Box>
        </Box>

        <Box className={classes.detailsContainer}>
          <Box>
            <TotalResponses total={totalResponses} />
          </Box>
          <Box>
            <Informations user={user} dateUpdate={date} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default PostCard;
