import { React,useEffect, useState, Suspense, useRef, memo, useMemo  } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { SpinnerComp } from '../../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img01 from '../../images/foto01.jpeg'
import img02 from '../../images/foto02.png'
import { ModalTratamentoValor } from '../../components/ModalTratamentoValor';
import { faBrazilianRealSign,faSave, faEdit, faTrash,faEraser, faCancel, faCircleXmark, faCircleArrowDown,faCircleArrowUp  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  CTable, CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,CTableHead,
  CButton,
  CCard,CCardBody,CCardFooter,CCardGroup,CCardHeader,CCardImage,CCardLink,CCardSubtitle,CCardText,CCardTitle,
  CCol,CRow,CContainer,
  CSpinner,
  CPlaceholder,
  CFormInput,
  CFormTextarea,
  CAlert,
  CInputGroup,CInputGroupText,
  CFormLabel,CFormCheck,CForm,CFormFeedback,
  CToaster,CToast,CToastBody,CToastClose,
  CBadge,
  CDropdown, CDropdownHeader, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider,
  CImage,
  CCollapse,
  CPagination, CPaginationItem,
  CFormSelect
} from '@coreui/react'
import { useStore } from '../../store/useStore';
import { io } from 'socket.io-client';
import { LineElement } from 'chart.js';
import { Modal } from '../../components/Modal';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


//const io = require('socket.io-client');
//const socket = io('http://jemosistemas-domain.com/inertia-react/salao');

