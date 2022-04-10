import React from "react";
import ExecutionField from "./ExecutionField";

const ExecutionFields = (props) => {
  return (
    <div>
      {props.params.BOOL.map((BOOL) =>
        BOOL != "NIL" ? <ExecutionField label={BOOL} /> : <br />
      )}
      {props.params.INT.map((INT) =>
        INT != "NIL" ? <ExecutionField label={INT} /> : <br />
      )}
      {props.params.UINT.map((UINT) =>
        UINT != "NIL" ? <ExecutionField label={UINT} /> : <br />
      )}
      {props.params.STRING.map((STRING) =>
        STRING != "NIL" ? <ExecutionField label={STRING} /> : <br />
      )}
      {props.params.ADDRESS.map((ADDRESS) =>
        ADDRESS != "NIL" ? <ExecutionField label={ADDRESS} /> : <br />
      )}
    </div>
  );
};

export default ExecutionFields;
