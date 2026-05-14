import {CAlert, CForm, CRow, CBadge, CCol, CButton, CModal, CModalHeader, CModalTitle, CModalFooter,CModalBody, CInputGroup, CInputGroupText, CFormInput, CFormSelect  } from '@coreui/react';
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
   const [tratamento,setTratamento] = useState(null)
   const [idhoa,setHoa] = useState(null)
   const [nome,setNome] = useState(null)
   const [cpf,setCpf] = useState(null)
   const [telefone,setTelefone] = useState(null)
   const [horario,setHorario] = useState(null)
   const [profissional,setProfissional] = useState(null)
   const [prof,setProf] = useState(null)
   const [listadatas,setListadatas] = useState([])
   const [est,setEst] = useState(false)
   const [validated, setValidated] = useState(false)
   const [showAlert,setShowAlert] = useState(false)
   const largura = {width:'85px'}

   useEffect(()=>{
      setTratamento(dados.tratamento)
      let vet = []
      let vetdados = []
      let obj = null
      if(dados.agenda != null){
        dados.agenda.map((item,index)=>{
            obj = {
              id:item.prt_id_pro,
              prof:item.prt_profissional
            }
            vet.push(obj)
        })
        setProfissional(vet)
        setProf('')
        setListadatas([])
      }

   },[props])

   const handleSubmit = (event) => {
        let semerro = true
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            semerro =  false
        }

        setValidated(true)
        event.preventDefault()
        event.stopPropagation()
        if(semerro){
          console.log('hoa:'+idhoa)
        }
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
            onBlur={(e)=>validaCPF(e.target.value)}
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

  const validaCPF = (cpf) =>{
        console.log('entrou:'+cpf)
        let resp = true
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontuação
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) resp = false; // Verifica tamanho e números iguais

        let t = 0;
        let r;
        let s = 0;

        // Cálculo dos dígitos verificadores
        for (let i = 1; i <= 9; i++) s = s + parseInt(cpf[i - 1]) * (11 - i);
        r = (s * 10) % 11;
        if (r === 10 || r === 11) r = 0;
        if (r !== parseInt(cpf[9])) resp = false;

        s = 0;
        for (let i = 1; i <= 10; i++) s = s + parseInt(cpf[i - 1]) * (12 - i);
        r = (s * 10) % 11;
        if (r === 10 || r === 11) r = 0;
        if (r !== parseInt(cpf[10])) resp = false;
        console.log(resp)
        if(resp == false){
           setShowAlert(true)
           setTimeout(()=>{
              setShowAlert(false)
           },2000)
        }
        return resp;
  }


   const ListaProfisional = (props) =>{
     return(
        props.lista.map((item,index)=>{
            return(<option value={item.id}>{item.prof}</option>)
        })
     )
   }

   const exibeCalendar = (valor) =>{
      setProf(valor)
      let vetdatas = []
      let vetor = dados.agenda.filter((item)=>item.prt_id_pro == valor)
      let vachou = null
      let vhorarios = null
      let obj = null
      let objtimes = null
      vetor[0].prt_horarios.map((it,index)=>{
         vachou = vetdatas.filter((item)=>item.date === it.dat_format)
         if(vachou.length == 0){
            obj ={
              date:it.dat_format,
              times:[]
            }
            vhorarios = vetor[0].prt_horarios.filter((item)=>item.dat_format === it.dat_format)
            vhorarios.map((itt,index)=>{
              objtimes = {
                hoa_id_hoa:itt.hoa_id_hoa,
                hora:itt.dat_horainicial
              }
              obj.times.push(objtimes)
            })
            vetdatas.push(obj)
         }
      })
      setListadatas(vetdatas)
    //   console.log(vetor)
    //   console.log(vetdatas)
    //   console.log(vhorarios)
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
             {dados.nome}&nbsp;Efetuar Agendamento
          </CModalTitle>
        </CModalHeader>
        <CForm
             className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>

        <CModalBody className="pt-5">
            <CAlert color="danger" visible={showAlert} variant="solid">
              CPF Inválido!!!
            </CAlert>
            <CRow>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-3 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Serviço</CInputGroupText>
                      <CFormInput className="input-text" disabled aria-label="Username" value={dados.nome}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
               <CCol md={6} xs={12}>
                  <CInputGroup size="sm" className="mb-3">
                     <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Preço</CInputGroupText>
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
                        <CInputGroupText className="inputwidth has-validation" style={largura} id="basic-addon1">Nome</CInputGroupText>
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
                        <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Telefone</CInputGroupText>
                        <InputMaskTelefone/>
                    </CInputGroup>
                </CCol>
                <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">CPF</CInputGroupText>
                        <InputMaskCPF />
                    </CInputGroup>
                </CCol>
                <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Profissional</CInputGroupText>
                        <CFormSelect onChange={(e)=>exibeCalendar(e.target.value)} value={prof} feedbackInvalid="O Profissional deve ser informado." required>
                            <option value=''>{'Selecione o Profissional'}</option>
                            <ListaProfisional lista={profissional} est={est}/>
                        </CFormSelect>
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
                  <Calendario lista={listadatas} definehoa={setHoa} definehorario={setHora}/>
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
