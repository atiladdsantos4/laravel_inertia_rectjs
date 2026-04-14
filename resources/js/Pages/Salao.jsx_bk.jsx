import { React,useEffect, useState, Suspense } from 'react';


// import { useSelector, useDispatch } from 'react-redux'
// import { increment, decrement } from '../features/counter/counterSlice';

import { NavbarComp } from '../layouts/NavbarComp';
import { SidebarComp } from '../layouts/SidebarComp';
import { SpinnerComp } from '../components/SpinnerComp';
import SwiperComp from '../components/SwiperComp';
// import SwiperComp1 from '../components/SwiperComp1';
import { SectionAbout } from '../sections/SectionAbout';
import { SectionOffers } from '../sections/SectionOffers';
import { SectionServices } from '../sections/SectionServices';
import { SectionStaff } from '../sections/SectionStaff';
import { SectionTestimonial } from '../sections/SectionTestimonial';
import { SectionContact } from '../sections/SectionContact';
//import { SectionCarrosel } from '../components/SectionCarrosel';
import { SectionCarrosel } from '../sections/SectionCarrosel';
import { Footer } from '../layouts/Footer';
import { FloatButton } from '../components/FloatButton';
import { Carrosel } from '../components/Carrosel';
import { ButtonComp } from '../components/ButtonComp';
import { ButtonOutlineComp } from '../components/ButtonOutlineComp';
import { ButtonPillsComp } from '../components/ButtonPillsComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat,faCalendar } from '@fortawesome/free-solid-svg-icons'
import { CardComp } from '../components/CardComp';
import { Modal } from '../components/Modal';
import { ModalAvaliacao } from '../components/ModalAvaliacao';
import Aos from 'aos';
import axios from 'axios';
import { useStore } from '../store/useStore';
//import { socket } from '../socket';


