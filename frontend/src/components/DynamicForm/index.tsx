import React from "react";
import { DataObject, DynamicFormProps, Field } from "./elements.interface";
import { Form, Formik, FormikHelpers, ErrorMessage } from "formik";
import InputElement from "./elements/InputElement";
import createValidationSchema from "./validation.schema";
import RadioCheckElement from "./elements/RadioCheckElement";
import SelectElement from "./elements/SelectElement";
import DateTimeElement from "./elements/DateTimeElement";

export const DynamicFormComponent: React.FC<DynamicFormProps> = ({
    formData,
    formId,
    onSubmit
}) => {

    const initialValues: DataObject = formData.reduce(
        (o: DataObject, i: Field) => ({ ...o, [i.id]: i.value || '' }),
        {}
    );

    const validationSchema = createValidationSchema(formData);

    const renderField = (field: Field) => {
        switch (field.type) {
            case 'radio':
            case 'checkbox':
                return <RadioCheckElement {...field} options={field?.options || []} />;
            case 'select':
                return <SelectElement {...field} />;
            case 'calendar':
                return <DateTimeElement {...field} />;
            default:
                return <InputElement {...field} />;
        }
    };

    const onSubmitForm = (values: DataObject, actions: FormikHelpers<DataObject>) => {
        actions.setSubmitting(false);
        // actions.resetForm();
        onSubmit(values); // Call the onSubmit prop with the form values
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
        >
            {({ values }) => (
                <Form id={formId}>
                    <div className="row">
                        {formData.map((field: Field, i: number) => {
                            // check if element will show/hide on a condition
                            if (field.observe) {
                                if (field.observe.condition) {
                                    // observe real time value
                                    const { fieldId, value } = field.observe.condition;
                                    const observedFieldValue = values[fieldId];

                                    if (observedFieldValue !== value) {
                                        return null; // Skip rendering the field if the observed field value doesn't match the specified value
                                    }
                                }

                                // check for formula and set it into values
                                if (field.observe.formula) {
                                    const calculationFn = new Function("values", field.observe.formula);
                                    const result = calculationFn(values);
                                    if (result && result !== "NaN")
                                        values[field.id] = calculationFn(values) + field?.observe?.formula_suffix;
                                }
                            }

                            // else design element
                            return (
                                <div
                                    className={`col-sm-12 ${field?.formGroupClass}`}
                                    key={`formdata-${i}`}
                                >
                                    <label
                                        className={`lh-1 ${field?.labelClass}`}
                                        htmlFor={field.id}
                                    >
                                        {field?.label}
                                    </label>
                                    {renderField(field)}
                                    <ErrorMessage
                                        name={field.id}
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </Form>
            )}
        </Formik>
    );
};