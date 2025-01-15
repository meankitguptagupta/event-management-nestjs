import React from 'react';
import { RadioCheckElementProps } from '../elements.interface';
import { Field, FieldInputProps } from 'formik';

const genRandNum = (): number => Math.floor(Math.random() * 90000 + 10000);

const RadioCheckElement: React.FC<RadioCheckElementProps> = ({ options = [], id, type }) => {
    return (
        <Field name={id}>
            {({ field }: { field: FieldInputProps<any> }) => (
                options.map((option, optionIndex) => {
                    let value: string = String(option);
                    let label: string = String(option);

                    if (typeof option === 'object') {
                        value = option.value;
                        label = option.label;
                    }

                    return (
                        <div className="form-check form-check-inline" key={`radio-check-${genRandNum()}`}>
                            <input
                                className="form-check-input"
                                type={type}
                                id={`${id}-${optionIndex}`}
                                name={id}
                                value={value}
                                checked={field.value == value}
                                onChange={field.onChange}
                            />
                            <label className="form-check-label" htmlFor={`${id}-${optionIndex}`}>
                                {label}
                            </label>
                        </div>
                    );
                })
            )}
        </Field>
    );
};

export default RadioCheckElement;
