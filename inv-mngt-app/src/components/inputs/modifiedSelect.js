import React from 'react';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function ModifiedSelect({ label = "", value , handleChange = () => { }, options = {} }) {

  options = {
    ...options,
    width: "small",
    id: "outlined-size-small",
    defaultValue: "",
    // variant : "filled",
    horizontalLabel: false,
  }

  return (
    <>
      {
        options.horizontalLabel ?
          <div>
            <label>{label}</label>
            <FormControl fullWidth={options.width} sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                // label={label}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div> :
          <div>
            <FormControl fullWidth={options.width} sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
      }
    </>
  )
}