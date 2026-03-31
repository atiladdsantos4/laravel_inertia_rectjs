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


export const SectionServices = (props) => {

   const {setModal, openModal} = props
   const id = "section-services"
   const [title, setTitle] = useState(props.title)
   const [subtitle,setSubTitle] = useState(props.subtitle)
   const [classe,setClasse] = useState(null)
   const [viewAll,setviewAll] =  useState(false)
   const [icone,setIcone] =  useState(faAnglesDown)


   useEffect(()=>{
      setClasse(props.classe)
   },[props])

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
                <h4>{title}</h4>
                <h1>{subtitle}</h1>
            </CContainer>
            <CContainer class="d-flex justify-content-center align-items-center">
            <CRow>
                <CCol md={4} xs={12} className="pb-4 px-5">
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
                </CCol>
            </CRow>
            </CContainer>
            <CContainer class="d-flex justify-content-center align-items-center">
               <CCollapse visible={viewAll}>
                   <CRow>
                        <CCol md={4} xs={12} className="pb-4 px-5">
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
                        </CCol>
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
        </section>
    </div>
   )
}
