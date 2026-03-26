import {CForm, CRow, CBadge, CCol, CButton, CModal, CModalHeader, CModalTitle, CModalFooter,CModalBody, CInputGroup, CInputGroupText, CFormInput  } from '@coreui/react';
import { ButtonComp } from './ButtonComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { IMaskInput, IMaskMixin } from 'react-imask'
//<FontAwesomeIcon size="2x" style={{ color: '#229741' }} icon={faHeartbeat} />


export const Modal = (props) =>{

   const { isOpen, close, dados } = props
   const [nome,setNome] = useState(null)
   const [cpf,setCpf] = useState(null)
   const [telefone,setTelefone] = useState(null)
   const [horario,setHorario] = useState(null)

   const handleSubmitCustom01 = (event) => {
     const form = event.currentTarget
     let erro =  false
     if (form.checkValidity() === false) {
        console.log('erro')
        erro =  true
        event.preventDefault()
        event.stopPropagation()
     }
     event.preventDefault()
     if(erro){
        return
     }

    //altera(props.datacard.texto,props.datacard.price,horario);
    //emit('open-qrcode');
  }


   const handleClose = () =>{
      close()
   }

   const InputMaskCPF = () => {
    const CFormInputCpf = IMaskMixin(({ inputRef, ...props }) => (
        <CFormInput {...props} ref={inputRef} />
    ))
    return (
        <CFormInputCpf
            mask="000.000.000-00"
            placeholder="Cnpj da Pessoa"
            className="input-text"
            //onAccept={handleAccept}
            onComplete={(completedValue) => setCpf(completedValue)}
            defaultValue={cpf}
        />
     )
  }

  const InputMaskTelefone = () => {
    const CFormInputCpf = IMaskMixin(({ inputRef, ...props }) => (
        <CFormInput {...props} ref={inputRef} />
    ))
    return (
        <CFormInputCpf
            mask="(00) 00000-0000"
            placeholder="Informe seu Telefone"
            className="input-text"
            //onAccept={handleAccept}
            onComplete={(completedValue) => setTelefone(completedValue)}
            defaultValue={telefone}
        />
     )
  }

   return(
      <CModal
        visible={isOpen}
        aria-labelledby="LiveDemoExampleLabel"
        onClose={() => handleClose()}
        backdrop="static"
        alignment="center"
        id="modal-combo"
        //style={{zIndex:'10000'}}
      >
        <CModalHeader className="cmodal_header">
          <CModalTitle id="VerticallyCenteredExample">
             <FontAwesomeIcon size="1x" icon={faCalendar}/>&nbsp;
             {dados.nome} Efetuar Agendamento
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="pt-5">
          <CForm
             class="row g-3 needs-validation" novalidate  id="form-id" onSubmit={handleSubmitCustom01}>
            <CRow>
               <CCol md={6} xs={12}>
                   <CInputGroup size="sm" className="mb-3 nowrap">
                      <CInputGroupText className="inputwidth" id="basic-addon1">Serviço</CInputGroupText>
                      <CFormInput className="input-text" disabled aria-label="Username" value={dados.nome}
                       onChange={(e) => setNome(e.target.value)} aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
               <CCol md={6} xs={12}>
                  <CInputGroup size="sm" className="mb-3">
                     <CInputGroupText className="inputwidth" id="basic-addon1">Preço</CInputGroupText>
                     <CFormInput className="input-text" disabled readonly aria-label="Username" value={dados.price}
                       aria-describedby="basic-addon1"/>
                  </CInputGroup>
               </CCol>
            </CRow>
            <CRow>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                      <CInputGroupText className="inputwidth" id="basic-addon1">Texto</CInputGroupText>
                      <CFormInput className="input-text" disabled readonly aria-label="Username" value={dados.texto} aria-describedby="basic-addon1"/>
                    </CInputGroup>
               </CCol>
               <CCol  md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-3">
                      <CInputGroupText className="inputwidth" id="basic-addon1">Detalhe</CInputGroupText>
                      <CFormInput className="input-text" disabled readonly aria-label="Username" value={dados.detalhe} aria-describedby="basic-addon1"/>
                   </CInputGroup>
                </CCol>
            </CRow>
            <CRow>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText className="inputwidth" id="basic-addon1">Nome</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu nome"
                            className="input-text"
                            aria-label="Username"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                            feedbackInvalid="Please choose a Nome."
                            aria-describedby="basic-addon1"
                            required
                        />
                    </CInputGroup>
                </CCol>
                <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText className="inputwidth" id="basic-addon1">Telefone</CInputGroupText>
                        <InputMaskTelefone/>
                    </CInputGroup>
                </CCol>
                <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText className="inputwidth" id="basic-addon1">CPF</CInputGroupText>
                        <InputMaskCPF />
                    </CInputGroup>
                </CCol>
            </CRow>
         </CForm>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleClose()}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
   )
}
