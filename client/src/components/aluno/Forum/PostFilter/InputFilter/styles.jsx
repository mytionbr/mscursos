import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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
