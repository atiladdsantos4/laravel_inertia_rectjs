import { React,useEffect, useState, Suspense } from 'react';
import { NavbarComp } from '../layouts/NavbarComp';
import { SidebarComp } from '../layouts/SidebarComp'; 
import { SpinnerComp } from '../components/SpinnerComp';
import SwiperComp from '../components/SwiperComp';
import SwiperComp1 from '../components/SwiperComp1';
import { SectionAbout } from '../sections/SectionAbout';
import { Carrosel } from '../components/Carrosel';
import Aos from 'aos';
//import { SpinnerComp } from '../components/SpinnerComp';


// The Home component receives props passed from the Laravel controller
const Home = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK  
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const [loadpage,setloadPage] = useState(false);
  const [listaNavbar,setlistaNavbar] = useState([])  

  let arrayNavbar =[{
        titulo:'My Salon',
        textoButon:'Agendamento',
        itens:[
            {name:'Home',href:'#'},
            {name:'Serviço',href:'#'},
            {name:'Contact',href:'#'},
            {name:'Home',href:'#'},
        ]
}]

  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
     setlistaNavbar(arrayNavbar)
     setloadPage(true) 
     Aos.init({
      // Optional configuration options
      duration: 1000, // Animation duration (e.g., 1000ms)
      once: true, // Whether animation should only happen once (true) or every time it enters the view (false)
    });
  },[])

  return (
      <Suspense fallback={<SpinnerComp />}>
        <NavbarComp dados={listaNavbar}/>
        <SwiperComp/>
        <div className="container">
            <SectionAbout title="Kings Hair" subtitle = "Sobre Nós"/>
            <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                <div className="p-10" style={{maxWidth: '1200px !important'}}>
                    <h1 className="text-2xl font-bold">Welcome to {appName}</h1>
                    <p className="mt-4">This is your main page built with Laravel, Inertia, and React.</p>
                    <a href="/dashboard" className="text-blue-500 hover:underline mt-2 inline-block">Go to Dashboard</a>
                </div>
            </div>
            <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
               <span>teste</span>    
            </div>
        </div>
      </Suspense>
     
  );
};

export default Home