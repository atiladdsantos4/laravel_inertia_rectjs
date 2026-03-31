   import { React,useEffect, useState } from 'react';
   import { CContainer, CRow, CCol, CImage} from '@coreui/react';
   import "@fontsource/poppins";
   import Logo from '../images/Logo.png'
   import MediaIcons from '../images/MediaIcons.png'
   import Facebook from '../images/Facebook.png'
   import Instagran from '../images/Instagran.png'
   import Twitter from '../images/Twitter.png'
   import LinkedIn from '../images/LinkedIn.png'


export const Footer = (props) => {

  const id = "footer-id"
  const [classe,setClasse] = useState(null)

  useEffect(()=>{
    setClasse(props.classe)
  },[])

  return (
    <div className="aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
        <CContainer id="id" className={classe}>
        <CContainer>
            <CRow>
                <CCol className="col-md-6 col-12 pt-3 clmobile" >
                    <p className="plogo"><img src={Logo}/>
                    &nbsp;&nbsp;<span className="clspan">Copyright 2023 Haus Salon</span>
                    <div className="divfooter clgroupimage">
                        <img className="midia" src={Facebook}/>&nbsp;
                        <img className="midia" src={Instagran}/>&nbsp;
                        <img className="midia" src={Twitter}/>&nbsp;
                        <img className="midia" src={LinkedIn}/>
                    </div>
                    </p>
                </CCol>
            </CRow>
            <CRow className="exibe">
                <CCol className="col-md-2 col-12 pt-3" >
                    <p className="plogo"><img src={Logo}/></p>
                    <p className="plogo">Copyright 2023 Haus Salon</p>
                </CCol>
                <CCol className="col-md-2 col-12 pt-3 exibe" >
                <p className="plogo">Account</p>
                <p className="plogo">
                    <ul>
                        <li>Manage Account</li>
                        <li>Saved Items</li>
                        <li>Orders & Returns</li>
                        <li>Reedem a Gift card</li>
                    </ul>
                </p>
                </CCol>
                <CCol className="col-md-2 col-12 pt-3 exibe" >
                <p className="plogo">Company</p>
                <p className="plogo">
                    <ul>
                        <li>About</li>
                        <li>Environmental Initiatives</li>
                        <li>Careers</li>
                        <li>International</li>
                        <li>Accesibility</li>
                    </ul>
                </p>
                </CCol>
                <CCol className="col-md-2 col-12 pt-3 exibe" >
                <p className="plogo">Connect</p>
                <p className="plogo">
                    <ul>
                        <li>Contact & FAQ</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>Affiliates</li>
                        <li>Bulk Orders</li>
                    </ul>
                </p>
                </CCol>
                <CCol className="col-md-4 col-12 pt-5 clgroupimage" >
                    {/* <p className="plogo"> */}
                        <img className="midia" src={Facebook}/>&nbsp;
                        <img className="midia" src={Instagran}/>&nbsp;
                        <img className="midia" src={Twitter}/>&nbsp;
                        <img className="midia" src={LinkedIn}/>
                    {/* </p> */}
                </CCol>
            </CRow>
            </CContainer>
        </CContainer>
    </div>
  )
}
