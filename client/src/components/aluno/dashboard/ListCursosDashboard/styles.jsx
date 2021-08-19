import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(25),
        fontWeight: theme.typography.fontWeightRegular,
      },
    grid:{
      flexGrow: 1,
    },
    details:{
        background: theme.palette.secondary.main,
        color: '#fff'
    },
    icon:{
      color:'#fff'
    }
}
))