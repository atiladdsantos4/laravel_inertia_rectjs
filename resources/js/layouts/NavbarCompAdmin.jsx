import React, { useState, useEffect, memo  } from 'react'
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  CDropdown, CDropdownHeader, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider
} from '@coreui/react'
//import { ButtonLinkComp } from '../components/ButtonLinkComp'



export const NavbarCompAdmin = memo(( props ) => {
  const { dados,tela }  = props
  const [visible, setVisible] = useState(false)
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if( dados.lenght !== 0 ) {
        setLoad(false)
        console.log(dados)
    }
  },[props])

  const handleClick = (event,valor) =>{
     event.preventDefault();
     console.log('teste')
     tela(valor)
  }

  const DropDown = () =>{
    return(
        <CDropdown variant="btn-group">
            <CDropdownToggle size="sm" style={{borderRadius:'5px 5px 5px 5px'}} className="clinputtext" color={'secondary'}>Outras Opções</CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem href="#">Action</CDropdownItem>
                <CDropdownItem href="#">Another action</CDropdownItem>
                <CDropdownItem href="#">Something else here</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">Separated link</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
  }

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
               <DropDown/>
               {
                dados[0].itens.map((item,index)=>{
                  return(
                    <CNavItem key={index}>
                       <CNavLink href={item.href} onClick={(e)=>handleClick(e,item.name)} active>
                       {item.name}
                       </CNavLink>
                    </CNavItem>
                  )
                })
               }
            {/* <CNavItem>
               <ButtonLinkComp label="Agendamento" href="#section-services" color="dark" type="button" icon={dados[0].icon}/>
            </CNavItem> */}

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
})
