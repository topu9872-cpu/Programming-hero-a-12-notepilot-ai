import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.js';
import Home from '../pages/Home/Home.js';
import Features from '../pages/Features/Features.js';
import About from '../pages/About/About.js';
import Contact from '../pages/Contact/Contact.js';
import Login from '../pages/Login/Login.js';
import Signup from '../pages/Signup/Signup.js';
import Explore from '../pages/Explore/Explore.js';
import DashboardLayout from '../components/DashboardLayout.js';
import DashboardHome from '../pages/DashboardHome.js';
import MyNotes from '../pages/MyNotes.js';
import CreateNote from '../pages/CreateNote.js';
import FavoritesPage from '../pages/Favorites.js';
import ProfilePage from '../pages/Profile.js';
import NoteDetails from '../pages/Explore/ExploreDetails.js';
import { Suspense } from 'react';
import { NotePilotLoader } from '../components/NotePilotLoader.js';
import NotFoundPage from '../pages/NotFoundPage.js';
import NotFound from '../pages/NotFound.js';
const router = createBrowserRouter([
    {
        element: _jsx(MainLayout, {}),
        children: [
            { path: '/', element: _jsx(Home, {}),
                errorElement: _jsx(NotFoundPage, {}),
            },
            { path: '/features', element: _jsx(Features, {}) },
            { path: '/about', element: _jsx(About, {}) },
            { path: '/contact', element: _jsx(Contact, {}) },
            { path: '/login', element: _jsx(Login, {}) },
            { path: '/signup', element: _jsx(Signup, {}) },
            { path: '/explore', element: _jsx(Explore, {}) },
            { path: '/explore/:id', element: _jsx(NoteDetails, {}) },
            {
                path: "*",
                element: _jsx(NotFound, {})
            }
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
                path: "/dashboard/profile",
                element: _jsx(ProfilePage, {}),
            },
            {
                path: "*",
                element: _jsx(NotFound, {})
            }
        ],
    },
]);
const AppRoutes = () => {
    return _jsx(_Fragment, { children: _jsx(Suspense, { fallback: _jsx(NotePilotLoader, {}), children: _jsx(RouterProvider, { router: router }) }) });
};
export default AppRoutes;
