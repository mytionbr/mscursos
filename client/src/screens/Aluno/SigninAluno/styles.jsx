import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    containerPresetation: {
        width: '100vw',
        height: '100vh',
    },
    illustration:{
        width: '500px',
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
    presentation:{
        position: 'absolute',
        zIndex: '5',
        top: '90px',
       
    }

    
   
}))