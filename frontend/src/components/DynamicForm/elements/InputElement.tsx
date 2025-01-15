import React from "react";
import { Field, FieldInputProps } from "formik";
import { InputElementProps } from "../elements.interface";

const InputElement: React.FC<InputElementProps> = ({ type, id, placeholder, inputClass, disabled = false }) => {
    return (
        <Field name={id}>
            {({ field }: { field: FieldInputProps<any> }) => (
                <input
                    {...field}
                    placeholder={placeholder}
                    className={`form-control ${inputClass}`}
                    id={id}
                    type={type}
                    disabled={disabled}
                    autoComplete="off"
                />
            )}
        </Field>
    );
};

export default InputElement;