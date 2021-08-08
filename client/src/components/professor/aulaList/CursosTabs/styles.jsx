import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    card: {
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}))