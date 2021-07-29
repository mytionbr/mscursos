import { CircularProgress } from '@material-ui/core'
import React from 'react'

function LoadingBox() {
    return (
        <div>
            <CircularProgress color={"secondary"} />
        </div>
    )
}

export default LoadingBox
