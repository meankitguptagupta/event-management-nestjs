import React from 'react';

const year = new Date().getFullYear();

const FooterComponent: React.FC = () => {
    return (
        <p className="text-sm text-black-50">
            &#169; {year} | {process.env.REACT_APP_NAME} &nbsp; All Rights Reserved.
        </p>
    );
};

export default FooterComponent;
