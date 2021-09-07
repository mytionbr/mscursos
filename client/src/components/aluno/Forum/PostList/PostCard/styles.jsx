import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    title: {
        textDecoration: 'none'
    },
    answered: {
        backgroundColor: '#aaa',
        width:'2rem',
        height:'2rem',
    },
    notAnswered: {
        backgroundColor: '#42c742',
        width:'2rem',
        height:'2rem',
    },
    icon:{
        color: '#fff',
        fontSize: '1.5rem',
    },
    descriptionContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    tagsContainer:{
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
          },
    },
    responsesContainer:{
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: theme.spacing(0.1),
          },
    },
    avatarUser:{
        backgroundColor: theme.palette.secondary.main,
        color: "#fff" 
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
   }
    

}));
