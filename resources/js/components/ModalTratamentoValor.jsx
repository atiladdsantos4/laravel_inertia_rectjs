import {CAlert, CSpinner, CForm, CRow, CBadge, CCol, CButton, CFormTextarea, CModal, CModalHeader, CModalTitle, CModalFooter, CModalBody, CInputGroup, CInputGroupText, CFormInput, CFormSelect  } from '@coreui/react';
import { ButtonComp } from './ButtonComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar,faComment } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { Calendario } from './Calendario';
import { ButtonOutlineComp } from './ButtonOutlineComp';
import { BadgeComp } from './BadgeComp';
import { RateComp } from './RateComp';
import { RateCompNew } from './RateCompNew';
import axios from 'axios';
import { CssSyntaxError } from 'postcss';
import { IMaskInput,IMaskMixin } from 'react-imask';

//<FontAwesomeIcon size="2x" style={{ color: '#229741' }} icon={faHeartbeat} />
//tva_id_tva,tva_valor,tva_max_desconto,tva_version_atual,tva_id_tra,tva_created_at,tva_updated_at,tva_deleted_at

export const ModalTratamentoValor = (props) =>{

   const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
   const { isOpen, close, section, icone, token, dados } = props
   const [titulo,setTitulo] = useState(null)
   const [servico,setServico] = useState(null)
   const [desconto,setDesconto]  = useState(0)
   const [valor,setValor] = useState(0)
   const [versaoatual,setVersaoatual] = useState(null)
   const [email,setEmail] = useState(null)
   const [sexo,setSexo] = useState(null)
   const [load,setLoad] = useState(false)
   const [show,setShow] = useState(false)
   const [telefone,setTelefone] = useState(null)
   const [validated, setValidated] = useState(false)
   const styleinput = {width:'100px'}

   const InputMaskDesconto = () => {
       const CFormInputDesconto = IMaskMixin(({ inputRef, ...props }) => (
           <CFormInput {...props} ref={inputRef} />
       ))
       return (
           <CFormInputDesconto
               mask="00.00"
               placeholder="00.00"
               className="input-text"
               //onAccept={handleAccept}
               feedbackInvalid="O Desconto deve ser informado"
               onBlur = {(e)=>handleBlur(e,'desconto')}
               onComplete={(completedValue) => setDesconto(completedValue)}
               defaultValue={desconto}
               required
           />
        )
    }

    const InputMaskValor = () => {
       const CFormInputValor = IMaskMixin(({ inputRef, ...props }) => (
           <CFormInput {...props} ref={inputRef} />
       ))
       return (
           <CFormInputValor
               mask="000.00"
               placeholder="000.00"
               className="input-text"
               //onAccept={handleAccept}
               feedbackInvalid="O Valor deve ser informado"
               onBlur = {(e)=>handleBlur(e,'valor')}
               onComplete={(completedValue) => setValor(completedValue)}
               defaultValue={valor}
               required
           />
        )
    }

    const handleBlur = (event,tag) => {
       console.log(event.target.value)
       console.log(tag)
       let val = event.target.value
       console.log(val.length)
       return
       //console.log(num.toFixed(2))
       if(val.length < 4){
          if(val.length < 2){
            let num = parseInt(val);
            val ='0'+num.toFixed(2)
            // for(let i = val.length; i < 5; i++){
            //   val +='0'
            // }
          } else {
            for(let i = val.length; i < 5; i++){
              val +='0'
            }
          }
          if(tag === 'desconto'){
             setDesconto(val)
          }
          if(tag === 'valor'){
             setValor(val)
          }

       }
       console.log('<--->valor<--->')
       console.log(valor)
       console.log('<--->desconto<--->')
       console.log(desconto)
    }

    const handleBlurValor = (event) => {
       console.log(event.target.value)
       let valor = event.target.value
       console.log(valor.length)
       if(valor.length < 5){
          if(valor.length < 2){
            valor ='0'+valor
            for(let i = valor.length; i <= 5; i++){
              valor +='0'
            }
          } else {
            for(let i = valor.length; i <= 5; i++){
              valor +='0'
            }
          }
          setValor(valor)
       }

    }

    useEffect(()=>{},[

      console.log(props)
   ])

   const handleSubmit = (event) => {

        //tva_id_tva,tva_valor,tva_max_desconto,tva_version_atual,tva_id_tra,tva_created_at,tva_updated_at,tva_deleted_at
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        event.preventDefault()
        console.log('valor'+valor)
        console.log('desconto'+desconto)
        setValidated(true)
        setLoad(true)
        const formData = new FormData()
        formData.append('tva_id_tra', dados.tra_id_tra)
        formData.append('tva_valor', valor)
        formData.append('tva_max_desconto', desconto)
        formData.append('tva_version_atual', 1)
        axios
            .post(`${endpoint}/tratamentosvalor`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setLoad(false)
                setShow(true)
                setTimeout(()=>{
                   setShow(false)
                   handleClose()
                },2500)
            })
   }

   const handleClose = () =>{
      close()
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
             <div class="circlemoney"><FontAwesomeIcon size="1x" icon={icone} style={{cursor:'pointer',color:'white'}}/></div>
             &nbsp;  Definir preço do Tratamento
          </CModalTitle>
        </CModalHeader>
        <CForm
             className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>
        <CModalBody className="pt-5">
            <CAlert dismissible visible={show} color="success" onClose={() => setShow(false)}>Testemunho Enviado Comsucesso</CAlert>
            <CRow>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Serviço</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu titulo"
                            className="input-text"
                            aria-label="Username"
                            //onChange={(e) => setEmail(e.target.value)}
                            value={dados.tra_servico}
                            feedbackInvalid="O Email deve ser informado."
                            aria-describedby="basic-addon1"
                            required
                        />
                    </CInputGroup>
               </CCol>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Tratamento</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu titulo"
                            className="input-text"
                            aria-label="Username"
                            //onChange={(e) => setTitulo(e.target.value)}
                            value={dados.tra_titulo}
                            feedbackInvalid="O titulo deve ser informado."
                            aria-describedby="basic-addon1"
                            required
                        />
                    </CInputGroup>

               </CCol>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Desconto(%)</CInputGroupText>
                        <InputMaskDesconto />
                    </CInputGroup>
                </CCol>
                <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Valor</CInputGroupText>
                        <InputMaskValor/>
                    </CInputGroup>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleClose()}>
              Close
          </CButton>
          <CButton type="submit" color="primary">
            Salvar Dados&nbsp;{load ? (<CSpinner size="sm"/>) : (<></>)}
           </CButton>
        </CModalFooter>
        </CForm>
      </CModal>
   )
}
