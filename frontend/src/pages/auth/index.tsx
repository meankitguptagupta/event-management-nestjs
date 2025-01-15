import React from "react";
import { Link, useNavigate } from "react-router-dom";

import FormSchema from "../../json-forms/login.json";
import { DynamicFormComponent } from "../../components/DynamicForm";
import { DataObject } from "../../components/DynamicForm/elements.interface";
import { loginUser } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ILoginFormParam } from "../../types/auth.interface";
import { clearGlobalError } from "../../redux/features/globalErrorSlice"; // Import the clearGlobalError action

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get error message from Redux store
  const errorMessage = useAppSelector((state) => state.globalError.message);

  const handleFormSubmit = async (formData: DataObject) => {
    // Clear previous error when submitting the form
    dispatch(clearGlobalError());

    const loginData: ILoginFormParam = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const result = await dispatch(loginUser(loginData)).unwrap();

      if (result?.accessToken) {
        navigate("/dashboard"); // Redirect to dashboard on successful login
      }
    } catch (error) {
    }
  };

  return (
    <div className="login">
      <div className="fs-5 fw-semibold">Sign In</div>
      <p className="mb-4 text-sm fw-ssh setemibold">
        New here?&emsp;
        <Link className="text-link text-decoration-none text-sm" to="/signup">
          Create Account
        </Link>
      </p>

      {/* Show the error in an alert */}
      {errorMessage && (
        <p className="alert alert-danger" role="alert">
          {errorMessage}
        </p>
      )}

      <DynamicFormComponent formData={FormSchema} formId="login-form" onSubmit={handleFormSubmit} />

      <div className="custom-control mb-1 text-end">
        <Link
          to="/forgot-password"
          className="text-link text-decoration-none text-sm"
        >
          Forgot password?
        </Link>
      </div>

      <button className="btn btn-primary text-sm mb-4" type="submit" form="login-form">
        Log In
      </button>
    </div>
  );
};

export default Login;
