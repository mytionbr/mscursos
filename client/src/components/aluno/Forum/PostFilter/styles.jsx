import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    paper:{
        display: 'flex',
        padding: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    space:{
        "& > *": {
            margin: '0 0.1rem'
        },
    },
    inputRoot:{
        padding: '2px 4px',
        display: 'flex',
        alignItems:'center',
        width: 400
    },
    input:{
        marginLeft: theme.spacing(1),
        flex:1
    },
    iconButton: {
        padding:10
    }

}));
