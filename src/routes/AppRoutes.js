import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Features from '../pages/Features/Features';
import Pricing from '../pages/Pricing/Pricing';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Explore from '../pages/Explore/Explore';
import DashboardLayout from '../components/DashboardLayout';
import DashboardHome from '../pages/DashboardHome';
import MyNotes from '../pages/MyNotes';
import CreateNote from '../pages/CreateNote';
import FavoritesPage from '../pages/Favorites';
import TrashPage from '../pages/TrashPage';
import ProfilePage from '../pages/Profile';
import NoteDetails from '../pages/Explore/ExploreDetails';
const router = createBrowserRouter([
    {
        element: _jsx(MainLayout, {}),
        children: [
            { path: '/', element: _jsx(Home, {}) },
            { path: '/features', element: _jsx(Features, {}) },
            { path: '/pricing', element: _jsx(Pricing, {}) },
            { path: '/about', element: _jsx(About, {}) },
            { path: '/contact', element: _jsx(Contact, {}) },
            { path: '/login', element: _jsx(Login, {}) },
            { path: '/signup', element: _jsx(Signup, {}) },
            { path: '/explore', element: _jsx(Explore, {}) },
            { path: '/explore/:id', element: _jsx(NoteDetails, {}) },
        ],
    },
    // Dashboard routes
    {
        path: "/dashboard",
        element: _jsx(DashboardLayout, {}),
        children: [
            {
                index: true,
                element: _jsx(DashboardHome, {}),
            },
            {
                path: "/dashboard/notes",
                element: _jsx(MyNotes, {}),
            },
            {
                path: "/dashboard/create-note",
                element: _jsx(CreateNote, {}),
            },
            {
                path: "/dashboard/favorites",
                element: _jsx(FavoritesPage, {}),
            },
            {
                path: "/dashboard/trash",
                element: _jsx(TrashPage, {}),
            },
            {
                path: "/dashboard/profile",
                element: _jsx(ProfilePage, {}),
            },
        ],
    },
]);
const AppRoutes = () => {
    return _jsx(_Fragment, { children: _jsx(RouterProvider, { router: router }) });
};
export default AppRoutes;
