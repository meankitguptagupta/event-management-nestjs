import { Link } from 'react-router-dom';
import FormSchema from '../../json-forms/forgot-password.json';
import { DataObject } from '../../components/DynamicForm/elements.interface';
import { DynamicFormComponent } from '../../components/DynamicForm';

const ForgotPassword = () => {

    const handleFormSubmit = (formData: DataObject) => {
        // Perform any actions with the form data
        console.log(formData);
    };

    return (
        <div className="forget-password">
            <div className="fs-5 fw-semibold">Forgot Password</div>
            <p className='mb-4 text-sm fw-semibold'>already registered? <Link className='text-link text-decoration-none text-sm' to="/">LoginIn</Link></p>

            <DynamicFormComponent formData={FormSchema} formId="forget-password-form" onSubmit={handleFormSubmit} />

            <button className="btn btn-primary text-sm mb-4" type="submit" form="forget-password-form">
                Submit
            </button>
        </div>
    );
};

export default ForgotPassword;
