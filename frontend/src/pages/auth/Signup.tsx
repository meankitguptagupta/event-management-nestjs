import { Link, useNavigate } from 'react-router-dom';
import FormSchema from '../../json-forms/signup.json';
import { DataObject } from '../../components/DynamicForm/elements.interface';
import { DynamicFormComponent } from '../../components/DynamicForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearGlobalError } from '../../redux/features/globalErrorSlice';
import { ISignupFormParam } from '../../types/auth.interface';
import { signupUser } from '../../redux/features/authSlice';

const Signup = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get error message from Redux store
    const errorMessage = useAppSelector((state) => state.globalError.message);

    const handleFormSubmit = async (formData: DataObject) => {
        // Clear previous error when submitting the form
        dispatch(clearGlobalError());

        const loginData: ISignupFormParam = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        try {
            const result = await dispatch(signupUser(loginData)).unwrap();

            if (result?.accessToken) {
                navigate("/dashboard"); // Redirect to dashboard on successful login
            }
        } catch (error) {
        }
    };

    return (
        <div className="signup">
            <div className="fs-5 fw-semibold">Register</div>
            <p className='mb-4 text-sm fw-semibold'>already registered? <Link className='text-link text-decoration-none text-sm' to="/">LoginIn</Link></p>

            {/* Show the error in an alert */}
            {errorMessage && (
                <p className="alert alert-danger" role="alert">
                    {errorMessage}
                </p>
            )}

            <DynamicFormComponent formData={FormSchema} formId="signup-form" onSubmit={handleFormSubmit} />

            <button className="btn btn-primary text-sm mb-4" type="submit" form="signup-form">
                Register
            </button>
        </div>
    );
};

export default Signup;
