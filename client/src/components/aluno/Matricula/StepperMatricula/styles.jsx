import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    active: {
        color: '#784af4',
      },
      circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
      completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
      },
}));