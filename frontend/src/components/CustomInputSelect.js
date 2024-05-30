import React, {useContext, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Chip from '@material-ui/core/Chip';


function CustomInputSelect(props) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(props.options);

  return (
    <Autocomplete
      {...props}
      options={options}
      noOptionsText="Enter to create a new option"
      getOptionLabel={(option) => option}
      onInputChange={(e, newValue) => {
        console.log('value ddf newValue', newValue, e);
        props.setCurrentAnswer(newValue);
      }}
      renderTags={(value, getTagProps) =>
        { 
          console.log('value ddf', value);
          return (
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          );
        }
        
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select"
          variant="outlined"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              options.findIndex((o) => o === inputValue) === -1
            ) {
              setOptions((o) => o.concat(inputValue));
            }
          }}
        />
      )}
    />
  );
}

export default CustomInputSelect;
