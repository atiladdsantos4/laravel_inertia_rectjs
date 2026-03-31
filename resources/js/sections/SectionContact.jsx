import { React,useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage, CCollapse} from '@coreui/react';
import { SectionAbout } from './SectionAbout';
import { ButtonComp } from '../components/ButtonComp';

export const SectionContact = (props) => {

  const id = "section-contact"
  const [title, setTitle] = useState(props.title)
  const [subtitle,setSubTitle] = useState(props.subtitle)
  const [classe,setClasse] = useState(null)
  const [paragraph,setParagraph] = useState(null)
  const [titletext,setTitletext ] = useState(null)

  useEffect(()=>{
    setClasse(props.classe)
    setParagraph(props.paragraph)
    setTitletext(props.titletext)
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
                    <CCol md={12} xs={12}>
                        <p className="ptitletext">{titletext}</p>
                        <p className="pauthor">{paragraph}</p>
                    </CCol>
                </CRow>
            </CContainer>
        <CContainer class="d-flex justify-content-center align-items-center pt-5 pb-5">
            <CRow>
                <CCol md={6} xs={6}>
                    <input className="form-control" size="50" type="text" />
                </CCol>
                <CCol md={6} xs={6}>
                    <ButtonComp className="Subscribe" color="dark" label="Subscribe"/>
                </CCol>
            </CRow>
        </CContainer>
        </section>
     </div>
  )
}

