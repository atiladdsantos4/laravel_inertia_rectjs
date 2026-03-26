import { React,useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage} from '@coreui/react';
import "@fontsource/poppins";
import { CardComp } from '../components/CardComp';

export const SectionOffers = (props) => {

   const id = "section-price"
   const [title, setTitle] = useState(props.title)
   const [subtitle,setSubTitle] = useState(props.subtitle)
   const [classe,setClasse] = useState(props.classe)





   return(
    <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
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
                        />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$40"
                        title="Hauis Insider"
                        subtitle="Includes all the services for the previous tier +"
                        buttonlabel="Book Insider"
                        />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$70"
                        title="Hauis Influencer"
                        subtitle="Includes all the services for the 2 previous tiers +"
                        buttonlabel="Book Influencer"
                        promocard={true}
                        />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$100"
                        title="Hauis VIP"
                        subtitle="Includes all the services for the 3 previous tiers +"
                        buttonlabel="Book VIP"
                        />
                </CCol>
            </CRow>
            </CContainer>
        </section>
    </div>
   )
}
