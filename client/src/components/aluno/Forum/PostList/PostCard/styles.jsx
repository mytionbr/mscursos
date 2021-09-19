import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    card:{
        width:'100%',
        minHeight: '9rem',
        padding:'1rem',
        margin: '0.5rem 0',
        overflow: 'auto'
    },
    rootContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
            justifyContent: 'center',
         },
    },
    presentationContainer:{
        display: 'flex',
        width: '65%',
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
         },
    },
    detailsContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItens: 'center',
        width: '35%',
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
            justifyContent: 'center',
            width: '100%',
         },
    },
    descriptionContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',  
        height: '100%',
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
            justifyContent: 'center',
            width: '100%',
         },
    },
    title: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        "&:hover":{
            textDecoration: 'underline',
            cursor: 'pointer'
        },
        textAlign: 'center'
    },
    iconContainer:{
        padding: '1rem'
    },
    responsesContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(0.1),
          },
    },
    tagsContainer:{
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
          },
          [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
            justifyContent: 'center',
         },
    },
    informationsContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > *': {
            margin: '0 1rem',
          },
          [theme.breakpoints.down('sm')]:{
            flexDirection: 'column' ,
            justifyContent: 'center',
         },
        
    },
    userContainer:{
        display: 'flex',
        flexDirection: 'column',
        width: '10rem',
        [theme.breakpoints.down('sm')]:{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
         },
    },
    avatarIcon:{
        width:'4rem',
        height:'4rem',
    },
    answered: {
        backgroundColor: '#42c742',
    },
    notAnswered: {
        backgroundColor: '#aaa',
    },
    icon:{
        color: '#fff',
        fontSize: '2.5rem',
    },
    avatarUser:{
        backgroundColor: theme.palette.secondary.main,
    },
    row:{
       display:'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-between',
       alignItems: 'center',
       width: '100%'
   },
   pagination:{
       margin: 'auto',
       marginTop:'0.5rem',
   },
   
   userName:{
       fontWeight: '600',
       lineHeight: '1.3'
   }
    

}));
