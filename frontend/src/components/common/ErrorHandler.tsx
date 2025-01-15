import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallbackComponent: ReactNode;
    children: ReactNode; // Add the 'children' prop
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        // You can also log the error to a remote logging service here

        // Optionally, you can handle the error and update the state
        // this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallbackComponent;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
