
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
    element: <MainLayout />,
    children: [
      
      { path: '/', element: <Home />,
         errorElement: <NotFoundPage />,
       },
      { path: '/features', element: <Features /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/explore', element: <Explore /> },
      { path: '/explore/:id', element: <NoteDetails /> },
      {
  path: "*",
  element: <NotFound />
}
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
      {
  path: "*",
  element: <NotFound />
}
    ],
  },
]);

const AppRoutes = () => {
  return <>
<Suspense fallback={<NotePilotLoader/>}>
 <RouterProvider router={router} />
</Suspense>
  
  
  </>  
};

export default AppRoutes;

