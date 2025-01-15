import React from 'react';

export enum LoaderVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Success = 'success',
    Danger = 'danger'
}

export enum LoaderSize {
    Small = 'sm',
    Medium = 'md',
    Large = 'lg'
}

interface ScreenLoaderProps {
    variant?: LoaderVariant;
    size?: LoaderSize
}

const LoaderComponent: React.FC<ScreenLoaderProps> = ({ variant = LoaderVariant.Primary, size = LoaderSize.Medium }) => {
    return (
        <div className={`spinner-border text-${variant} spinner-border-${size}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default LoaderComponent;
