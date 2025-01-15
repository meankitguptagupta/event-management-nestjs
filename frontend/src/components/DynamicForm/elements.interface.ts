import { FormikHelpers } from "formik";
export interface FieldValidationProps {
    [key: string]: string | boolean | number;
}
export interface Field {
    id: string;
    type: string;
    value?: string;
    label?: string;
    placeholder?: string;
    validations?: FieldValidationProps[],
    formGroupClass?: string;
    labelClass?: string;
    inputClass?: string;
    options?: string[] | Option[];
    rows?: number;
    disabled?: boolean;
    observe?: {
        condition?: {
            fieldId: string,
            value: string
        },
        formula?: string;
        formula_suffix?: string;
    }
}

export interface Option {
    value: string;
    label: string;
}

export interface DataObject {
    [key: string]: string;
}

export interface DynamicFormProps {
    formData: Field[];
    formId: string;
    onSubmit: (values: DataObject) => void;
}

export interface InputElementProps {
    id: Field['id'];
    type: Field['type'];
    inputClass?: Field['inputClass'];
    placeholder?: Field['placeholder'];
    disabled?: Field['disabled']
}

export interface RadioCheckElementProps {
    options: Field['options'];
    id: Field['id'];
    type: Field['type']
}

export interface SelectElementProps {
    options?: Field['options'];
    id: Field['id'];
    inputClass?: Field['inputClass']; // Make inputClass optional
    placeholder?: Field['placeholder'];
}

export interface TextareaElementProps {
    id: Field['id'];
    inputClass?: Field['inputClass']; // Make inputClass optional
    placeholder?: Field['placeholder'];
    rows?: Field['rows'];
}