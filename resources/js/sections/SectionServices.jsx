import { React,useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage, CCollapse} from '@coreui/react';
import "@fontsource/poppins";
import img01 from '../images/ServicesImg1.png'
import img02 from '../images/ServicesImg2.png'
import img03 from '../images/ServicesImg3.png'
import { CardComp } from '../components/CardComp';
import { CardServiceComp } from '../components/CardServiceComp';
import { ButtonComp } from '../components/ButtonComp';
import { faAnglesUp,faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import { useStore } from '../store/useStore';



export const SectionServices = (props) => {

   const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
   const imgpath = import.meta.env.VITE_APP_ENDPOINT_IMG

   //global variable shared between
   const { servicesstore } = useStore();

   const {setModal, openModal, dados, token} = props
   const id = "section-services"
   const [load, setLoad] = useState(false)
   const [titulo, setTitulo] = useState(null)
   const [subtitulo, setSubtitulo] = useState(null)
   const [listacard,setListacard] = useState([])
   const [vermais,setVermais] = useState(false)
   const [listacardmais,setListacardmais] = useState([])
   const [title, setTitle] = useState(props.title)
   const [subtitle,setSubTitle] = useState(props.subtitle)
   const [classe,setClasse] = useState(null)
   const [viewAll,setviewAll] =  useState(false)
   const [icone,setIcone] =  useState(faAnglesDown)

   useEffect(()=>{
        if( servicesstore == 0 ){
            setClasse(props.classe)
            let string =  null
            dados.map((item,index)=>{
                switch(item.sei_nome){
                    case "titulo":
                        setTitulo(item.sei_valor)
                        break
                    case "sub-titulo":
                        setSubtitulo(item.sei_valor)
                        break
                    case "cardsection":
                        string =  JSON.parse(item.sei_json)
                        console.log(string)
                        if(string.meta.length > 3){
                            setVermais(true)
                            let slice_array_card = string.meta.slice(0,3)
                            let slice_array_mais = string.meta.slice(3,string.meta.length)
                            setListacard(slice_array_card)
                            setListacardmais(slice_array_mais)
                        } else {
                            let slice_array_card = string.meta.slice(0,3)
                            setListacard(slice_array_card)
                            //setListacard(string.meta)
                        }
                        //setListacard(string.meta)
                        //let img1 = imgpath + string.meta[0].path + item.sei_valor
                        //setImgabout1(img1)
                        break
                }
            })
        } else {
          axios
            .get(`${endpoint}/section/3?section_man=S`, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                let string =  null
                result.data.data.sec_itens.map((item, index) => {
                    switch(item.sei_nome){
                        case "titulo":
                            setTitulo(item.sei_valor)
                            break
                        case "sub-titulo":
                            setSubtitulo(item.sei_valor)
                            break
                        case "cardsection":
                            string =  JSON.parse(item.sei_json)
                            console.log(string)
                            if(string.meta.length > 3){
                                setVermais(true)
                                let slice_array_card = string.meta.slice(0,3)
                                let slice_array_mais = string.meta.slice(3,string.meta.length)
                                setListacard(slice_array_card)
                                setListacardmais(slice_array_mais)
                            } else {
                                let slice_array_card = string.meta.slice(0,3)
                                setListacard(slice_array_card)
                                //setListacard(string.meta)
                            }
                            //setListacard(string.meta)
                            //let img1 = imgpath + string.meta[0].path + item.sei_valor
                            //setImgabout1(img1)
                            break
                    }
                })
            })
        }
   },[props,servicesstore])

   const handleViewAll = () =>{
     setviewAll(!viewAll)
     let icon = viewAll == false ? faAnglesUp : faAnglesDown
     setIcone(icon)
   }

   const changeCard = (event,nome,valor,texto,detalhe,tela) =>{
      setModal(nome, valor, texto, detalhe,tela)
   }



   return(
    <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
        <section id={id} className={classe}>
            <CContainer className="ms-4">
                <h4>{titulo}</h4>
                <h1>{subtitulo}</h1>
            </CContainer>
            <CContainer class="d-flex justify-content-center align-items-center">
            <CRow>
                {
                   listacard.map((item,index)=>{
                     return(
                       <CCol md={4} xs={12} className="pb-4 px-5">
                            <CardServiceComp
                                price={item.preco}
                                title={item.titulo}
                                //subtitle="Includes the following services:"
                                paragraph={item.texto}
                                buttonlabel={item.textobotao}
                                openModal={openModal}
                                imagem={imgpath + item.path + '/' + item.imagem}
                                setModal={ (e) => changeCard(e,item.titulo,item.preco,null,null,'services')}
                            />
                       </CCol>
                     )
                   })
                }
                {/* <CCol md={4} xs={12} className="pb-4 px-5">
                    <CardServiceComp
                        price="$30"
                        title="Hauis Basic"
                        subtitle="Includes the following services:"
                        paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        buttonlabel="Book Basic"
                        openModal={openModal}
                        imagem={img01}
                        setModal={ (e) => changeCard(e,'Hauis Basic','$100','Includes all the services for the 3 previous tiers +','Book VIP','services')}
                        />
                </CCol>
                <CCol md={4} xs={12} className="pb-4 px-5">
                    <CardServiceComp
                        price="$40"
                        title="Hauis Insider"
                        subtitle="Includes all the services for the previous tier +"
                        paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        buttonlabel="Book Insider"
                        openModal={openModal}
                        imagem={img02}
                        setModal={ (e) => changeCard(e,'Hauis Insider','$100','Includes all the services for the 3 previous tiers +','Book VIP','services')}
                        />
                </CCol>
                <CCol md={4} xs={12} className="pb-4 px-5">
                    <CardServiceComp
                        price="$70"
                        title="Hauis Influencer"
                        subtitle="Includes all the services for the 2 previous tiers +"
                        paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        buttonlabel="Book Influencer"
                        imagem={img03}
                        openModal={openModal}
                        promocard={true}
                        setModal={ (e) => changeCard(e,'Hauis Influencer','$100','Includes all the services for the 3 previous tiers +','Book VIP','services')}
                        />
                </CCol> */}
            </CRow>
            </CContainer>
            { vermais ? (<>
                <CContainer class="d-flex justify-content-center align-items-center">
                <CCollapse visible={viewAll}>
                    <CRow>
                        {
                            listacardmais.map((item,index)=>{
                                return(
                                <CCol md={4} xs={12} className="pb-4 px-5">
                                        <CardServiceComp
                                            price={item.preco}
                                            title={item.titulo}
                                            //subtitle="Includes the following services:"
                                            paragraph={item.texto}
                                            buttonlabel={item.textobotao}
                                            openModal={openModal}
                                            imagem={imgpath + item.path + '/' + item.imagem}
                                            setModal={ (e) => changeCard(e,item.titulo,item.preco,null,null,'services')}
                                        />
                                </CCol>
                                )
                            })
                        }
                            {/* <CCol md={4} xs={12} className="pb-4 px-5">
                                <CardServiceComp
                                    price="$30"
                                    title="Hauis Master"
                                    subtitle="Includes the following services:"
                                    paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                                    buttonlabel="Book Basic"
                                    openModal={openModal}
                                    imagem={img01}
                                    setModal={ (e) => changeCard(e,'Hauis Master','$100','Includes all the services for the 3 previous tiers +','Book VIP','services')}
                                    />
                            </CCol>
                            <CCol md={4} xs={12} className="pb-4 px-5">
                                <CardServiceComp
                                    price="$40"
                                    title="Hauis Touch"
                                    subtitle="Includes all the services for the previous tier +"
                                    paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                                    buttonlabel="Book Insider"
                                    openModal={openModal}
                                    imagem={img02}
                                    setModal={ (e) => changeCard(e,'Hauis Touch','$100','Includes all the services for the 3 previous tiers +','Book VIP','services')}
                                    />
                            </CCol>
                            <CCol md={4} xs={12} className="pb-4 px-5">
                                <CardServiceComp
                                    price="$70"
                                    title="Hauis Influencer"
                                    subtitle="Includes all the services for the 2 previous tiers +"
                                    paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                                    buttonlabel="Book Influencer"
                                    imagem={img03}
                                    openModal={openModal}
                                    promocard={true}
                                    setModal={ (e) => changeCard(e,'Hauis Influencer','$100','Includes all the services for the 3 previous tiers +','Book VIP','services')}
                                    />
                            </CCol> */}
                        </CRow>
                </CCollapse>
                </CContainer>
                <CContainer class="pt-4 d-flex justify-content-center align-items-center pb-4">
                <ButtonComp
                    label="Ver Todos Serviços"
                    style={{width:'190px'}}
                    color="dark"
                    click={handleViewAll}
                    icon={icone}
                />
                </CContainer>
                </>) : (<></>)
            }
        </section>
    </div>
   )
}
