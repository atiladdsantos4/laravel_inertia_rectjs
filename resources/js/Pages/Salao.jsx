import { React,useEffect, useState, Suspense } from 'react';
import { NavbarComp } from '../layouts/NavbarComp';
import { SidebarComp } from '../layouts/SidebarComp';
import { SpinnerComp } from '../components/SpinnerComp';
import SwiperComp from '../components/SwiperComp';
import SwiperComp1 from '../components/SwiperComp1';
import { SectionAbout } from '../sections/SectionAbout';
import { SectionOffers } from '../sections/SectionOffers';
import { Carrosel } from '../components/Carrosel';
import { ButtonComp } from '../components/ButtonComp';
import { ButtonOutlineComp } from '../components/ButtonOutlineComp';
import { ButtonPillsComp } from '../components/ButtonPillsComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { CardComp } from '../components/CardComp';
import Aos from 'aos';


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
        {/* <ButtonComp label="primary" color="primary" icon={faHeartbeat}/>
        <ButtonOutlineComp label="primary" color="success" icon={faHeartbeat}/>
        <ButtonPillsComp label="primary" color="success" classe="rounded-pill" icon={faHeartbeat}/> */}
        <div className="container">
            <SectionAbout title="Kings Hair" subtitle = "Sobre Nós"/>
            <SectionOffers
              title="King Hair"
              subtitle="Summer Hair Haus Offers"
              classe="mt-5"/>
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
