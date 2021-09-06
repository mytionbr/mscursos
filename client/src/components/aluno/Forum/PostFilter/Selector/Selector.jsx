import { FormControl, InputLabel, Select } from '@material-ui/core'
import React from 'react'

function Selector({ items, state, setState }) {
    
    return (
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Categoria</InputLabel>
              <Select
                native
                value={state}
                onChange={setState}
                label="Categoria"
                inputProps={{
                  name: "categoria",
                  id: "outlined-age-native-simple",
                }}
              >
                {items.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
          )
}

export default Selector
