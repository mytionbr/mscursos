import { Avatar, Box, Chip, Grid, Link, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment'
function PostCard({title,totalResponses,isAnswered,tags,dateUpdate, postId, user, date}) {
    const classes = useStyles()

    const Title = ({title, href})=>{
        return (
            <Link className={classes.title} to={href}>
                <Typography variant="h5">
                    {title}
                </Typography>
            </Link>
        )
    }


    const AsnweredIcon = ({isAnswered})=>{
        return (
            <Avatar className={ isAnswered ? classes.answered : classes.notAsnwered}>
                <CheckIcon className={classes.icon} />
            </Avatar>
        )
    }

    const Tags = ({tags})=>{
        return (
            <Box className={classes.tagsContainer}>  
               {
                    tags.map(tag=>(
                        <Chip label={tag.nome} />
                    ))
                }
            </Box>
            
        )
    }
    
    const TotalResponses = ({total})=>{
        return (
            <Box className={classes.responsesContainer}>
                <Typography variant='h4' style={{fontWeight: '700', color: '#9c9999'}} >
                    {total}
                </Typography>
                <Typography variant='h6' >
                    respostas
                </Typography>
            </Box>
        )
    }

    const Description = ({title,tags})=>{
        return (
            <Grid Container className={classes.descriptionContainer}>
                <Title title={title} href={`/aluno/app/forum/post/${postId}`}/>
                <Tags tags={tags}  />
            </Grid>
        )
    }

    const Informations = ({user,dateUpdate})=>{
        return (
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Avatar className={classes.avatarUser}>
                        {user.nome[0]}
                    </Avatar>
                </Grid>
                <Grid item direction='column'>
                   <Typography variant='h5'>
                        {user.nome}
                   </Typography>
                   <Typography variant='h5'>
                      atualizado em  {moment().startOf(dateUpdate).fromNow()}
                   </Typography>
                </Grid>
            </Grid>
        )
    }
    
    return (
        <Grid container>
            <Grid item>
                <AsnweredIcon isAnswered={isAnswered} />
            </Grid>
            <Grid item>
                <Description title={title} tags={tags} />
            </Grid>
            <Box style={{flexGrow: 1}} />
            <Grid item>
                <TotalResponses total={totalResponses} />
            </Grid>
            <Grid item>
                <Informations user={user} dateUpdate={date}/>
            </Grid>
        </Grid>
    )
}

export default PostCard
