import { lazy } from 'react';

import {
    createBrowserRouter
} from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute';

const AuthLayout = lazy(() => import('../components/auth')),
    Login = lazy(() => import('../pages/auth')),
    Signup = lazy(() => import('../pages/auth/Signup')),
    ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword')),
    LayoutComponent = lazy(() => import('../components/layout')),
    Dashboard = lazy(() => import('../pages/user/Dashboard')),
    EventPage = lazy(() => import('../pages/user/Event')),
    ViewEvent = lazy(() => import('../pages/user/event/ViewEvent')),
    EmployeePage = lazy(() => import('../pages/user/Employee'));

export const router = createBrowserRouter([
    {
        path: "",
        children: [{
            path: "/",
            element: <AuthLayout />,
            children: [{
                path: '',
                element: <Login />,
            }, {
                path: 'signup',
                element: <Signup />,
            }, {
                path: 'forgot-password',
                element: <ForgotPassword />,
            }]
        }, {
            path: "",
            element: <PrivateRoute>
                <LayoutComponent />
            </PrivateRoute>,
            children: [{
                path: "dashboard",
                element: <Dashboard />
            }, {
                path: "events",
                element: <EventPage />
            }, {
                path: "events/:id",
                element: <ViewEvent />
            }, {
                path: "employees",
                element: <EmployeePage />
            }, {
                path: "profile",
                element: <Dashboard />
            }]
        }],
    },
]);