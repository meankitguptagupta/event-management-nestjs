import * as Yup from "yup";
import { Field } from "./elements.interface";

const createValidationSchema = (formData: Field[]): Yup.Schema<any> => {
    return Yup.object().shape(
        formData.reduce((schema: any, field: Field) => {
            if (field.validations) {
                const fieldValidation = field.validations.reduce(
                    (fieldSchema: any, validation: any) => {
                        let label = field.label?.replace('*', '')
                        if (validation.required) {
                            fieldSchema = fieldSchema.required(
                                `${label} is required`
                            );
                        }
                        if (validation.min) {
                            fieldSchema = fieldSchema.min(
                                validation.min,
                                `${label} must be at least ${validation.min} characters`
                            );
                        }
                        if (validation.max) {
                            fieldSchema = fieldSchema.max(
                                validation.max,
                                `${label} cannot exceed ${validation.max} characters`
                            );
                        }
                        if (validation.email) {
                            fieldSchema = fieldSchema.email(
                                `${label} must be a valid email address`
                            );
                        }
                        return fieldSchema;
                    },
                    Yup.string()
                );

                schema[field.id] = fieldValidation;
            }

            return schema;
        }, {})
    );
};

export default createValidationSchema;
