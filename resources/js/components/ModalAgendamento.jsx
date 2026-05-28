import React, { useState,useEffect } from 'react'
import { CButtonGroup, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CCol, CInputGroup, CInputGroupText, CFormInput, CBadge } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrazilianRealSign, faCalendar ,faSave, faEdit, faTrash,faEraser, faCancel, faCheck, faCircleArrowDown,faCircleArrowUp,faSearch  } from '@fortawesome/free-solid-svg-icons';

export const ModalAgendamento = (props) => {
  const {open,close,agenda,tratamento} = props
  const styleinput = {width:'100px'}
  const [nome,setNome] = useState(null)
  const [numeroagenda,setNumeroagenda] = useState(null)
  const [dataagenda,setDataagenda] = useState(null)
  const [dia,setDia] = useState(null)
  const [diaext,setDiaext] = useState(null)
  const [ano,setAno] = useState(null)
  const [mes,setMes] = useState(null)
  const [horaini,setHoraini] = useState(null)
  const [horafim,setHorafim] = useState(null)
  const [status,setStatus] = useState(null)
  const [agendado,setAgendado] = useState(null)
  const [confirmado,setConfirmado] = useState(null)
  const [cancelado,setCancelado] = useState(null)
  const [finalizado,setFinalizado] = useState(null)
  const [pago,setPago] = useState(null)
  const [profissional,setProfissional] = useState(null)
  const [tipoagenda,setTipoagenda] = useState(null)
  const [nomecliente,setNomecliente] = useState(null)
  const [clientecpf,setClientecpf] = useState(null)
  const [clienteemail,setClienteemail] = useState(null)
  const [clientetelefone,setCllientetelefone] = useState(null)
  const [trat,setTrat] = useState(null)
  const [maxdesconto,setMaxdesconto] = useState(null)
  const [valor,setValor] = useState(null)
  //dat_horainicial

  const meses =['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro', 'Dezembro'];

  useEffect(()=>{
     if(agenda != null) {
        console.log('agenda:'+agenda.hoa_id_hoa)
        setDataagenda(agenda.hoa_agendas.dat_data)
        setNumeroagenda(agenda.hoa_id_hoa)
        setDia(agenda.hoa_agendas.dat_dia)
        setDiaext(agenda.hoa_agendas.dat_diaextenso)
        setAno(agenda.hoa_agendas.dat_ano)
        setMes(agenda.hoa_agendas.dat_mes)
        setHoraini(agenda.hoa_agendas.dat_horainicial)
        setHorafim(agenda.hoa_agendas.dat_horafinal)
        setStatus(agenda.hoa_status_atual)
        setAgendado(agenda.hoa_agendado)
        setConfirmado(agenda.hoa_confirmado)
        setCancelado(agenda.hoa_cancelado)
        setFinalizado(agenda.hoa_finalizado)
        setPago(agenda.hoa_pago)
        setProfissional(agenda.hoa_profissional)
        setTrat(tratamento)
        setMaxdesconto(agenda.hoa_tratamento_desconto)
        setValor(agenda.hoa_tratamento_valor)
        //dados cliente//
        setNomecliente(agenda.hoa_clienteagenda ? agenda.hoa_clienteagenda.cli_name : null)
        setClientecpf(agenda.hoa_clienteagenda ? agenda.hoa_clienteagenda.cli_cpf : null)
        setClienteemail(agenda.hoa_clienteagenda ? agenda.hoa_clienteagenda.cli_email : null)
        setCllientetelefone(agenda.hoa_clienteagenda ? agenda.hoa_clienteagenda.cli_telefone : null)
        /*
         "hoa_agendado": "N",
         "hoa_confirmado": "N",
         "hoa_cancelado": "N",
         "hoa_finalizado": "N",
         "hoa_pago": "N",
         "hoa_status_atual": "L",
        */
     }
  },[agenda])

  const WorkFlow = (props) =>{
      return(
        <CButtonGroup size="sm" role="group" aria-label="Large button group" style={{border:'1px solid white important'}}>
            <CButton color="primary" className="badgeliberado" variant="outline">Liberado&nbsp;{props.hoa_status_atual === 'L' ? <FontAwesomeIcon icon={faCheck}/>:<></>}</CButton>
            <CButton color="primary" className="badgeagendado" variant="outline">Agendado&nbsp;{props.hoa_agendado === 'S' ? <FontAwesomeIcon icon={faCheck}/>:<></>}</CButton>
            <CButton color="primary" className="badgeconfirmado" variant="outline">Confirmado&nbsp;{props.hoa_confirmado === 'S' ? <FontAwesomeIcon icon={faCheck}/>:<></>}</CButton>
            <CButton color="primary" className="badgefinalizado" variant="outline">Finalizado&nbsp;{props.hoa_finalizado === 'S' ? <FontAwesomeIcon icon={faCheck}/>:<></>}</CButton>
            <CButton color="primary" className="badgepago" variant="outline">Pago&nbsp;{props.hoa_pago === 'S' ? <FontAwesomeIcon icon={faCheck}/>:<></>}</CButton>
            <CButton color="primary" className="badgecancelado" variant="outline">Cancelado&nbsp;{props.hoa_cancelado === 'S' ? <FontAwesomeIcon icon={faCheck}/>:<></>}</CButton>
        </CButtonGroup>
      )
  }

  return (
    <>
      {/* <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton> */}
      <CModal
        size="lg"
        visible={open}
        onClose={() => close(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader className="cmodal_header">
          <CModalTitle id="LiveDemoExampleLabel">
            <FontAwesomeIcon size="1x" icon={faCalendar} style={{cursor:'pointer',color:'white'}}/>&nbsp;Gerenciar Agendamento
           </CModalTitle>
        </CModalHeader>
        <CModalBody>
            {
              agenda ?
                (<>
                 <CRow>
                    <CCol md={6} xs={6}>
                        <CInputGroup size="sm" className="mb-3">
                            <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Realizado em</CInputGroupText>
                                <CFormInput
                                    placeholder="Digite seu nome"
                                    className="input-text"
                                    aria-label="Username"
                                    //onChange={(e) => setNome(e.target.value)}
                                    value={dataagenda}
                                    feedbackInvalid="O Nome deve ser informado."
                                    aria-describedby="basic-addon1"
                                    required
                                />
                        </CInputGroup>
                    </CCol>
                    <CCol md={6} xs={6}>
                         <div style={{fontSize:'20px',display:'flex',alignItems:'center', justifyContent:'flex-end'}}>{agenda.hoa_ativo == 0 ? <CBadge color="danger">***Horário Bloqueado***</CBadge> : <></>}</div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={4} xs={6}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Nº Agenda</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={numeroagenda}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                            </CInputGroup>
                    </CCol>
                    <CCol md={4} xs={6}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Dia</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={dia+' - '+diaext}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                            </CInputGroup>
                    </CCol>
                    <CCol md={4} xs={6}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Mês/Ano</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={meses[mes]+'/'+ano}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                            </CInputGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={4} xs={6}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Hora Início</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={horaini}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                            </CInputGroup>
                    </CCol>
                    <CCol md={4} xs={6}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Hora Fim</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={horafim}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                            </CInputGroup>
                    </CCol>
                    <CCol md={4} xs={6}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Mês/Ano</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={meses[mes]+'/'+ano}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                            </CInputGroup>
                    </CCol>
                </CRow>
                <CRow>
                   <CCol md={12} xs={12}>
                        <CInputGroup size="sm" className="mb-3">
                            <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Tratamento</CInputGroupText>
                                <CFormInput
                                    placeholder="Digite seu nome"
                                    className="input-text"
                                    aria-label="Username"
                                    //onChange={(e) => setNome(e.target.value)}
                                    value={trat}
                                    feedbackInvalid="O Nome deve ser informado."
                                    aria-describedby="basic-addon1"
                                    required
                                />
                        </CInputGroup>
                   </CCol>
                   <CCol md={6} xs={12}>
                       <CInputGroup size="sm" className="mb-3">
                            <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Max Desconto</CInputGroupText>
                                <CFormInput
                                    placeholder="Digite seu nome"
                                    className="input-text"
                                    aria-label="Username"
                                    //onChange={(e) => setNome(e.target.value)}
                                    value={maxdesconto}
                                    feedbackInvalid="O Nome deve ser informado."
                                    aria-describedby="basic-addon1"
                                    required
                                />
                        </CInputGroup>
                   </CCol>
                   <CCol md={6} xs={12}>
                        <CInputGroup size="sm" className="mb-3">
                            <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Valor</CInputGroupText>
                                <CFormInput
                                    placeholder="Digite seu nome"
                                    className="input-text"
                                    aria-label="Username"
                                    //onChange={(e) => setNome(e.target.value)}
                                    value={valor}
                                    feedbackInvalid="O Nome deve ser informado."
                                    aria-describedby="basic-addon1"
                                    required
                                />
                        </CInputGroup>
                   </CCol>
                   <CCol md={12} xs={12}>
                        <CInputGroup size="sm" className="mb-3">
                            <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Profissional</CInputGroupText>
                                <CFormInput
                                    placeholder="Digite seu nome"
                                    className="input-text"
                                    aria-label="Username"
                                    //onChange={(e) => setNome(e.target.value)}
                                    value={profissional}
                                    feedbackInvalid="O Nome deve ser informado."
                                    aria-describedby="basic-addon1"
                                    required
                                />
                        </CInputGroup>
                   </CCol>
                </CRow>
                {
                  nomecliente !=null ?
                  (
                   <CRow>
                      <CCol md={8} xs={12}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Cliente</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={nomecliente}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                          </CInputGroup>
                      </CCol>
                      <CCol md={4} xs={12}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">CPF</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={clientecpf}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                          </CInputGroup>
                      </CCol>
                      <CCol md={8} xs={12}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Email</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={clienteemail}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                          </CInputGroup>
                      </CCol>
                      <CCol md={4} xs={12}>
                            <CInputGroup size="sm" className="mb-3">
                                <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Telefone</CInputGroupText>
                                    <CFormInput
                                        placeholder="Digite seu nome"
                                        className="input-text"
                                        aria-label="Username"
                                        //onChange={(e) => setNome(e.target.value)}
                                        value={clientetelefone}
                                        feedbackInvalid="O Nome deve ser informado."
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                          </CInputGroup>
                      </CCol>
                   </CRow>
                  ) : (<></>)
                }
                <CRow>
                   <CCol md={12} xs={12}>
                      <WorkFlow {...agenda}/>
                   </CCol>
                </CRow>
                </>
                ) : (<></>)
            }
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => close(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
