// src/App.tsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorBoundary from "./components/common/ErrorHandler";
import ScreenLoaderComponent from "./components/common/ScreenLoaderComponent";
import GlobalToaster from "./components/ToastComponent"; // Import GlobalToaster
import { router } from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container-fluid app">
      <Provider store={store}>
        {/* Include ToastContainer to render toasts */}
        <ToastContainer position="top-right" autoClose={5000} />

        <GlobalToaster /> {/* Global toaster for error management */}
        <ErrorBoundary fallbackComponent={<ScreenLoaderComponent />}>
          <Suspense fallback={<ScreenLoaderComponent />}>
            <RouterProvider router={router} fallbackElement={<ScreenLoaderComponent />} />
          </Suspense>
        </ErrorBoundary>
      </Provider>
    </div>
  );
}

export default App;
