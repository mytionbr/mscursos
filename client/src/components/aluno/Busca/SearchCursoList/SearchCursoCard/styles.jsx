import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    rootContainer:{
        padding: '1rem',
        display: 'flex',
        alignItems: 'center'
    },
    avatarContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar:{
        padding: '1rem',
        backgroundColor: theme.palette.secondary.main,
        "& > *":{
            fontSize:'1rem',
            color: '#fff'
        }
    },
    detailsContainer:{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        "& > *":{
            margin: '0.1rem 0'
        }
    }
}));
