import { React,useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage, CCollapse} from '@coreui/react';
import "@fontsource/poppins";
import img01 from '../images/ServicesImg1.png'
import img02 from '../images/ServicesImg2.png'
import img03 from '../images/ServicesImg3.png'
import Staff01 from '../images/Staff01.png'
import Staff02 from '../images/Staff02.png'
import Staff03 from '../images/Staff03.png'
import { CardStaffComp } from '../components/CardStaffComp';
import { ButtonComp } from '../components/ButtonComp';
import { faAnglesUp,faAnglesDown } from '@fortawesome/free-solid-svg-icons'


export const SectionStaff = (props) => {

   const id = "section-staff"
   const [title, setTitle] = useState(props.title)
   const [subtitle,setSubTitle] = useState(props.subtitle)
   const [classe,setClasse] = useState(null)


   useEffect(()=>{
      setClasse(props.classe)
   },[props])




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
                    <CardStaffComp
                        price="$30"
                        title="Mara Olsen"
                        subtitle="10 years of experience"
                        paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        buttonlabel="Book Basic"
                        imagem={Staff01}
                        />
                </CCol>
                <CCol md={4} xs={12} className="pb-4 px-5">
                    <CardStaffComp
                        price="$40"
                        title="Jess Nunez"
                        subtitle="8 years of experience"
                        paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        buttonlabel="Book Insider"
                        imagem={Staff02}
                        />
                </CCol>
                <CCol md={4} xs={12} className="pb-4 px-5">
                    <CardStaffComp
                        price="$70"
                        title="Jess Nunez"
                        subtitle="8 years of experience"
                        paragraph=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        buttonlabel="Book Influencer"
                        imagem={Staff03}
                        promocard={true}
                        />
                </CCol>
            </CRow>
        </CContainer>
        </section>
    </div>
   )
}