// The Home component receives props passed from the Laravel controller
const Home = ({ appName }) => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  //global variable shared between
  const {
    carroselstore,
    removeAllcarrosel,
    aboutstore,
    removeAllabout,
    offerstore,
    removeAlloffer,
    servicesstore,
    removeAllservices,
    staffstore,
    removeAllstaff,
    testemunhostore,
    removeAlltestemunho,
  } = useStore();
  const [estadogeral,setEstadogeral] = useState(true)

  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const _token = import.meta.env.VITE_APP_TOKEN
  const [loadpage,setLoadpage] = useState(false);
  const [dadosabout,setDadosAbout] = useState([]);
  const [dadosoffer,setDadosOffer] = useState([]);
  const [dadosservice,setDadosService] = useState([]);
  const [dadoscarrosel,setDadosCarrosel] = useState([]);
  const [dadosstaff,setDadosStaff] = useState([]);
  const [dadostestemunho,setDadosTestemunho] = useState([]);
  const [sectestemunho,setSectestemunho] = useState([]);
  const [listatestemunho,setListaTestemunho] = useState([]);
  const [open,setOpen] = useState(false);
  const [listaNavbar,setlistaNavbar] = useState([])
  const [openAvaliacao,setOpenAvaliacao] = useState(false)
  /*
  isOpen={openAvaliacao}
            close={closeModalAvaliacao}
  */
  const [dadosModal,setdadosModal] = useState({
     nome: "atila",
     price: "10,00",
     texto: "texto",
     detalhe:"texto"
  })

  let arrayNavbar =[{
        titulo:'My Salon',
        textoButon:'Agendamento',
        icon: faCalendar,
        itens:[
            {name:'Home',href:'#section-about'},
            {name:'Serviço',href:'#section-services'},
            {name:'Portifolio',href:'#section-staff'},
            {name:'Contato',href:'#section-contact'},
        ]
}]

  useEffect(() => {
    /*socket*/
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }
    /*socket*/
     axios
      .get(`${endpoint}/section?listagem=S`, {
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
             if( item.sec_nome === 'SectionAbout'){
                setDadosAbout(item.sec_itens)
             }

             if( item.sec_nome === 'SectionOffer'){
                setDadosOffer(item.sec_itens)
             }

             if( item.sec_nome === 'SectionServices'){
                setDadosService(item.sec_itens)
             }

             if( item.sec_nome === 'SectionCarrosel'){
                setDadosCarrosel(item.sec_itens)
             }

             if( item.sec_nome === 'SectionStaff' ){
                setDadosStaff(item.sec_itens)
             }
             if( item.sec_nome === 'SectionTestemunho' ){
                setSectestemunho(item.sec_id_sec)
                setDadosTestemunho(item.sec_itens)
                setListaTestemunho(item.sec_testemunhos)
             }


             //
             console.log('useEffect')
             console.log(item)
             removeAllcarrosel()
             removeAlloffer()
             removeAllservices()
             removeAllstaff()
             removeAllabout()
             removeAlltestemunho()
         })
    })
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
     setlistaNavbar(arrayNavbar)
     Aos.init({
      // Optional configuration options
      duration: 800, // Animation duration (e.g., 1000ms)
      once: false, // Whether animation should only happen once (true) or every time it enters the view (false)
    });
    /* socket */
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  },[])

  const estadoGeral = () =>{
     return estadogeral
  }


  const openModal= () =>{
     setOpen(true)
  }

  const closeModal= () =>{
     setOpen(false)
  }

  const closeModalAvaliacao = () =>{
     setOpenAvaliacao(false)
  }

  const openModalAvaliacao = () =>{
     setOpenAvaliacao(true)
  }


  const setModalTexto= (nome, valor, texto, detalhe, tela) =>{
     let dados = {
        nome:nome,
        price:valor,
        texto:texto,
        detalhe:detalhe,
        screen:tela
     }
     setdadosModal(dados)
  }

  const ConnectionState = ({ isConnected }) => {
     return <p>State: { '' + isConnected }</p>;
  }

  const Events = ({ events  }) => {
    console.log(events)
    return(
        <>
        <div>eventos</div>
        <ul>
        {
            events.map((event, index) =>
                <li key={ index }>{ event }</li>
            )
        }
        </ul>
        </>
    )
  }

  const ConnectionManager = () => {
        function connect() {
            socket.connect();
            console.log('conected')
        }

        function disconnect() {
            socket.disconnect();
            console.log('disconnect')
        }

        return (
            <>
            <button className="btn btn-primary" onClick={ connect }>Connect</button><br></br>
            <button className="btn btn-seconadary" onClick={ disconnect }>Disconnect</button>
            </>
        );
  }

  const  MyForm = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('create-something', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}
  return (
      <Suspense fallback={<SpinnerComp />}>
            {/* <div className="App">
               <ConnectionState isConnected={ isConnected } />
               <Events events={ fooEvents } />
               <ConnectionManager />
               <MyForm />
           </div> */}
            <Modal
            isOpen={open}
            close={closeModal}
            dados={dadosModal}
            />

            <ModalAvaliacao
               isOpen={openAvaliacao}
               close={closeModalAvaliacao}
               dados={dadosModal}
               token={_token}
               section={sectestemunho}
            />


            <div className="container">
                <span>{'carosselstore: '+carroselstore}</span>
                <NavbarComp dados={listaNavbar}/>
                <SectionCarrosel dados={dadoscarrosel} token={_token}/>
                <SectionAbout
                    title="Kings Hair"
                    subtitle = "Sobre Nós"
                    dados={dadosabout}
                    token={_token}
                    open={openModalAvaliacao}
                />
                <SectionOffers
                    title="King Hair"
                    subtitle="Summer Hair Haus Offers"
                    classe="mt-5"
                    openModal={openModal}
                    setModal={setModalTexto}
                    dados={dadosoffer}
                    token={_token}
                />
                <SectionServices
                    title="King Hair"
                    subtitle="Services"
                    classe="mt-5  section-services"
                    openModal={openModal}
                    setModal={setModalTexto}
                    dados={dadosservice}
                    token={_token}
                />
                <SectionStaff
                    title="Huis Salon"
                    subtitle="Meet With Our Professional Staff"
                    classe="mt-5 section-staff"
                    openModal={openModal}
                    setModal={setModalTexto}
                    dados={dadosstaff}
                    token={_token}
                />
                <SectionTestimonial
                    title="Testemonial"
                    subtitle="Take a look about our customers feedback"
                    classe="clcontainer section-testemonial"
                    paragraph="It is a long established fact that a reader will be tracked distracted by the readable content of a page is when looking at its layout. The point of using Lorem of distribution it look like readable English"
                    author="Samantha Wilian"
                    dados={dadostestemunho}
                    testemunhos={listatestemunho}
                    token={_token}
                />
                <SectionContact
                    title="Contact"
                    subtitle="Contact US"
                    titletext="Subscribe to the Haus Newsletter"
                    paragraph="Join our newsletter and get the insider scoop on events, products, and special offers"
                    author="Samantha Wilian"
                    classe="section-contact clcontact"
                />
                <Footer
                    classe="footer-id clfooter"
                />
                <FloatButton/>
            </div>
      </Suspense>

  );
};

export default Home
