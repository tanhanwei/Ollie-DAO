import React from "react";
import ExecutionField from "./ExecutionField";

const ExecutionFields = (props) => {
  return (
    <div>
      {props.params.BOOL.map((BOOL, idx) =>
        BOOL != "NIL" ? (
          <ExecutionField
            key={BOOL}
            inputHandler={props.inputHandler("BOOL", idx)}
            label={BOOL}
          />
        ) : (
          <br />
        )
      )}
      {props.params.UINT.map((UINT, idx) =>
        UINT != "NIL" ? (
          <ExecutionField
            key={UINT}
            inputHandler={props.inputHandler("UINT", idx)}
            label={UINT}
          />
        ) : (
          <br />
        )
      )}
      {props.params.INT.map((INT, idx) =>
        INT != "NIL" ? (
          <ExecutionField
            key={INT}
            inputHandler={props.inputHandler("INT", idx)}
            label={INT}
          />
        ) : (
          <br />
        )
      )}
      {props.params.STRING.map((STRING, idx) =>
        STRING != "NIL" ? (
          <ExecutionField
            key={STRING}
            inputHandler={props.inputHandler("STRING", idx)}
            label={STRING}
          />
        ) : (
          <br />
        )
      )}
      {props.params.ADDRESS.map((ADDRESS, idx) =>
        ADDRESS != "NIL" ? (
          <ExecutionField
            key={ADDRESS}
            inputHandler={props.inputHandler("ADDRESS", idx)}
            label={ADDRESS}
          />
        ) : (
          <br />
        )
      )}
    </div>
  );
};

export default ExecutionFields;
