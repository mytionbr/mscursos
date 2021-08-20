import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    container:{
        minWidth: "100%",
        display: 'flex',
        padding: '1rem',
        justifyContent: 'space-evenly',
        backgroundColor: theme.palette.secondary.main,
        '& > *':{
            color: '#fff',
            fontSize: '1rem',
        },
    },
    
}));
