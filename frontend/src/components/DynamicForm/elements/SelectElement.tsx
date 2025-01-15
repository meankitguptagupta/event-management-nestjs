import React from 'react';
import { SelectElementProps } from '../elements.interface';
import { Field, FieldInputProps } from 'formik';

const genRandNum = (): number => Math.floor(Math.random() * 90000 + 10000);

const SelectElement: React.FC<SelectElementProps> = ({ options = [], id, inputClass, placeholder }) => {
    return (
        <Field name={id}>
            {({ field }: { field: FieldInputProps<any> }) => (
                <select
                    className={`form-select ${inputClass}`}
                    id={id}
                    {...field}
                >
                    <option>{placeholder}</option>
                    {options.map((option, optionIndex) => {
                        let value: string;
                        let label: string;

                        if (typeof option === 'object') {
                            value = option.value;
                            label = option.label;
                        } else {
                            value = String(option);
                            label = String(option);
                        }

                        return (
                            <option
                                key={`select-${id}-${genRandNum()}`}
                                value={value}
                            >
                                {label}
                            </option>
                        );
                    })}
                </select>
            )}
        </Field>
    );
};

export default SelectElement;
