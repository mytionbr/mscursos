import { FormControl, InputLabel, Select,MenuItem, OutlinedInput  } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
function Selector({ items, state, setState, name }) {
  const classes = useStyles()  
      
    const id = `label-${name}`
    
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
            <FormControl variant="outlined"  className={classes.formControl}>
              <InputLabel shrink  ref={inputLabel} htmlFor={id}>{name}</InputLabel>
              <Select
              displayEmpty
                labelId={id}
                value={state}
                onChange={setState}
                label={name}
                color="secondary"
                inputProps={{
                  name: {name},
                  id: "outlined-age-native-simple",
                }}
                input={
                  <OutlinedInput
                    notched
                    labelWidth={labelWidth}
                    name="age"
                    id="outlined-age-always-notched"
                  />
                }
              >
                  <MenuItem  value={null}><em>Todos</em></MenuItem >
                {items.map((item) => (
                  <MenuItem  value={item.value}>{item.name}</MenuItem >
                ))}
              </Select>
            </FormControl>
          )
}

export default Selector
