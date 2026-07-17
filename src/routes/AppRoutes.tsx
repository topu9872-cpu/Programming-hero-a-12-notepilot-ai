
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


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/features', element: <Features /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/explore', element: <Explore /> },
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
        path: "notes",
        element: <MyNotes />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
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

