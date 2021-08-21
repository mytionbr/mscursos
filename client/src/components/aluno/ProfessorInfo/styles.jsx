import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    icon:{
        fontSize:'2rem',
        width: '3rem',
        height: '3rem',
        color: '#fff',
        background: theme.palette.secondary.main
    },
    title:{
        fontSize:'1.5rem',      
    },
    subheader:{
        fontSize:'1rem',      
    }
}));
