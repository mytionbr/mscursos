import { green, grey, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    name:{
        padding: '2rem',
        color: '#fff',
        backgroundColor: theme.palette.secondary.main
    },
    info:{
        display: 'flex',
        flexDirection: 'column'
    },
    row:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        "& > *":{
            margin: '0.1rem'
        },
        padding: '0.5rem'
    },
    paid:{
        color: green[500]
    },
    pending:{
        color: red[500]
    }
}));
