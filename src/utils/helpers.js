import React from "react";
import { Field } from "react-final-form";
import { Input } from "reactstrap";

export const FieldHelpers = ({ name, labelName, placeholder, type = 'text' }) => {
  return (
    <div>
      <Field name={name}>
        {({ input, meta }) => (
          <div>
            <label>{labelName}</label>
            <Input type={type} {...input} placeholder={placeholder} />
            {meta.error && meta.touched && (
              <span style={{ color: "#fd4444" }}>{meta.error}</span>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export const TableHelpers = ({ word = '-----' }) => {
  return (
    <td>
      <div className="TdInDiv"> {word}</div>
    </td>
  );
};
