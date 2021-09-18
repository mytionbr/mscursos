import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    ratingByStar:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down('xs')]:{
          flexDirection: 'column-reverse',
          margin: '0.5rem 0'
         },
    },
    progressGrid:{
        [theme.breakpoints.down('xs')]:{
            minWidth: '100%',
           },
    }
}));
