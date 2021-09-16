import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    rootContainer:{
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    avatarContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '1rem'
    },
    avatar:{
        width: '3rem',
        height: '3rem',
        backgroundColor: theme.palette.secondary.main,
        "& > *":{
            fontSize:'2rem',
            color: '#fff'
        }
    },
    detailsContainer:{
        display: 'flex',
        flexDirection:'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        "& > *":{
            margin: '0.1rem 0'
        }
    }
}));
