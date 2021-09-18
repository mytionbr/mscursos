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
        '& > h5':{
            display: 'flex',
            alignItems: 'center',
        },
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column',
            "& > *":{
                margin: '0.5rem 0'
            }
         },

    },
    icon:{
        '& > svg':{
            marginRight: '0.5rem',
            fontSize: '2.2rem'
        },
    },
    rating:{
        color: '#fff',
        fontSize: '1rem'
    },
    text:{
        fontSize: '1rem'
    },
    infoContainer:{
        display: 'flex',
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'row',
            "& > *":{
                margin: '0 0.2rem'
            }
         },
    }
    
}));
