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
        justifyContent: 'space-between'
    },
    emphasis:{
        fontWeight: '700',
        color: '#aaa'
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
        alignItems: 'flex-start',
        '& > *':{
            margin: '0.5rem'
        }
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
        }
    },
    respostas:{
        color: '#9b9797',
        fontWeight: '600'
    },
    conteudo:{
        padding: '1rem'
    },
    corpoContainer:{
        display: 'flex'
    },
    userContainer:{
        display: 'flex',
        '& > *':{
            margin: '0.5rem'
        }
    },

}));
