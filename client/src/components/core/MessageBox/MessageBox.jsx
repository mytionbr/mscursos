import React from 'react'
import Alert from '@material-ui/lab/Alert';

function MessageBox(props) {
    return (
        <div style={{width:'100%'}}>
         <Alert variant="filled" severity={props.type}>
            {props.children}     
        </Alert>   
        </div>
    )
}

export default MessageBox
