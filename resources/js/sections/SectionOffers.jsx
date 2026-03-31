import { React,useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage} from '@coreui/react';
import "@fontsource/poppins";
import { CardComp } from '../components/CardComp';

export const SectionOffers = (props) => {

   const {setModal, openModal} = props
   const id = "section-price"
   const [title, setTitle] = useState(props.title)
   const [subtitle,setSubTitle] = useState(props.subtitle)
   const [classe,setClasse] = useState(props.classe)

   const changeCard = (event,nome,valor,texto,detalhe,tela) =>{
      setModal(nome, valor, texto, detalhe, tela)
   }



   return(
    <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
        <section id={id} className={classe}>
            <CContainer className="ms-4">
                <h4>{title}</h4>
                <h1>{subtitle}</h1>
            </CContainer>
            <CContainer className="ms-2">
            <CRow>
                <CCol md={12} xs={12} className="pb-4">
                    <p>We believe great hair should be accessible to everyone, no matter the budget.</p>
                </CCol>
            </CRow>
            </CContainer>
            <CContainer>
            <CRow>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$30"
                        title="Hauis Basic"
                        subtitle="Includes the following services:"
                        buttonlabel="Book Basic"
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis Basic','$30','Includes the following services','Book Basic','offers')}
                    />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$40"
                        title="Hauis Insider"
                        subtitle="Includes all the services for the previous tier +"
                        buttonlabel="Book Insider"
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis Insider','$40','Includes all the services for the previous tier +','Book Insider','offers')}
                        />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$70"
                        title="Hauis Influencer"
                        subtitle="Includes all the services for the 2 previous tiers +"
                        buttonlabel="Book Influencer"
                        promocard={true}
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis Influencer','$70','Includes all the services for the 2 previous tiers +','Book Influencer','offers')}
                        />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$100"
                        title="Hauis VIP"
                        subtitle="Includes all the services for the 3 previous tiers +"
                        buttonlabel="Book VIP"
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis VIP','$100','Includes all the services for the 3 previous tiers +','Book VIP','offers')}
                        />
                </CCol>
            </CRow>
            </CContainer>
        </section>
    </div>
   )
}
