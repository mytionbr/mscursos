import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    paper:{
        display: 'flex',
        padding: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
         },
    },
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
         },
    },
    space:{
        "& > *": {
            margin: '0.1rem'
        },
    },
   

}));
