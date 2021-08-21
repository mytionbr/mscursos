import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    box:{
        paddingTop: "2.5rem",
        backgroundColor: theme.palette.secondary.main,
        minWidth: "100%",
    },
    container:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
    },
    title:{
        fontWeight:'700'
    },
}));
