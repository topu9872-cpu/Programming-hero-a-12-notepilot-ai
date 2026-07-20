import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer.js';
import Navbar from '../components/layout/Navbar.js';

const MainLayout = () => {
  return (
    <>
    
      <main>
        <Navbar/>
        <Outlet />
      </main>
            <Footer />

    </>
  );
};

export default MainLayout;