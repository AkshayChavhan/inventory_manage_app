import React from 'react';
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function ModifiedSelect({ label="", onChange =()=>{} , options={}}) {

  options = {
    ...options,
    size : "small",
    id : "outlined-size-small",
    defaultValue : "",
    // variant : "filled",
    horizontalLabel : false,
  }

  return (
    <>
      {
        options.horizontalLabel ?
          <div>
            <label>{label}</label>
            <TextField
              id={options.id}
              defaultValue={options.defaultValue}
              size={options.size}
              variant={options.variant}
              onChange={onChange}
            />
          </div> :
          <div>
            <TextField
              label={label}
              id={options.id}
              defaultValue={options.defaultValue}
              size={options.size}
              variant={options.variant}
              onChange={onChange}
            />
          </div>
      }
    </>
  )
}