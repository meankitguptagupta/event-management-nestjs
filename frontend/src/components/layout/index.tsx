import { Outlet } from "react-router-dom";
import FooterComponent from "../FooterComponent";
import { TopbarComponent } from "./Topbar";

const LayoutComponent = () => {
    return (
        <div className="container-fluid">
            <TopbarComponent />

            <div className="my-layout">
                <Outlet />
            </div>

            <nav className="container-fluid fixed-bottom">
                <FooterComponent />
            </nav>
        </div>
    );
};

export default LayoutComponent;
