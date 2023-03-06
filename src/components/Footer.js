import { Outlet } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <h1>Footer</h1>
            {/* needed for nested routes to work */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Footer;
