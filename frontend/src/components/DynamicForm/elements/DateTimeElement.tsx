import React from "react";
import { Field, FieldInputProps } from "formik";
import { InputElementProps } from "../elements.interface";
import DateTimePicker from 'react-datetime-picker';

const DateTimeElement: React.FC<InputElementProps> = ({ id, inputClass }) => {
    return (
        <Field name={id}>
            {({ field, form }: { field: FieldInputProps<any>; form: any }) => (
                <DateTimePicker
                    value={field.value || null} // Ensure value is not undefined
                    onChange={(val: any) => form.setFieldValue(field.name, val)} // Update form state
                    className={`form-control ${inputClass}`}
                    id={id}
                    format="dd/MM/y hh:mm a"
                />
            )}
        </Field>
    );
};


export default DateTimeElement;