import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

function ButtonOption({ title, handleClick, state, value }) {
    const [select, setSelect] = useState(false);

    useEffect(() => {
      if (state === value) {
        setSelect(true);
      }
    }, [state, value]);

    return (
      <Button
        variant="contained"
        onClick={handleClick}
        style={{
          backgroundColor: select ? "#3927a0" : "#aaaaaa",
          color: select ? "#fff" : "#000",
        }}
      >
        {title}
      </Button>
    );
}

export default ButtonOption
