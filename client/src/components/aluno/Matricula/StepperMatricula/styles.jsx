import { createTheme } from '@material-ui/core/styles'

export default createTheme({
    overrides:{
      MuiStepIcon:{
        root:{
          fontSize: '1.8rem',
        },
        active:{
          color: '#784af4',
          text:'#fff'
        },
        completed:{
          color: '#784af4',
          text:'#fff'
        }
      }
    },  
})