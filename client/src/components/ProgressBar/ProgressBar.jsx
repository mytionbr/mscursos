import { LinearProgress, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import React from 'react'

function ProgressBar({color,percent,...rest}) {

    const BorderLinearProgress = withStyles((theme) => ({
        root: {
          height: '1rem',
          borderRadius: '0.5rem',
        },
        colorPrimary: {
          backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
          borderRadius: '0.5rem',
          backgroundColor: Number(percent) === 100 ? green[500] : '#1a90ff' ,
        },
      }))(LinearProgress);
    
    return (
        <BorderLinearProgress
             thickness={4}
             variant="determinate"
             size={100}
             value={percent}
             {...rest}
          />
    )
}

export default ProgressBar
