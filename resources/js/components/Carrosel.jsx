import React from 'react'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import slide1 from '../images/header1.png'; 
import slide2 from '../images/header2.png'; 
import slide3 from '../images/header3.png'; 
import slide4 from '../images/header4.png'; 



export const Carrosel = () => {
  //const style={width:'30% !important'}
  
  return (
    <CCarousel controls indicators interval="2500" >
      <CCarouselItem>
        <CImage className="d-block w-50" src={slide1} alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-50" src={slide2} alt="slide 2" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-50" src={slide3} alt="slide 3" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-50" src={slide4} alt="slide 3" />
      </CCarouselItem>
    </CCarousel>
  )
}