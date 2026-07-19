
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Features from '../pages/Features/Features';
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
import ProfilePage from '../pages/Profile';
import NoteDetails from '../pages/Explore/ExploreDetails';


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/features', element: <Features /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/explore', element: <Explore /> },
      { path: '/explore/:id', element: <NoteDetails /> },
    ],

  },
    // Dashboard routes
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/notes",
        element: <MyNotes />,
      },
      {
        path: "/dashboard/create-note",
        element: <CreateNote />,
      },
      {
        path: "/dashboard/favorites",
        element: <FavoritesPage />,
      },
     
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <>

  
   <RouterProvider router={router} />
  </>  
};

export default AppRoutes;

