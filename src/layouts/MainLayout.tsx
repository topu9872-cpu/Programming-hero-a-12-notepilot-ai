import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Navbar from '../components/layout/Navbar';

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