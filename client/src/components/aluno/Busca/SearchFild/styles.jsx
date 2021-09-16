import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    rootContainer:{
        display: 'flex',
        alignItems: 'center',
        "& > *":{
            marginRight:'1rem'
        },
    },
    btn:{
        padding: '0.7rem 1rem',
        fontSize: '1rem'
    }
}));
