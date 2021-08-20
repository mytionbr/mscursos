import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: "2rem 0",
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        minWidth: "100%",
    },
    
}));
