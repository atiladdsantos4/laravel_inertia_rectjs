import React, { useState,useEffect } from 'react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CCard, CButtonGroup, CButton, CModal, CModalBody, CModalFooter,
  CModalHeader, CModalTitle, CRow, CCol, CInputGroup, CPaginationItem, CFormSelect,
  CFormCheck, CPagination, CInputGroupText, CFormInput, CBadge } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrazilianRealSign, faRightToBracket, faSave, faEdit, faTrash, faBox, faCancel, faCheck,faScissors,faCircleArrowDown,faCircleArrowUp,faSearch  } from '@fortawesome/free-solid-svg-icons';

export const ModalPesquisaPacote = (props) => {
  const {open, close, listapac, item, itempai, edita} = props
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
  const [pac,setPac] = useState(null)
  const [maxdesconto,setMaxdesconto] = useState(null)
  const [valor,setValor] = useState(null)
  const [est,setEst] = useState(false)
  const [servico,setServico] = useState(false)
  const [listafiltro,setListafiltro] = useState(null)
  const [lista,setLista] = useState(null)
  const [listaservices,setListaservices] = useState(null)

  //paginacao
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  const [pesquisar,setPesquisar] = useState(null)
  //dat_horainicial
  const style = {width:'90px'}

  const meses =['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro', 'Dezembro'];

  useEffect(()=>{
        console.log('item:'+item)
        setListafiltro(lista)
        setLista(listapac)
        console.log('lista tra')
        console.log(listapac)
        let tam = listapac.length
        setQtderegistros(tam)
        let res = tam / qtderegistrospagina
        let resto = tam % qtderegistrospagina
        if( resto > 0 ){
               let resposta = res.toString().split('.');
               if( parseInt(resposta[1]) === 0){
                   setNumpagination(res)
               } else {
                   res = parseInt(resposta[0]) + 1
                   let numpag = res.toFixed(0)
                   setNumpagination(numpag)
               }
        } else {
               setNumpagination(res)
        }
        setUltimapagina(res)
        setPaginaatual(1)
        if( tam > 0){
             setRegistroini(1)
             setRegistrofim(5)
        }

        // let vservico = []
        // let objeto = null
        // let existe = null
        // listapac.map((item,index)=>{
        //     objeto ={
        //         valor:item.tra_servico.ser_id_ser,
        //         texto:item.tra_servico.ser_titulo
        //     }
        //     if(vservico.length == 0){
        //         vservico.push({valor:'',texto:'Selecione o Serviço'})
        //         vservico.push(objeto)
        //     } else {
        //         existe = vservico.filter((it)=>it.valor === item.tra_servico.ser_id_ser)
        //         if(existe.length == 0){
        //             vservico.push(objeto)
        //         }
        //     }
        // })
        // setListaservices(vservico)

    //  if(agenda != null) {
    //     console.log('agenda:'+agenda.hoa_id_hoa)
    //     setDataagenda(agenda.hoa_agendas.dat_data)
    //     setNumeroagenda(agenda.hoa_id_hoa)
    //     setDia(agenda.hoa_agendas.dat_dia)
    //     setDiaext(agenda.hoa_agendas.dat_diaextenso)
    //     setAno(agenda.hoa_agendas.ano)
    //     setMes(agenda.hoa_agendas.mes)
    //     setHoraini(agenda.hoa_agendas.dat_horainicial)
    //     setHorafim(agenda.hoa_agendas.dat_horafinal)
    //     setStatus(agenda.hoa_status_atual)
    //     setAgendado(agenda.hoa_agendado)
    //     setConfirmado(agenda.hoa_confirmado)
    //     setCancelado(agenda.hoa_cancelado)
    //     setFinalizado(agenda.hoa_finalizado)
    //     setPago(agenda.hoa_pago)
    //     setProfissional(agenda.hoa_profissional)
    //     setTrat(tratamento)
    //     setMaxdesconto(agenda.hoa_tratamento_desconto)
    //     setValor(agenda.hoa_tratamento_valor)
        /*
         "hoa_agendado": "N",
         "hoa_confirmado": "N",
         "hoa_cancelado": "N",
         "hoa_finalizado": "N",
         "hoa_pago": "N",
         "hoa_status_atual": "L",
        */
     //}
  },[props])

  const CorpoTabela = (props) =>{
      let classe = null
      let cont = 0
      return(
         props.lista.map((item,index)=>{
            cont++
            classe = index % 2 == 0 ? 'primary' : 'danger'
            if(cont > 5){
               return
            } else {
               return(
                <CTableRow color={classe}>
                    <CTableDataCell>
                        {item.pac_load ? (<CSpinner size="sm" color="primary"/>) : (item.pac_id_pac)}
                    </CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                            {
                            item.pac_display == 1 ?
                            (<CFormCheck checked onChange={(e)=>atualizaLista(item.pac_id_pac,e)}/>) :
                            (<CFormCheck onChange={(e)=>atualizaLista(item.pac_id_pac,e)}/>)
                            }
                    </CTableDataCell>
                    <CTableDataCell>{item.pac_nome}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.pac_desconto}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.pac_valor}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.pac_valor_final}</CTableDataCell>
                    <CTableDataCell>{item.pac_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.pac_id_pac} dados={item}/></CTableDataCell>
                    </CTableRow>
               )
            }
         })
      )
  }

  const EditaService = (idpai,valor)=>{
     edita(idpai,valor)
     close(false)
  }

  const ItensAcao = (props) => {
     return(
      <>
         <FontAwesomeIcon onClick={(e)=>EditaService(itempai,props.dados)} style={{color:'blue',cursor:'pointer'}} icon={faRightToBracket}/>
      </>
     )
  }

  //--> Efetuar a pesquisa pelo click
    const clickPagination = (event,idx) =>{
      //  0,5,5,10
      setPaginaatual(idx)
      let ref = idx == 1 ? 0 : idx
      let inicio = ref == 0 ? ref : (ref * qtderegistrospagina) - qtderegistrospagina
      let fim = idx * qtderegistrospagina
      let lista = null
      lista = listafiltro.slice(inicio,fim)
      setRegistroini(inicio+1)
      if(fim > qtderegistros){
         setRegistrofim(qtderegistros)
      } else {
         setRegistrofim(fim)
      }
      setLista(lista)
    }

    //--> Exibe o componente de paginação
    const PaginationExibe = (props) => {
       return(
          // <div style={{fontSize:'14px',paddingLeft:'3px',paddingRight:'3px',backgroundColor:'#722E56',color:'white',display:'flex',borderRadius:'5px 5px 5px 5px'}}>
          <div className='exibepagination'>
              <div>Pagina:&nbsp;{props.pagina}&nbsp;</div>
              <div>Regitros:&nbsp;{registroini+'...'+registrofim+' num Total de '+qtderegistros}</div>
         </div>
       )
    }

    const PreviousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual < ultimapagina){
         page = page + 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    const PriousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual > 1){
         page = page - 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    const Pagination = (props) => {
      let elemento = []

      for(let i = 1; i <= props.pages; i++ ){
        if( i == paginaatual){
           elemento.push(<CPaginationItem active={true} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        } else {
           elemento.push(<CPaginationItem active={false} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        }
      }

      return (
          <CPagination aria-label="Page navigation example">
              <CPaginationItem className='cpointer' aria-label="Previous" onClick={(e)=>PriousPage(e)}>
                  <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              { elemento }
              <CPaginationItem className='cpointer' aria-label="Next" onClick={(e)=>PreviousPage(e)}>
                  <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
          </CPagination>
      )
  }

  //--> Rotina de Pesquisa de dados do grid
  const pesquisarGrid = (event) => {
     //console.log(listafiltro)
     //console.log(event.target.value)
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.tra_titulo.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tra_texto.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tra_servico.ser_titulo.toLowerCase().includes(valor.toLowerCase())
        )
        //listafiltro.filter((item)=> item.tes_id_tes == event.target.value)
        console.log(lista)
        setLista(lista.slice(0,5))
     } else {
        setLista(listafiltro.slice(0,5))
     }
  }

  const selectGrid = (event) => {
     let valor =  event.target.value
     setServico(event.target.value)
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.tra_servico.ser_id_ser == valor
        )
        console.log(lista)
        setLista(lista.slice(0,5))
     } else {
        setLista(listafiltro.slice(0,5))
     }
  }

    const InputSelectSimples = () =>{
      let lista = listaservices.sort((a,b)=>a.texto.localeCompare(b.texto))
      return(
          <CInputGroup className="mb-3">
              <CInputGroupText style={style} className="clinputtext has-validation">Serviços</CInputGroupText>
              <CFormSelect
                 id="ispesquisaservico"
                 placeholder="Pesquise o Serviço"
                 aria-label="Example text with button addon"
                 aria-describedby="button-addon1"
                 defaultValue={servico}
                 onChange={(e)=>selectGrid(e)}
              >
              {
                lista.map((item,index)=>{
                   return(
                     <option value={item.valor}>{item.texto}</option>
                   )
                })
              }
              </CFormSelect>
          </CInputGroup>
      )
    }


  return (
    <>
      {/* <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton> */}
      <CModal
        size="xl"
        visible={open}
        onClose={() => close(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader className="cmodal_header">
          <CModalTitle id="LiveDemoExampleLabel">
            <FontAwesomeIcon size="1x" icon={faBox} style={{cursor:'pointer',color:'white'}}/>&nbsp;Pesquisar Pacotes
           </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow>
              <CCol xs={12} sm={12}>
                 <CCard style={{padding:'3px'}}>
                    <div style={{display:'flex',gap:'10px'}}>
                        {/* <InputSelectSimples/> */}
                        <CInputGroup style={{maxWidth:'400px'}} className="mb-3">
                            <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                            <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                        </CInputGroup>
                    </div>
                    <CTable>
                        <CTableHead style={{fontSize:'11px !important'}}>
                            <CTableRow>
                                <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Exibir</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Nome do Pacote</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Desconto(%)</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Valor Bruto</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Valor Final</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CorpoTabela lista={lista} estado={est}/>
                        </CTableBody>
                    </CTable>
                    <div>
                        <div style={{display:'flex',justifyContent:'flex-start'}}>
                            <PaginationExibe pagina={paginaatual}/>
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-end',top:'-5px'}}>
                            <Pagination pages={numnpagination}/>
                        </div>
                    </div>
                 </CCard>
              </CCol>
            </CRow>
            {/* {
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
                                    value={pac}
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
                <CRow>
                   <CCol md={12} xs={12}>
                      <WorkFlow {...agenda}/>
                   </CCol>
                </CRow>
                </>
                ) : (<></>)
            } */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => close(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>
    </>
  )
}
