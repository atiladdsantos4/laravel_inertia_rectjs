import { React,useEffect, useState, Suspense } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { NavbarCompAdmin } from '../layouts/NavbarCompAdmin';
import { SpinnerComp } from '../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat, faCalendar,faGear } from '@fortawesome/free-solid-svg-icons'
import SwiperComp from '../components/SwiperComp';
import { Footer } from '../layouts/Footer';
import { SectionAbout } from '../sections/SectionAbout';
import { SectionOffers } from '../sections/SectionOffers';
import { SectionServices } from '../sections/SectionServices';
import ManAbout from './Manutencao/ManAbout';
import ManOffers from './Manutencao/ManOffers';
import ManServices from './Manutencao/ManServices';
import ManCarrosel from './Manutencao/ManCarrosel';
import ManStaff from './Manutencao/ManStaff';
import ManTestemunhos from './Manutencao/ManTestemunhos';
import axios from 'axios'
import Aos from 'aos';


const Admin = (props) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const endpoint = import.meta.env.VITE_APP_ENDPOINT
  const endpointapi = import.meta.env.VITE_APP_ENDPOINT_API
  const _token = import.meta.env.VITE_APP_TOKEN
  console.log(_token)
  const [listaNavbar,setlistaNavbar] = useState([])
  const [loadpage,setLoadpage] = useState(false);
  const [estado,setEstado] = useState(false);
  const [telaatual,setTelaatual] = useState(null);
  const [listasections,setListasections] = useState([]);
  const [listatipos,setListatipos] = useState([]);
  const [listatags,setListatags] = useState([]);
  let arrayNavbar =[{
           titulo:'My Salon (Admin)',
           textoButon:'Agendamento',
           icon: faCalendar,
           itens:[
               {name:'ManCarrosel',href:'#'},
               {name:'ManAbout',href:'#'},
               {name:'ManOffers',href:'#'},
               {name:'ManServices',href:'#'},
               {name:'ManStaffs',href:'#'},
               {name:'ManTestemunhos',href:'#'},
           ]
  }]

  useEffect(() => {
    Aos.init({
      // Optional configuration options
      duration: 800, // Animation duration (e.g., 1000ms)
      once: false, // Whether animation should only happen once (true) or every time it enters the view (false)
    });
    document.documentElement.setAttribute('data-coreui-theme', theme_light);
    setLoadpage(true)
    axios
      .get(`${endpoint}/empresa/index?init_man=S`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + _token,//dentro do env//
        },
      })
      .then((result) => {
        setLoadpage(false)
        //setidSection(result.data.data.sec_id_sec)
         result.data.data.map((item, index) => {
           setListasections(item.emp_sections)
           setListatipos(item.emp_tipos)
           setListatags(item.emp_tags)
           console.log('useEffect')
           console.log('item:' + item)
         })
      })
      setlistaNavbar(arrayNavbar)
      //setloadPage(true)
  },[props])


  const ExibeLayout = (props) => {
    let dados = null
    let array = null
    switch( props.tela) {

      case "Carrosel":
        return(<SwiperComp/>)
       break

      case "About":
        return(<SectionAbout title="Kings Hair" subtitle = "Sobre Nós"/>)
       break

      case "ManAbout":
        //array = listasections.filter((item)=> item.sec_nome === 'SectionNews')
        array = listasections.filter((item)=> item.sec_nome === 'SectionAbout')
        return(<ManAbout end={endpointapi} tipos={listatipos} tags={listatags} dados_section={array[0]} token={_token} icon={faGear} title="Kings Hair" subtitle = "Sobre Nós"/>)
       break

      case "ManOffers":
        //array = listasections.filter((item)=> item.sec_nome === 'SectionNews')
        array = listasections.filter((item)=> item.sec_nome === 'SectionOffer')
        return(<ManOffers end={endpointapi} tipos={listatipos} tags={listatags} dados_section={array[0]} token={_token} icon={faGear} title="Kings Hair" subtitle = "Sobre Nós"/>)
       break

      case "ManServices":
        //array = listasections.filter((item)=> item.sec_nome === 'SectionNews')
        array = listasections.filter((item)=> item.sec_nome === 'SectionServices')
        return(<ManServices end={endpointapi} tipos={listatipos} tags={listatags} dados_section={array[0]} token={_token} icon={faGear} title="Kings Hair" subtitle = "Sobre Nós"/>)
       break

      case "ManCarrosel":
        //array = listasections.filter((item)=> item.sec_nome === 'SectionNews')
        array = listasections.filter((item)=> item.sec_nome === 'SectionCarrosel')
        return(<ManCarrosel end={endpointapi} tipos={listatipos} tags={listatags} dados_section={array[0]} token={_token} icon={faGear} title="Kings Hair" subtitle = "Sobre Nós"/>)
       break

      case "ManStaffs":
        //array = listasections.filter((item)=> item.sec_nome === 'SectionNews')
        array = listasections.filter((item)=> item.sec_nome === 'SectionStaff')
        return(<ManStaff end={endpointapi} tipos={listatipos} tags={listatags} dados_section={array[0]} token={_token} icon={faGear} title="Kings Hair" subtitle = "Sobre Nós"/>)
       break

      case "ManTestemunhos":
        //array = listasections.filter((item)=> item.sec_nome === 'SectionNews')
        array = listasections.filter((item)=> item.sec_nome === 'SectionTestemunho')
        return(<ManTestemunhos end={endpointapi} tipos={listatipos} tags={listatags} dados_section={array[0]} token={_token} icon={faGear} title="Kings Hair" subtitle = "Sobre Nós"/>)
       break
    }

  }

  const Layout = (valor) =>{
     ExibeLayout(valor)
  }


  return(
       <Suspense fallback={<SpinnerComp />}>
          <div className="container">
              <NavbarCompAdmin tela={setTelaatual} dados={listaNavbar}/>
              <ExibeLayout tela={telaatual}/>
              <Footer classe="footer-id clfooter" />
           </div>
        </Suspense>
  )
}

export default Admin
