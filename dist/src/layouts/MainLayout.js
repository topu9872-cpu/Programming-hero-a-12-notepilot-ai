import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer.js';
import Navbar from '../components/layout/Navbar.js';
const MainLayout = () => {
    return (_jsxs(_Fragment, { children: [_jsxs("main", { children: [_jsx(Navbar, {}), _jsx(Outlet, {})] }), _jsx(Footer, {})] }));
};
export default MainLayout;
