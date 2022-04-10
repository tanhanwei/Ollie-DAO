import { TextField } from "@mui/material";
import React from "react";

const ExecutionField = (props) => {
  return (
    <div>
      {" "}
      {props.label != "Nil" ? (
        <TextField
          id="outlined-basic"
          label={props.label}
          variant="outlined"
          onKeyUp={props.inputHandler}
        />
      ) : (
        <br />
      )}
    </div>
  );
};

export default ExecutionField;