const ManFeriados = (props) =>{
    //datepicker
    const [startDate, setStartDate] = useState(new Date());
    const { changetestemunho } = useStore();
    const [loadpage,setLoadpage] = useState(true)
    const [loadspin,setLoadspin] = useState(false)
    const [icone,setIcon] = useState(null)
    const [listacampos,setListacampos] = useState([])
    const [listatags,setListatags] = useState([])
    const [listatipos,setListatipos] = useState([])
    const [listacard,setListacard] = useState([])
    const [listatratamento,setListatratamento] = useState([])
    const [listaferiado,setListaferiado] = useState([])
    const [listaservices,setListaservices] = useState([])
    const [listafiltro,setListafiltro] = useState([])
    const [listafiltrotra,setListafiltrotra] = useState([])
    const [estcard,setEstcard] = useState(false)
    const [est,setEst] = useState(false)
    const [estform,setEstform] = useState(true)
    const [ferid,setFerid] = useState(null)
    const [numnpagination,setNumpagination] = useState(null)
    const [paginaatual,setPaginaatual] = useState(null)
    const [ultimapagina,setUltimapagina] = useState(null)
    const [registroini,setRegistroini] = useState(0)
    const [registrofim,setRegistrofim] = useState(0)
    const [qtderegistros,setQtderegistros] = useState(0)
    const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
    const [pesquisar,setPesquisar] = useState(null)
    const [saved,setSaved] = useState(false)
    const [toast, addToast] = useState()//toast
    const [validated, setValidated] = useState(false)
    const [openmodal, setOpenmodal] = useState(false)
    const [textosubmit,setTextosubmit] = useState('Salvar')
    const [estbutton, setEstbutton] = useState(false)

    //campos de máscara//
    //const [desconto,setDesconto]  = useState(null)
    //const [valortratmento,setValor] = useState(null)

    //-->var adição tratamento//
    const [itematual, setItematual] = useState(null)
    const [itematualtexto, setItematualtexto] = useState(null)
    const [itemqtdeatual, setItemqtdeatual] = useState(null)
    const [itemqtdeatualtexto, setItemqtdeatualtexto] = useState(null)
    const [estitens, setEstitens] = useState(false)
    const [listaitens, setListaitens] = useState([])
    const [estadovalor,setEstadovalor]  = useState(false)
    const [dataatual,setDataatual]  = useState(null)

    const token = props.token
    const sei_display = 1
    const empresa = props.dados_section.sec_id_emp
    const endpoint = props.end
    const endpoint_img = import.meta.env.VITE_APP_ENDPOINT_IMG
    const sei_id_sec = props.dados_section.sec_id_sec
    const toaster = useRef(null)
    const style = {width:'120px'}
    const stylebtsave = {width:'92px'}
    const styleinputcard = {width:'92px'}
    const styleinputcardimg = {width:'40px'}
    const styleimg = {width:'20%',marginRight:'auto'}
    const style_dropdown = {borderRadius:'0px 0px 0px 0px',width:'118px',backgroundColor:'#200D35',color:'white'}
    const style_placeholder = {paddingBottom:'15px'}
    const style_cursor = {cursor:'pointer'}
    const [dadosmodal,setDadosmodal] = useState({
        tra_id_tra:null,
        tra_titulo:null,
    })

const array_campos = [////fer_id_fer,fer_descricao,fer_dia,fer_mes,fer_ano,fer_ativo,fer_data,fer_created_at,fer_updated_at,fer_deleted_at
    {
       seq:1,
       nome:'fer_descricao',
       label:'Descrição',
       placeholder:'Informe a Descrição do Feriado',
       readonly:false,
       erro:'A Descrição do Feriado Informada'
    },
    {
       seq:2,
       nome:'fer_dia',
       label:'Dia',
       placeholder:'Dia do feriado',
       readonly:false,
       erro:'O Dia do feriado deve ser Informado'
     },
     {
       seq:3,
       nome:'fer_mes',
       label:'Mês',
       placeholder:'Mês do Feriado',
       readonly:false,
       erro:'O Mês do Feriado deve ser Informado'
     },
     {
       seq:4,
       nome:'fer_ano',
       label:'Ano',
       placeholder:'Ano do feriado',
       readonly:false,
       erro:'O Ano do feriado deve ser informado'
     },
     {
       seq:5,
       nome:'fer_ativo',
       label:'Ativo',
       placeholder:'Informe se está ativo',
       readonly:false,
       erro:'O Status deve ser informado'
     },
     {
       seq:6,
       nome:'fer_data',
       label:'Data Feriado',
       placeholder:'Data do Feriado',
       readonly:true
     },
     {
       seq:7,
       nome:'fer_created_at',
       label:'Criação',
       placeholder:'Data de Criação',
       readonly:false
     },
   ]

   const lista =[
    {//-->fer_descricao
      idfield:0,
      seq:array_campos[0].seq,
      titulo:array_campos[0].nome,
      nome:array_campos[0].nome,
      label:array_campos[0].label,
      placeholder:array_campos[0].placeholder,
      erro:array_campos[0].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->fer_dia
      idfield:1,
      seq:array_campos[1].seq,
      titulo:array_campos[1].nome,
      nome:array_campos[1].nome,
      label:array_campos[1].label,
      placeholder:array_campos[1].placeholder,
      erro:array_campos[1].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->fer_mes
      idfield:2,
      seq:array_campos[2].seq,
      titulo:array_campos[2].nome,
      nome:array_campos[2].nome,
      label:array_campos[2].label,
      placeholder:array_campos[2].placeholder,
      erro:array_campos[2].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->fer_ano
      idfield:3,
      seq:array_campos[3].seq,
      titulo:array_campos[3].nome,
      nome:array_campos[3].nome,
      label:array_campos[3].label,
      placeholder:array_campos[3].placeholder,
      erro:array_campos[3].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->fer_ativo
      idfield:3,
      seq:array_campos[4].seq,
      titulo:array_campos[4].nome,
      nome:array_campos[4].nome,
      label:array_campos[4].label,
      placeholder:array_campos[4].placeholder,
      erro:array_campos[4].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->fer_data
      idfield:4,
      seq:array_campos[5].seq,
      titulo:array_campos[5].nome,
      nome:array_campos[5].nome,
      label:array_campos[5].label,
      placeholder:array_campos[5].placeholder,
      erro:array_campos[5].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->fer_ativo
      idfield:5,
      seq:array_campos[6].seq,
      titulo:array_campos[6].nome,
      nome:array_campos[6].nome,
      label:array_campos[6].label,
      placeholder:array_campos[6].placeholder,
      erro:array_campos[6].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->data criacao
      idfield:6,
      seq:array_campos[6].seq,
      titulo:array_campos[6].nome,
      nome:array_campos[6].nome,
      label:array_campos[6].label,
      placeholder:array_campos[6].placeholder,
      erro:array_campos[6].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    }
   ]


    useEffect(()=>{
        setIcon(props.icon)
        setListatipos(props.tipos)
        setListatags(props.tags)
        console.log(lista)
        const fetchData = async () => {
            try {
                const requests = [
                axios.get(`${endpoint}/tratamentos?listagem=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                }),
                axios.get(`${endpoint}/feriado?listagem=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                })
                ]

                const responses = await Promise.all(requests);

                let result = responses[0]
                let result_feriado = responses[1]

                //pacotes
                let filtro =  result_feriado.data.data.sort((a,b)=>a.fer_anomesdia - b.fer_anomesdia)
                setListaferiado(filtro.slice(0,5))
                setListafiltro(filtro)
                let tam = result_feriado.data.data.length
                setQtderegistros(tam)
                let res = tam / qtderegistrospagina
                let resposta = res.toString().split('.');
                if( parseInt(resposta[1]) === 0){
                    setNumpagination(res)
                } else {
                    res = parseInt(resposta[0]) + 1
                    let numpag = res.toFixed(0)
                    setNumpagination(numpag)
                }
                setUltimapagina(res)
                setPaginaatual(1)
                if( tam > 0){
                    setRegistroini(1)
                    setRegistrofim(5)
                }
                //let filtrotra =  result_feriado.data.data.sort((a,b)=>a.pac_id_pac - b.pac_id_pac)

                // //tratamentos
                // //setListafiltro(result.data.data.tratamentos)
                // let filtrotra =  result.data.data.tratamentos.sort((a,b)=>a.tra_servico.ser_id_ser - b.tra_servico.ser_id_ser)
                // setListafiltrotra(filtrotra)
                // setListatratamento(result.data.data.tratamentos.slice(0,5))
                // let array_service = result.data.data.servicos
                // array_service.unshift({ser_id_ser:'',ser_titulo:'---> Selecione o serviço <---'})
                // setListaservices(array_service)
                setListacampos(lista)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
                // Create
        }
        fetchData()
        return
    },[saved])

    //--> Exibe o Toast
   const CompToast = (texto, color, autohide) => {
      return (
          <CToast
            style={{borderRadius:'5px',color:'white'}}
            id="idtoast"
            autohide={autohide}
            visible={false}
            color={color}
            delay="3000"
            className="text-white align-items-center"
          >
            <div className="d-flex">
              <CToastBody style={{color:'white'}}>{texto}</CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
     )
   }

   //--> Componente Input type text
    const InputTextoSimples = (props) =>{
       console.log('readonly:'+props.readonly+'campo:'+props.titulo+'valor:'+props.valor)
       return(
           <CInputGroup className="mb-3">
               <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
               <CFormInput
                  id={props.titulo}
                  placeholder={props.placeholder}
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  defaultValue={props.valor}
                  readOnly={props.readonly}
                  //feedbackInvalid={props.erro}
                  required={props.required}
                  onChange={(e)=>AtualizaLista(props.seq,e.target.value)}
               />
               {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
           </CInputGroup>
       )
    }

    const AtualizaLista = (seq,valor) =>{
       let idx = getSeqIndex(listacampos,seq)
       console.log(seq)
       console.log(listacampos[idx])
       console.log(valor)
       if(seq === 7){
          FormataData(valor)
          setStartDate(valor)
          return
       }
       listacampos[idx].valor = valor
       console.log(listacampos)
    }

    const getSeqIndex = (lista,seq) => {
        for(let i=0; i < lista.length; i++){
           if( lista[i].seq === seq){
              return i
           }
        }
    }

    const FormataData = (data) =>{
       console.log(data.getFullYear())
       console.log(data.getMonth()+1)
       console.log(data.getDate())

       listacampos[1].valor = data.getDate()
       listacampos[2].valor = data.getMonth()+1
       listacampos[3].valor = data.getFullYear()

       let mes = data.getMonth()+1
       let dia = data.getDate()

       if(dia < 10){
          dia = '0' + dia
       }

       if(mes < 10){
          mes = '0' + mes
       }

       let data_atual = data.getFullYear()+'-'+mes+'-'+dia
       setDataatual(data_atual)
    }



    //--> Componente Checkbox
    const InputTextoCheck = (props) =>{
       return(
           <CInputGroup className="mb-3">
               <CInputGroupText
                 style={props.estilo}
                 className="clinputtext has-validation"
               >{props.label}
               </CInputGroupText>
               {
                props.valor === true
                ? (
                   <div className='ms-2 mt-2'>
                       <CFormCheck id="defaultCheck1" required={props.required} checked onChange={(e)=>AtualizaLista(props.seq,e.target.checked)}/>
                        {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
                   </div>)
                : (<div className='ms-2 mt-2'>
                       <CFormCheck id="defaultCheck1" required={props.required} onChange={(e)=>AtualizaLista(props.seq,e.target.checked)}/>
                       {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
                   </div>)
               }

           </CInputGroup>
       )
   }

   //--> Componente Checkbox
    const InputDatePicker = (props) =>{
       return(
           <CInputGroup className="mb-3" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
               <CInputGroupText
                 style={props.estilo}
                 className="clinputtext has-validation"
               >{props.label}
               </CInputGroupText>
               {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} */}
               <DatePicker selected={startDate} dateFormat="MM/dd/yyyy"
                  onChange={(date) => AtualizaLista(props.seq,date)}
               />
           </CInputGroup>
       )
   }

   const Limpar = (event) => {
       console.log('teste')
       listacampos[0].valor = ''
       listacampos[1].valor = ''
       listacampos[2].valor = ''
       listacampos[3].valor = ''
       listacampos[4].valor = ''
       listacampos[5].valor = ''
       listacampos[6].valor = ''
       //listaitens.length = 0
       //setValorglobal(null)
       //setDescontoglobal(null)
       setFerid(null)
       setEst(!est)
       setValidated(false)
       setTextosubmit('Salvar')
       setEstbutton(!estbutton)
   }

   const handleSubmit = (event) => {
        console.log('submit')
        const form = event.currentTarget
        let erro = false
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            erro = true
        }
        event.preventDefault()
        setValidated(true)
        if(erro == false){
           saveFeriado()
        //    let valor = CriaJsonItens()
        //    console.log(valor)
        }
   }

   //--> Retorna o valor da lista pela sequencia informada
   const valorSeq = (seq) =>{
      let idx  = getSeqIndex(listacampos,seq)
      return listacampos[idx].valor
   }

   const saveFeriado = () => {

          setLoadspin(true)
          const formData = new FormData()
          let val_ativo = valorSeq(5) ? 1 : 0;
          formData.append('fer_ativo', val_ativo)
          formData.append('fer_descricao', valorSeq(1))
          formData.append('fer_dia', valorSeq(2))
          formData.append('fer_mes', valorSeq(3))
          formData.append('fer_ano', valorSeq(4))
          formData.append('fer_data', dataatual)
          if(ferid == null ){
            axios
            .post(`${endpoint}/feriado`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setSaved(!saved)
                setLoadspin(false)
                setValidated(false) //--> set form validation to original state <--//
                addToast(CompToast('Dados gravados com sucesso !!!', 'success')) //--> usa toast
                Limpar()
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                }, 2000)
            })
          } else {
              formData.append('_method', 'put')
            axios
             .post(`${endpoint}/feriado/${ferid}`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setSaved(!saved) // change list state force re-render
                setLoadspin(false) // hide spin
                setValidated(false) // set form validation to original state
                setFerid(null) // set update id flag to null
                addToast(CompToast('Dados Atulizados com sucesso !!!', 'success')) //--> usa toast
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                }, 2000)
            })
          }
   }

   //--> Efetuar a pesquisa pelo click
   const clickPagination = (event,idx) =>{
       //  0,5,5,10
       setPaginaatual(idx)
       let ref = idx == 1 ? 0 : idx
       let inicio = ref == 0 ? ref : (ref * qtderegistrospagina) - qtderegistrospagina
       let fim = idx * qtderegistrospagina
       let lista = null
       //let filtro =  result_feriado.data.data.sort((a,b)=>a.fer_anomesdia - b.fer_anomesdia)
       lista = listafiltro.slice(inicio,fim)
       setRegistroini(inicio+1)
       if(fim > qtderegistros){
          setRegistrofim(qtderegistros)
       } else {
          setRegistrofim(fim)
       }
       setListaferiado(lista)
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

    const pesquisarGrid = (event) => {
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.fer_descricao.toLowerCase().includes(valor.toLowerCase())
            // ||
            //         item.fer_ano.includes(valor.toLowerCase()) ||
            //         item.fer_dia.includes(valor.toLowerCase())
        )
        console.log(lista)
        setListaferiado(lista.slice(0,5))
     } else {
        setListaferiado(listafiltro.slice(0,5))
     }
  }

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
                        {item.pac_load ? (<CSpinner size="sm" color="primary"/>) : (item.fer_id_fer)}
                    </CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                        {
                            item.fer_ativo == true ?
                            (<CFormCheck style={{backgroundColor:'#5243C2'}} checked onChange={(e)=>atualizaListaAtivo(item.pac_id_pac,e)}/>) :
                            (<CFormCheck style={{backgroundColor:'white'}} onChange={(e)=>atualizaListaAtivo(item.pac_id_pac,e)}/>)
                        }
                    </CTableDataCell>
                    <CTableDataCell>{item.fer_descricao}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.fer_dia}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.fer_mes}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.fer_ano}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.fer_data}</CTableDataCell>
                    <CTableDataCell>{item.fer_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.fer_id_fer}/></CTableDataCell>
                    </CTableRow>
                )
            }
        })
        )
   }

     //--> Display dos Ícones no grid
   const ItensAcao = (props) => {
       return(
          <>
          <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
          &nbsp;
          <FontAwesomeIcon onClick={(e)=>EditaFeriado(props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
          </>
       )
    }

  const getIndexFeriado = (lista,id) =>{
    for(let i=0; i < lista.length; i++){
        if( lista[i].fer_id_fer === id){
            return i
        }
    }

  }

  //--> Edita os campos e atualiza os dados
  const EditaFeriado = (id) =>{
        let idx = getIndexFeriado(listaferiado,id)
        console.log(listaferiado[idx])
        listacampos[0].valor = listaferiado[idx].fer_descricao
        let ano = listaferiado[idx].fer_ano
        let mes = listaferiado[idx].fer_mes
        let dia = listaferiado[idx].fer_dia
        let date = new Date(ano,mes,dia)
        setStartDate(date)
        FormataData(date)
        listacampos[4].valor = listaferiado[idx].fer_ativo == 1 ? true : false
        setFerid(listaferiado[idx].fer_id_fer)
        setTextosubmit('Atualizar')
        setEstbutton(!estbutton)
        setEst(!est)
        // console.log(listacampos)
        // console.log(listapacote[idx])
   }

   return(
        <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
            {/* <ModalTratamentoValor icone={faBrazilianRealSign}isOpen={openmodal} dados={dadosmodal} close={closeModal} token={token}/> */}
            <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
            <CCard className="mb-4">
                <CCardHeader className="clfooter">
                    <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Manutenção de Feriados</span>
                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>
                        <CRow className='mt-3'>
                            <CCol md={12} xs={12} >
                                {/* {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples {...listacampos[0]} />)} */}
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples index="0" {...listacampos[0]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputDatePicker {...listacampos[6]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[1]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[2]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[3]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoCheck {...listacampos[4]}/>)}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md={12} xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <CButton style={{height:'38px'}} onClick={(e)=>Limpar(e)} color="secondary">Limpar / Novo Registro
                                    &nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faEraser}/>
                                </CButton>
                                &nbsp;
                                <CButton
                                    //saveFeriado()
                                    className='clinputtext mb-3'
                                    type="submit"
                                    estado={estbutton}
                                    style={{width:'110px',borderRadius:'5px 5px 5px 5px',color:'white'}} >
                                        {textosubmit}&nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faSave}/>
                                        { loadspin ? (<>&nbsp;<CSpinner size="sm"/></>) : (<></>)}
                                </CButton>
                            </CCol>
                        </CRow>
                        <CRow className='mt-5'>
                            <CCol md={12} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) :
                            (
                            <CCard style={{padding:'3px'}}>
                                <div style={{display:'flex',justifyContent:'flex-end'}}>
                                <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                    <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                    <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                                    </CInputGroup>
                                    </div>
                                <CTable responsive>
                                    <CTableHead style={{fontSize:'11px !important'}}>
                                        <CTableRow>
                                            <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Ativo</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Descrição</CTableHeaderCell>
                                            <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Dia</CTableHeaderCell>
                                            <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Mes</CTableHeaderCell>
                                            <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Ano</CTableHeaderCell>
                                            <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Data</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CorpoTabela lista={listaferiado} estado={est}/>
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
                            )}
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </div>
   )
}

export default ManFeriados
