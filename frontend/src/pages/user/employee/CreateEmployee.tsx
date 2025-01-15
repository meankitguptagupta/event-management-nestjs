import React from "react";
import { DynamicFormComponent } from "../../../components/DynamicForm";
import { DataObject } from "../../../components/DynamicForm/elements.interface";
import FormSchema from '../../../json-forms/signup.json';
import { useAppDispatch } from "../../../redux/hooks";
import { clearGlobalError } from "../../../redux/features/globalErrorSlice";
import { IEmployee } from "../../../types/user.interface";
import { ISignupFormParam } from "../../../types/auth.interface";
import { createEmployee } from "../../../redux/features/userSlice";

interface CreateEmployeeProps {
  employee?: IEmployee; // If provided, we are editing
  onClose: () => void; // To close the modal when done
}

export const CreateEmployee: React.FC<CreateEmployeeProps> = ({ employee, onClose }) => {

  const dispatch = useAppDispatch();

  // Handle form submission
  const handleFormSubmit = async (formData: DataObject) => {

    console.info('formData', formData)

    // Clear previous error when submitting the form
    dispatch(clearGlobalError());

    const params: ISignupFormParam = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const result = await dispatch(createEmployee(params)).unwrap();
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="createEvent">
      <div
        className="modal fade show"
        style={{ display: "block", zIndex: 1050 }}
        tabIndex={-1}
        aria-labelledby="createEventModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createEventModal">
                {employee ? "Edit" : "Create"} Employee
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <DynamicFormComponent
                formData={FormSchema}
                formId="create-employee-form"
                onSubmit={handleFormSubmit}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary text-sm mb-4"
                type="reset"
              >
                Reset
              </button>

              <button
                className="btn btn-outline-primary text-sm mb-4"
                type="submit"
                form="create-employee-form"
              >
                {employee ? "Update" : "Create"} Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
