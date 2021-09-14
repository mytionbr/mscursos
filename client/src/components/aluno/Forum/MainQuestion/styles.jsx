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
        borderBottom: '0.1rem solid #aaa'
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
        display: 'flex'
    },
    userContainer:{
        display: 'flex',
        alignItems: 'center',
        '& > *':{
            margin: '0.2rem'
        }
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
