import React, { useState } from 'react'
// import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import {CAlert, CSpinner,CForm, CRow, CBadge, CCol, CButton, CModal, CModalHeader, CModalTitle, CModalFooter,CModalBody, CInputGroup, CInputGroupText, CFormInput, CFormSelect, CFormTextarea  } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
export const ModalQrCode = (props) => {

  const { isOpen, close, imagem, copia, valor, servico, agenda } = props
  const [visible, setVisible] = useState(false)
  const [showAlert,setShowAlert] = useState(false)
  const largura = {width:'120px',cursor:'pointer'}


  async function writeClipboardText() {
    var text = document.getElementById('idcopia').value;
    if (navigator.clipboard && window.isSecureContext) {
        var copyText = document.getElementById('idvalor');
        // Standard modern Clipboard API
        await navigator.clipboard.writeText(text);
    } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        // Prevent scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          setShowAlert(true)
          document.execCommand('copy');
          setTimeout(() => {
             setShowAlert(false)
          }, 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
  }

  return (
    <>
      <CModal
        visible={isOpen}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader className="cmodal_header">
          <CModalTitle id="LiveDemoExampleLabel">
            <FontAwesomeIcon size="1x" icon={faQrcode}/>&nbsp;
            Efetuar Pgto Pix
           </CModalTitle>
        </CModalHeader>
        <CModalBody>
             <CAlert color="info" visible={showAlert} variant="solid">
                  Link Copiado
            </CAlert>
            <CRow>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-1 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Nº Agenda</CInputGroupText>
                      <CFormInput style={{fontSize:'13px'}} id="idagenda" className="input-text" disabled aria-label="Username" value={agenda}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-1 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Serviço</CInputGroupText>
                      <CFormInput style={{fontSize:'13px'}} id="idvalor" className="input-text" disabled aria-label="Username" value={servico}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-1 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Valor Transação</CInputGroupText>
                      <CFormInput style={{fontSize:'13px'}} id="idvalor" className="input-text" disabled aria-label="Username" value={valor}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
           </CRow>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'200px'}}>
               <img src={imagem}/>
            </div>
            <CRow>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-3 nowrap">
                      <CInputGroupText onClick={(e)=>writeClipboardText(e)} className="inputwidth" style={largura} id="basic-addon1">Copia e Cola</CInputGroupText>
                      <CFormTextarea id="idcopia" style={{fontSize:'13px'}} className="input-text" rows={4} disabled aria-label="Username" value={copia}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
           </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => close()}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
