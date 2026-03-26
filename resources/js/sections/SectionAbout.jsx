import { React,useEffect, useState, Suspense } from 'react';
import imgAbout from '../images/about.png'; 
import { RateComp } from '../components/RateComp';
import {
  CContainer,
  CRow,
  CCol,
  CImage
} from '@coreui/react'


export const SectionAbout = (props) => {

   const id = "section-about" 
   const [title, setTitle] = useState(props.title) 
   const [subtitle,subTitle] = useState(props.subtitle)

   return(
    <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
        <section id={id} className="mt-5">
            <CContainer className="ms-4">
                <h1 style={{fontSize:'1.5rem'}}>{title}</h1>
                <h4 style={{fontSize:'2.5rem'}}>{subtitle}</h4>
            </CContainer>
            <CContainer className="ms-2">
            <CRow>
                <CCol md="6" xs="12" className="pb-4">
                    <div data-aos="fade-right">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p> 
                        <div class="circle">
                            <div className="div-circle">
                                <h4>5.0 |
                                <div className="div-rate"><RateComp/></div> 
                                <div className="div-score">
                                   +4700 Reviews</div>
                                </h4>
                            </div>
                        </div>
                    </div>
                </CCol> 
                <CCol md="6" xs="12">
                    <div data-aos="fade-left">
                       <CImage style={{top:'-20px'}} fluid src={imgAbout} />
                    </div>
                </CCol> 
            </CRow>
            </CContainer>
        </section>
    </div>
   ) 
}