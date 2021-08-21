import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    container:{
        root: {
            width: '100%',
          },
          heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            flexBasis: '33.33%',
            flexShrink: 0,
          },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '90%',
        flexShrink: 0,
      },
    icon:{
        color:'#000'
      },
      secondaryHeading:{
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      accordion:{
        background: 'transparent',
        '&$expanded': {
          margin: 'auto',
        },
        '&:before': {
          display: 'none',
        },
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
      }   
}));