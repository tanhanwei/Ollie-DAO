import { Box, TextField } from "@mui/material";
import React from "react";

const ExecutionField = (props) => {
  return (
    <div>
      {" "}
      {props.label != "Nil" ? (
        <Box sx={{ p: 1 }}>
          <TextField
            id="outlined-basic"
            label={props.label}
            variant="outlined"
            onKeyUp={props.inputHandler}
          />
        </Box>
      ) : (
        <br />
      )}
    </div>
  );
};

export default ExecutionField;
