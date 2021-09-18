import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    card:{
        width:'100%',
        height: '9rem',
        padding:'1rem',
        margin: '0.5rem 0',
        
    },
    rootContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    },
    presentationContainer:{
        display: 'flex',
        width: '65%'
    },
    detailsContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItens: 'center',
        width: '35%'
    },
    descriptionContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',  
        height: '100%'
    },
    title: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        "&:hover":{
            textDecoration: 'underline',
            cursor: 'pointer'
        }
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
    },
    informationsContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > *': {
            margin: '0 1rem',
          },
        
    },
    userContainer:{
        display: 'flex',
        flexDirection: 'column',
        width: '10rem'
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
