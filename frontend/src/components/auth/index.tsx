import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import './index.css';
import LoaderComponent from '../common/ScreenLoaderComponent/LoaderComponent';
import FooterComponent from '../FooterComponent';

const AuthLayout: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="row">
            <div className="col-md-6 bg-white">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-6 mx-auto">
                                {isLoading && <LoaderComponent />}
                                <img
                                    className="logo mb-3 img-fluid"
                                    src={process.env.REACT_APP_LOGO_SRC}
                                    alt="Logo"
                                    onLoad={handleImageLoad}
                                />
                                <Outlet />
                                <FooterComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="col-md-6 d-none d-md-flex text-white text-uppercase fs-1 fw-bolder pt-5 ps-5 bg-image"
                style={{ backgroundImage: `url('${process.env.REACT_APP_AUTH_SRC}')` }}
            >
            </div>
        </div>
    );
};

export default AuthLayout;
