import { grey } from "@material-ui/core/colors";
import { makeStyles,alpha } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar:{
    backgroundColor: "#fff",
    color: grey[700],
    alignItems: 'center',
    padding: '10px 50px',
  },
  grow: {
    flexGrow: 1,
  },
  brand: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  brandLink:{
    color: "inherit",
    textDecoration: "none",
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(grey[700], 0.15),
    '&:hover': {
      backgroundColor: alpha(grey[700], 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'flex',
    alignItems: 'center'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionNav:{
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  navLink:{
    color:"inherit",
    fontSize: '1rem',
    '&:hover': {
      color:'#000'
    },
  },
  icon:{
    fontSize: '1.5rem',
    marginRight: '0.2rem'
  },
  brandIcon:{
    color: theme.palette.secondary.main,
    fontSize: '2rem',
    marginRight: '0.2rem'
  },
  iconButton: {
    padding: '0.5rem'  
  }
}));
