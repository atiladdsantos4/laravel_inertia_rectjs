import { React,useEffect } from 'react';
import { NavbarComp } from '../layouts/NavbarComp';
import { SidebarComp } from '../layouts/SidebarComp'; 


// The Home component receives props passed from the Laravel controller
const Home = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK  
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT  
  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
      <>
      <Navbar/>
      <Sidebar/>
      <div className="p-10">
        <h1 className="text-2xl font-bold">Welcome to {appName}</h1>
        <p className="mt-4">This is your main page built with Laravel, Inertia, and React.</p>
        <a href="/dashboard" className="text-blue-500 hover:underline mt-2 inline-block">Go to Dashboard</a>
      </div>
      </>
  );
};

export default Home