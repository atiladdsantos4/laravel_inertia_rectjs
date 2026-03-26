import { React,useEffect, useState, Suspense } from 'react';
import { NavbarComp } from '../layouts/NavbarComp';
import { SidebarComp } from '../layouts/SidebarComp';
import { SpinnerComp } from '../components/SpinnerComp';
import SwiperComp from '../components/SwiperComp';
import SwiperComp1 from '../components/SwiperComp1';
import { SectionAbout } from '../sections/SectionAbout';
import { SectionOffers } from '../sections/SectionOffers';
import { SectionServices } from '../sections/SectionServices';
import { Carrosel } from '../components/Carrosel';
import { ButtonComp } from '../components/ButtonComp';
import { ButtonOutlineComp } from '../components/ButtonOutlineComp';
import { ButtonPillsComp } from '../components/ButtonPillsComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { CardComp } from '../components/CardComp';
import { Modal } from '../components/Modal';
import Aos from 'aos';


// The Home component receives props passed from the Laravel controller
const Home = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const [loadpage,setloadPage] = useState(false);
  const [open,setOpen] = useState(true);
  const [listaNavbar,setlistaNavbar] = useState([])
  const [dadosModal,setdadosModal] = useState({
     nome: "atila",
     price: "10,00",
     texto: "texto",
     detalhe:"texto"
  })

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
      duration: 800, // Animation duration (e.g., 1000ms)
      once: false, // Whether animation should only happen once (true) or every time it enters the view (false)
    });
  },[])

  const openModal= () =>{
     setOpen(true)
  }

  const closeModal= () =>{
     setOpen(false)
  }

  const setModalTexto= (nome, valor, texto, detalhe) =>{
     let dados = {
        nome:nome,
        price:valor,
        texto:texto,
        detalhe:detalhe
     }
     setdadosModal(dados)
  }

  return (
      <Suspense fallback={<SpinnerComp />}>
        <Modal
          isOpen={open}
          close={closeModal}
          dados={dadosModal}
        />
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
              classe="mt-5"
              openModal={openModal}
              setModal={setModalTexto}
              />
            <SectionServices
              title="King Hair"
              subtitle="Services"
              classe="mt-5  section-services"/>
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
