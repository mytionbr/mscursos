import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    containerPresetation: {
        width: '100vw',
        height: '100vh',
    },
    illustration:{
        width: '100%',
        height: '500px',
        marginTop: '1rem'
    },
    presentationContainer:{
        height:' 100%',
        width: '100%',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signinContainer:{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column'
    }

    
   
}))