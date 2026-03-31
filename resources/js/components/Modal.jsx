import {CForm, CRow, CBadge, CCol, CButton, CModal, CModalHeader, CModalTitle, CModalFooter,CModalBody, CInputGroup, CInputGroupText, CFormInput  } from '@coreui/react';
import { ButtonComp } from './ButtonComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { IMaskInput, IMaskMixin } from 'react-imask'
import { Calendario } from './Calendario';
import { ButtonOutlineComp } from './ButtonOutlineComp';
import { BadgeComp } from './BadgeComp';
//<FontAwesomeIcon size="2x" style={{ color: '#229741' }} icon={faHeartbeat} />


export const Modal = (props) =>{

   const { isOpen, close, dados, tela } = props
   const [nome,setNome] = useState(null)
   const [cpf,setCpf] = useState(null)
   const [telefone,setTelefone] = useState(null)
   const [horario,setHorario] = useState(null)
   const [validated, setValidated] = useState(false)

   useEffect(()=>{},[
      console.log(props)
   ])

   const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)
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
            feedbackInvalid="O CPF deve ser informado"
            onComplete={(completedValue) => setCpf(completedValue)}
            defaultValue={cpf}
            required
        />
     )
  }

  const InputMaskTelefone = () => {
    const CFormInputTelefone = IMaskMixin(({ inputRef, ...props }) => (
        <CFormInput {...props} ref={inputRef} />
    ))
    return (
        <CFormInputTelefone
            mask="(00) 00000-0000"
            placeholder="Informe seu Telefone"
            className="input-text"
            //onAccept={handleAccept}
            feedbackInvalid="O Telefone deve ser informado"
            onComplete={(completedValue) => setTelefone(completedValue)}
            defaultValue={telefone}
            required
        />
     )
  }

  const setHora = (dia, hora) =>{
     let horario =  dia+' '+hora
    if( dia === '' || hora === ''){
       setHorario('')
       return
    }
     setHorario(horario)
     console.log('entrei aqui')
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
        <CForm
             className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>

        <CModalBody className="pt-5">
            <CRow>
               <CCol md={6} xs={12}>
                   <CInputGroup size="sm" className="mb-3 nowrap">
                      <CInputGroupText className="inputwidth" id="basic-addon1">Serviço</CInputGroupText>
                      <CFormInput className="input-text" disabled aria-label="Username" value={dados.nome}
                        aria-describedby="basic-addon1"/>
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
               { dados.screen === 'offers' ?
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                      <CInputGroupText className="inputwidth" id="basic-addon1">Texto</CInputGroupText>
                      <CFormInput className="input-text" disabled readonly aria-label="Username" value={dados.texto} aria-describedby="basic-addon1"/>
                    </CInputGroup>
               </CCol>
               : (<></>)}
               { dados.screen === 'offers' ?
               <CCol  md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-3">
                      <CInputGroupText className="inputwidth" id="basic-addon1">Detalhe</CInputGroupText>
                      <CFormInput className="input-text" disabled readonly aria-label="Username" value={dados.detalhe} aria-describedby="basic-addon1"/>
                   </CInputGroup>
                </CCol>
                : (<></>)}
            </CRow>
            <CRow>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText className="inputwidth has-validation" id="basic-addon1">Nome</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu nome"
                            className="input-text"
                            aria-label="Username"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                            feedbackInvalid="O Nome deve ser informado."
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
            <CRow>
               <CCol md={12} xs={12}>
                  <BadgeComp classe="clbadgemodal" label="Escolha o Horário do seu Agendamento"/>
               </CCol>
            </CRow>
            <CRow>
               <CCol md={12} xs={12}>
                  <Calendario definehorario={setHora}/>
               </CCol>
            </CRow>
            <CRow>
               <CCol md={12} xs={12} className="pt-2">
                  <CInputGroup size="sm" className="mb-3">
                      <CInputGroupText className="inputwidth has-validation" id="basic-addon1">Horario</CInputGroupText>
                      <CFormInput
                         placeholder="Digite seu nome"
                         className="input-text"
                         aria-label="Horario"
                         onChange={(e) => setHorario(e.target.value)}
                         value={horario}
                        //  readOnly
                         feedbackInvalid="O Horário do agendamento deve ser informado"
                         aria-describedby="basic-addon1"
                         required
                     />
                     </CInputGroup>
               </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleClose()}>
              Close
          </CButton>
          <CButton type="submit" color="primary">Save changes</CButton>
        </CModalFooter>
        </CForm>
      </CModal>
   )
}
