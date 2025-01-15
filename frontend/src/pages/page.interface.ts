import { DataObject } from "../components/DynamicForm/elements.interface";

export interface PageProps {
    onSubmit: (values: DataObject) => void;
    formId: string;
}