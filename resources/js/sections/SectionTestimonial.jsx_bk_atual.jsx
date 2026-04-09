import { React,useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage, CCollapse} from '@coreui/react';
import { SectionAbout } from './SectionAbout';
import Avatar2 from '../images/Ellipse21.png'
import Avatar3 from '../images/Ellipse3.png'
import Avatar4 from '../images/Ellipse4.png'
import Avatar5 from '../images/Ellipse5.png'
import Avatar6 from '../images/Ellipse6.png'
import Avatar7 from '../images/avatar/avatar_homem.png'

export const SectionTestimonial = (props) => {

  const id = "section-testemonial"
  const [title, setTitle] = useState(props.title)
  const [subtitle,setSubTitle] = useState(props.subtitle)
  const [classe,setClasse] = useState(null)
  const [paragraph,setParagraph] = useState(null)
  const [author,setAuthor ] = useState(null)

  useEffect(()=>{
    setClasse(props.classe)
    setParagraph(props.paragraph)
    setAuthor(props.author)
  },[])


  return(
     <div class="aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
        <section id={id} className={classe}>
            <CContainer class="ms-4 pb-5 pt-2">
                <h4>{title}</h4>
                <h1>{subtitle}</h1>
            </CContainer>
        <CContainer class="d-flex justify-content-center align-items-center">
            <CRow>
                <CCol md={2} xs="2"></CCol>
                <CCol md={8} xs={8}>
                    <p>"{paragraph}"</p>
                    <p class="pauthor">{author}</p>
                </CCol>
                <CCol md={2} xs={2}></CCol>
            </CRow>
        </CContainer>
        <CContainer class="d-flex justify-content-center align-items-center pt-5 pb-5">
        <CRow>
           <CCol md={1} xs={12}></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar2}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar3}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar4}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar5}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar6}/></CCol>
           <CCol md={1} xs={12}></CCol>
        </CRow>
        <cRow>
             <CCol md={12} xs="12">
                <div className="clavatar" style={{backgroundPosition:'center',backgroundSize:'cover',backgroundImage:`url(${Avatar7})`}}></div>
             </CCol>
        </cRow>
    </CContainer>
        </section>
     </div>
  )
}

