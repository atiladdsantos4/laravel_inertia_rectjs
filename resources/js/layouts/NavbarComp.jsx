import React, { useState, useEffect } from 'react'
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from '@coreui/react'

export const NavbarComp = (props) => {
  const { dados }  = props
  const [visible, setVisible] = useState(false)
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if( dados.lenght !== 0 ) {
        setLoad(false) 
        console.log(dados) 
    }
  },[props])

  return (
    load ? (<></>) :
    (
      <CNavbar expand="lg" className="bg-body-tertiary">
        <CContainer fluid>
          <CNavbarBrand href="#">{dados[0].titulo}</CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className="navbar-nav ms-auto">
               {
                dados[0].itens.map((item,index)=>{
                  return(
                    <CNavItem key={index}>
                       <CNavLink href={item.href} active>
                       {item.name}
                       </CNavLink>
                    </CNavItem>      
                  )  
                })
               } 
              {/* <CNavItem>
                <CNavLink href="#" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Features</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Pricing</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" disabled>
                  Disabled
                </CNavLink>
              </CNavItem> */}
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
  ))
}