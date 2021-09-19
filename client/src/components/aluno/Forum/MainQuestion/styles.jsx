import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    rootContainer:{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem'
    },
    titleContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottom: '0.1rem solid #aaa',
    },
    title:{
        [theme.breakpoints.down("xs")]: {
            "& > *":{fontSize: '1.5rem'}
          },
    },
    tagsContainer:{
        display: 'flex',
        '& > *':{
            margin: '0.5rem'
        }
    },
    sideColumn:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        '& > *':{
            margin: '0.1rem'
        },
        borderRight:'0.1rem solid #aaa',
        [theme.breakpoints.down("xs")]: {
            borderRight:'none',
            borderTop:'0.1rem solid #aaa',
            borderBottom:'0.1rem solid #aaa',
            fontSize: '1rem'
          },
      
    },
    avatarIcon:{
        backgroundColor: '#42e74a',
        padding: '2rem'
    },
    icon:{
        fontSize: '1.5rem'
    },
    linkResposta:{
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        '&:hover':{
            textDecoration: 'underline'
        },
        cursor: 'pointer'
    },
    respostas:{
        color: '#525050',
    },
    conteudo:{
        padding: '1rem'
    },
    corpoContainer:{
        display: 'flex',
        [theme.breakpoints.down("xs")]: {
            flexDirection: 'column'
          },
    },
    userContainer:{
        display: 'flex',
        alignItems: 'center',
        '& > *':{
            margin: '0.2rem'
        },
        [theme.breakpoints.down("xs")]: {
            "& > *":{
                fontSize: '0.7rem'
            }
            
          },
    },
    date:{
        [theme.breakpoints.down("xs")]: {
                fontSize: '0.7rem'
          },
    },
    avatarUser:{
        backgroundColor: theme.palette.secondary.main,
        padding: '1rem'
    },
    detailsContainer:{
        display:'flex',
        alignItems: 'center',
        width: '100%'
    },
    answered:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

}));
