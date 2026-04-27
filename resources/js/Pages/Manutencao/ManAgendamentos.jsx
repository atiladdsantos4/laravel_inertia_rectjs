import { React,useEffect, useState, Suspense, useRef, memo, useMemo  } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { SpinnerComp } from '../../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img01 from '../../images/foto01.jpeg'
import img02 from '../../images/foto02.png'
import { ModalTratamentoValor } from '../../components/ModalTratamentoValor';
import { faBrazilianRealSign,faSave, faEdit, faTrash,faEraser, faCancel, faCircleXmark, faCircleArrowDown,faCircleArrowUp,faSearch  } from '@fortawesome/free-solid-svg-icons';
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

const ManAgendamentos = (props) =>{
    //datepicker
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { changetestemunho } = useStore();
    const [loadpage,setLoadpage] = useState(true)
    const [loadspin,setLoadspin] = useState(false)
    const [icone,setIcon] = useState(null)
    const [listacampos,setListacampos] = useState([])
    const [listatags,setListatags] = useState([])
    const [listatipos,setListatipos] = useState([])
    const [listacard,setListacard] = useState([])
    const [listatratamento,setListatratamento] = useState([])
    const [listaagendamento,setListaagendamento] = useState([])
    const [listaanosmes,setListaanosmes] = useState([])
    const [listaanos,setListaanos] = useState([])
    const [listameses,setListameses] = useState([])
    const [listaprofissional,setListaprofissional] = useState([])
    const [listafiltroprof,setListafiltroprof] = useState([])
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
    const [intervalopesquisa,setIntervalopesquisa] = useState(1)

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
    const [datainicio,setDatainicio]  = useState(null)
    const [datafinal,setDatafinal]  = useState(null)

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
    const style_pagination = {backgroundColor:'#722E56',color:'white'}
    const {abretela} = props
    const [dadosmodal,setDadosmodal] = useState({
        tra_id_tra:null,
        tra_titulo:null,
    })


   const array_campos = [////fer_id_fer,fer_descricao,dia_inicial,fer_mes,fer_ano,fer_ativo,fer_data,fer_created_at,fer_updated_at,fer_deleted_at
    {
       seq:1,
       nome:'dia_inicial',
       label:'Dia Inicial',
       placeholder:'Dia Inicial',
       readonly:false,
       erro:'O Dia Inicial deve ser Informado'
     },
     {
       seq:2,
       nome:'mes_inicial',
       label:'Mês Inicial',
       placeholder:'Mês Inicial',
       readonly:false,
       erro:'O Mês Inicial deve ser Informado'
     },
     {
       seq:3,
       nome:'ano_inicial',
       label:'Ano Inicial',
       placeholder:'Ano Inicial',
       readonly:false,
       erro:'O Ano Inicial deve ser informado'
     },
     {
       seq:4,
       nome:'data_inicio',
       label:'Data Inicial',
       placeholder:'Data Inicial',
       readonly:false,
       erro:'O Status deve ser informado'
     },
     {
       seq:5,
       nome:'dia_final',
       label:'Dia Final',
       placeholder:'Dia Final',
       readonly:false,
       erro:'O Dia Final Informado'
     },
     {
       seq:6,
       nome:'mes_final',
       label:'Mês Final',
       placeholder:'Mês Final',
       readonly:false,
       erro:'O Mês Final deve ser Informado'
     },
     {
       seq:7,
       nome:'ano_final',
       label:'Ano Final',
       placeholder:'Ano Final',
       readonly:false,
       erro:'O Ano Final deve ser informado'
     },
     {
       seq:8,
       nome:'data_final',
       label:'Data Final',
       placeholder:'Data Final',
       readonly:false,
       erro:'O Status deve ser informado'
     },
     {
       seq:9,
       nome:'tra_tratamento',
       label:'Tratamento',
       placeholder:'Selecione o Tratamento',
       readonly:false
     },
     {
       seq:10,
       nome:'tra_profissional',
       label:'Profissional',
       placeholder:'Selecione o Profissional Tratamento',
       readonly:false,
       erro:'O Profissional do Tratamento deve ser informado'
     },
     {
       seq:11,
       nome:'v_anos',
       label:'Anos',
       placeholder:'Selecione o Ano',
       readonly:false,
       erro:'O Ano deve ser Informado'
     },
     {
       seq:12,
       nome:'v_meses',
       label:'Mês',
       placeholder:'Selecione o Ano',
       readonly:false,
       erro:'O Mês deve ser Informado'
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
    {//-->dia_inicial
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
    },
    {//-->Tratamento
      idfield:7,
      seq:array_campos[7].seq,
      titulo:array_campos[7].nome,
      nome:array_campos[7].nome,
      label:array_campos[7].label,
      placeholder:array_campos[7].placeholder,
      erro:array_campos[7].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->Tratamento
      idfield:8,
      seq:array_campos[8].seq,
      titulo:array_campos[8].nome,
      nome:array_campos[8].nome,
      label:array_campos[8].label,
      placeholder:array_campos[8].placeholder,
      erro:array_campos[8].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->Tratamento
      idfield:9,
      seq:array_campos[9].seq,
      titulo:array_campos[9].nome,
      nome:array_campos[9].nome,
      label:array_campos[9].label,
      placeholder:array_campos[9].placeholder,
      erro:array_campos[9].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->Tratamento
      idfield:10,
      seq:array_campos[10].seq,
      titulo:array_campos[10].nome,
      nome:array_campos[10].nome,
      label:array_campos[10].label,
      placeholder:array_campos[10].placeholder,
      erro:array_campos[10].erro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {//-->Tratamento
      idfield:11,
      seq:array_campos[11].seq,
      titulo:array_campos[11].nome,
      nome:array_campos[11].nome,
      label:array_campos[11].label,
      placeholder:array_campos[11].placeholder,
      erro:array_campos[11].erro,
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
                    axios.get(`${endpoint}/protratamento?filtro=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/horarioagenda?listagem=S&init=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                    }),
                    axios.get(`${endpoint}/horarioagenda?anos=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                    })
                ]

                const responses = await Promise.all(requests);

                let result_tratamento = responses[0]
                let result_protratamento = responses[1]
                let result_agendamento = responses[2]
                let result_anos = responses[3]
                let vanos = []
                let objeto = null
                let existe = null
                setListaanosmes(result_anos.data.data)
                result_anos.data.data.map((item,index)=>{
                   objeto ={
                     valor:item.dat_ano,
                     texto:item.dat_ano
                   }
                   if(vanos.length == 0){
                      vanos.push({valor:'',texto:'Selecione o Ano'})
                      vanos.push(objeto)
                   } else {
                      existe = vanos.filter((it)=>it.valor === item.dat_ano)
                      if(existe.length == 0){
                         vanos.push(objeto)
                      }
                   }
                })
                setListaanos(vanos)
                //pacotes
                //funciona
                //let filtro =  result_agendamento.data.data.sort((a,b)=>a.hoa_tratamento.profissional.pro_nome.localeCompare(b.hoa_tratamento.profissional.pro_nome))
                let filtro =  result_agendamento.data.data.sort((a,b)=>a.hoa_profissional.localeCompare(b.hoa_profissional))
                setListaagendamento(filtro)
                setListafiltro(filtro)
                setListaprofissional(result_protratamento.data.data)
                let tam = result_agendamento.data.data.length
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
                //let filtrotra =  result_protratamento.data.data.sort((a,b)=>a.pac_id_pac - b.pac_id_pac)

                //tratamentos
                // //setListafiltro(result.data.data.tratamentos)
                let filtrotra =  result_tratamento.data.data.tratamentos.sort((a,b)=>a.tra_servico.ser_id_ser - b.tra_servico.ser_id_ser)
                setListafiltrotra(filtrotra)
                //setListatratamento(result_tratamento.data.data.tratamentos.slice(0,5))
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

    const DefineItervaloPesquisa = (event,valor) =>{
       setIntervalopesquisa(valor)
       if(valor == 2){
          listacampos[0].required = false
          listacampos[1].required = false
          listacampos[2].required = false
          listacampos[4].required = false
          listacampos[5].required = false
          listacampos[6].required = false
          listacampos[11].required = true
          listacampos[12].required = true
          setValidated(false)
          console.log(listacampos)
       }
       if(valor == 1){
          listacampos[0].required = true
          listacampos[1].required = true
          listacampos[2].required = true
          listacampos[4].required = true
          listacampos[5].required = true
          listacampos[6].required = true
          listacampos[11].required = false
          listacampos[12].required = false
          setValidated(false)
          console.log(listacampos)
       }
    }

    const AtualizaLista = (seq,valor) =>{
       let idx = getSeqIndex(listacampos,seq)
       console.log(seq)
       console.log(listacampos[idx])
       console.log(valor)
       if(seq === 4){
          FormataData(valor,'inicio')
          setStartDate(valor)
          return
       }
       if(seq === 8){
          FormataData(valor,'final')
          setEndDate(valor)
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

    const FormataData = (data,valor) =>{
       console.log(valor)
       if(valor === 'inicio'){
          console.log(data.getFullYear())
          console.log(data.getMonth()+1)
          console.log(data.getDate())

          listacampos[0].valor = data.getDate()
          listacampos[1].valor = data.getMonth()+1
          listacampos[2].valor = data.getFullYear()

          let mes = data.getMonth()+1
          let dia = data.getDate()

          if(dia < 10){
              dia = '0' + dia
          }

          if(mes < 10){
              mes = '0' + mes
          }

          let data_inicio = data.getFullYear()+'-'+mes+'-'+dia
          setDatainicio(data_inicio)
      }

      if(valor === 'final'){
          console.log(data.getFullYear())
          console.log(data.getMonth()+1)
          console.log(data.getDate())

          listacampos[4].valor = data.getDate()
          listacampos[5].valor = data.getMonth()+1
          listacampos[6].valor = data.getFullYear()

          let mes = data.getMonth()+1
          let dia = data.getDate()

          if(dia < 10){
              dia = '0' + dia
          }

          if(mes < 10){
              mes = '0' + mes
          }

          let data_final = data.getFullYear()+'-'+mes+'-'+dia
          setDatafinal(data_final)
      }
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
    const InputDatePickerInicio = (props) =>{
       return(
           <CInputGroup className="mb-3" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
               <CInputGroupText
                 style={props.estilo}
                 className="clinputtext has-validation"
               >{props.label}
               </CInputGroupText>
               {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} */}
               <DatePicker selected={startDate} dateFormat="MM/dd/yyyy" onChange={(date) => AtualizaLista(props.seq,date)}/>
           </CInputGroup>
       )
   }

   //--> Componente Checkbox
    const InputDatePickerFim = (props) =>{
       return(
           <CInputGroup className="mb-3" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
               <CInputGroupText
                 style={props.estilo}
                 className="clinputtext has-validation"
               >{props.label}
               </CInputGroupText>
               {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} */}
               <DatePicker selected={endDate} dateFormat="MM/dd/yyyy" onChange={(date) => AtualizaLista(props.seq,date)} />
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
           saveAgenda()
        //    let valor = CriaJsonItens()
        //    console.log(valor)
        }
   }

   //--> Retorna o valor da lista pela sequencia informada
   const valorSeq = (seq) =>{
      let idx  = getSeqIndex(listacampos,seq)
      return listacampos[idx].valor

   }

   const saveAgenda = () => {

          setLoadspin(true)
          const formData = new FormData()
          formData.append('hoa_id_prt', valorSeq(10))

          if(intervalopesquisa == 1){
             formData.append('data_ini', datainicio)
             formData.append('data_fim', datafinal)
             formData.append('intervalo', 1)
          }

          if(intervalopesquisa == 2){
             formData.append('ano', valorSeq(11))
             formData.append('mes', valorSeq(12))
             formData.append('intervalo', 2)
          }

          if(ferid == null ){
            axios
            .post(`${endpoint}/horarioagenda`, formData, {
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
                let mensagem = result.data.mensagem
                addToast(CompToast(mensagem, result.data.color)) //--> usa toast
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
       //let filtro =  result_protratamento.data.data.sort((a,b)=>a.fer_anomesdia - b.fer_anomesdia)
       lista = listafiltro.slice(inicio,fim)
       setRegistroini(inicio+1)
       if(fim > qtderegistros){
          setRegistrofim(qtderegistros)
       } else {
          setRegistrofim(fim)
       }
       setListaagendamento(lista)
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
               <CPaginationItem style={style_pagination} className='cpointer' aria-label="Previous" onClick={(e)=>PriousPage(e)}>
                   <span aria-hidden="true">&laquo;</span>
               </CPaginationItem>
               { elemento }
               <CPaginationItem style={style_pagination} className='cpointer' aria-label="Next" onClick={(e)=>PreviousPage(e)}>
                   <span aria-hidden="true">&raquo;</span>
               </CPaginationItem>
           </CPagination>
       )
   }

    const pesquisarGrid = (event) => {
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.hoa_tratamento.profissional.pro_nome.toLowerCase().includes(valor.toLowerCase()) ||
                    item.hoa_tratamento.tratamento.servico_api.ser_titulo.toLowerCase().includes(valor.toLowerCase()) ||
                    item.hoa_tratamento.tratamento.tra_titulo.toLowerCase().includes(valor.toLowerCase())

        )
        console.log(lista)
        setListaagendamento(lista.slice(0,5))
     } else {
        setListaagendamento(listafiltro.slice(0,5))
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
                        {item.hoa_load ? (<CSpinner size="sm" color="primary"/>) : (item.hoa_id_prt)}
                    </CTableDataCell>
                    <CTableDataCell>{item.hoa_tratamento.profissional.pro_nome}</CTableDataCell>
                    <CTableDataCell>{item.hoa_tratamento.tratamento.servico_api.ser_titulo}</CTableDataCell>
                    <CTableDataCell>{item.hoa_tratamento.tratamento.tra_titulo}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.hoa_dataini}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.hoa_datafim}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcao pro={item.hoa_tratamento.profissional.pro_id_pro} id={item.hoa_id_prt}/></CTableDataCell>
                    </CTableRow>
                )
            }
        })
        )
   }

   const ExcluiAgendamento = (item) =>{
         setLoadspin(true)
         axios
            .delete(`${endpoint}/horarioagenda/${item}`,{
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
                addToast(CompToast('Agendamentos excluídos com sucesso !!!', 'success')) //--> usa toast
                Limpar()
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                }, 2000)
           })
   }

   //--> Display dos Ícones no grid
   const ItensAcao = (props) => {
       return(
          <>
          <FontAwesomeIcon onClick={(e)=>abretela('Profissionais',props.pro)} style={{color:'#095f40',cursor:'pointer'}} icon={faSearch}/>
          &nbsp;
          <FontAwesomeIcon onClick={(e)=>ExcluiAgendamento(props.id)} style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
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
        let idx = getIndexFeriado(listaagendamento,id)
        console.log(listaagendamento[idx])
        listacampos[0].valor = listaagendamento[idx].fer_descricao
        let ano = listaagendamento[idx].fer_ano
        let mes = listaagendamento[idx].fer_mes
        let dia = listaagendamento[idx].dia_inicial
        let date = new Date(ano,mes,dia)
        setStartDate(date)
        FormataData(date)
        listacampos[4].valor = listaagendamento[idx].fer_ativo == 1 ? true : false
        setFerid(listaagendamento[idx].fer_id_fer)
        setTextosubmit('Atualizar')
        setEstbutton(!estbutton)
        setEst(!est)
   }

     //--> Componente Input type text
     const InputSelectAdd = (props) =>{
       let array =['badge1','badge2','badge3','badge4','badge5','badge6','badge7']
       console.log('//--> Componente Input type text')
       console.log(props)
       let classe = ''
       let idxclasse = -1
       return(
           <CInputGroup className="mb-3">
               <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
               <CDropdown variant="btn-group">
                   <CDropdownToggle size="sm" style={{maxHeight:'38px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Escolher</CDropdownToggle>
                   <CDropdownMenu>
                   {
                       //   <option value="">{''}</option>
                       listafiltrotra.map((item,index)=>{
                            if( item.tra_servico.ser_titulo != classe){
                               classe = item.tra_servico.ser_titulo
                               idxclasse++
                               if( idxclasse > 7){
                                  idxclasse=0
                               }
                            }
                            return(
                              <>
                              <CDropdownItem style={{fontSize:'13px'}} href="#" onClick={(e)=>AlteraEscolha(e,item.tra_id_tra,item.tra_servico.ser_titulo,item.tra_titulo)}>
                                 <CBadge className={array[idxclasse]} color="success">{item.tra_servico.ser_titulo}</CBadge>&nbsp;{item.tra_titulo}
                              </CDropdownItem>
                              </>
                               // <option value={item.tra_id_tra}>{item.tra_servico.ser_titulo+' - '+item.tra_titulo}</option>
                           )
                       })
                   }

                   </CDropdownMenu>
               </CDropdown>
               <CFormInput value={itematualtexto} placeholder='Item selecionado'readOnly/>
               {/* <DropDownQtde/>
               <CFormInput style={{maxWidth:'62px'}} value={itemqtdeatualtexto} placeholder='Qtde'readOnly/>
               <CInputGroupText style={{maxHeight:'38px',borderRadius:'0px 5px 5px 0px'}}  onClick={(e)=>addTratamento(e)} className="clinputtext">
                   {props.label1}&nbsp;&nbsp;<FontAwesomeIcon className="cpointer" size="sm" style={{color:'white'}} icon={faCircleArrowDown}/>
               </CInputGroupText> */}
               {/* {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) } */}
           </CInputGroup>
       )
   }

   const AlteraEscolha = (event,item,servico,valor) =>{
      setItematual(item)
      setItematualtexto(servico+' - '+valor)
      let val = item
      let filtro = listaprofissional.filter((item)=> item.prt_id_tra === val)
      if( filtro.length > 0 ){
        filtro.unshift({prt_id_prt:'',prt_profissional:'Selecione o Profissional'});
        setListafiltroprof(filtro)
      } else {
        filtro.unshift({prt_id_prt:'',prt_profissional:'Não há Profissionais associados'});
        setListafiltroprof(filtro)
      }
   }

    const InputSelectSimples = (props) =>{
       console.log('//--> Componente Input type text')
       console.log(props)
       return(
           <CInputGroup className="mb-3">
               <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
               <CFormSelect
                  id={props.titulo}
                  placeholder={props.placeholder}
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  defaultValue={props.valor}
                  //feedbackInvalid={props.erro}
                  required={props.required}
                  onChange={(e)=>atualizaDados(props.seq,e.target.value)}
               >
               {
               //   <option value="">{''}</option>
                 listafiltroprof.map((item,index)=>{
                     return(
                       <option value={item.prt_id_prt}>{item.prt_profissional}</option>
                     )
                 })
               }
               </CFormSelect>
               {props.required ? (<CFormFeedback id={'btinvaid'+props.seq} invalid>{props.erro}</CFormFeedback>) : (<></>) }
           </CInputGroup>
       )
     }

     const InputSelectSimplesAnos = (props) =>{
       console.log('//--> Componente Input type text')
       console.log(props)
       return(
           <CInputGroup className="mb-3">
               <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
               <CFormSelect
                  id={props.titulo}
                  placeholder={props.placeholder}
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  defaultValue={props.valor}
                  //feedbackInvalid={props.erro}
                  required={props.required}
                  onChange={(e)=>atualizaDados(props.seq,e.target.value)}
               >
               {
               //   <option value="">{''}</option>
                 listaanos.map((item,index)=>{
                     return(
                       <option value={item.valor}>{item.texto}</option>
                     )
                 })
               }
               </CFormSelect>
               {props.required ? (<CFormFeedback id={'btinvaid'+props.seq} invalid>{props.erro}</CFormFeedback>) : (<></>) }
           </CInputGroup>
       )
    }

    const InputSelectSimplesMeses = (props) =>{
       console.log('//--> Componente Input type text')
       console.log(props)
       return(
           <CInputGroup className="mb-3">
               <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
               <CFormSelect
                  id={props.titulo}
                  placeholder={props.placeholder}
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  defaultValue={props.valor}
                  //feedbackInvalid={props.erro}
                  required={props.required}
                  onChange={(e)=>atualizaDados(props.seq,e.target.value)}
               >
               {
               //   <option value="">{''}</option>
                 listameses.map((item,index)=>{
                     return(
                       <option value={item.dat_mes}>{item.dat_mes_extenso}</option>
                     )
                 })
               }
               </CFormSelect>
               {props.required ? (<CFormFeedback id={'btinvaid'+props.seq} invalid>{props.erro}</CFormFeedback>) : (<></>) }
           </CInputGroup>
       )
    }

//    const valorSeq = (seq) =>{
//      let idx  = getIndexSeq(listacampos,seq)
//      return listacampos[idx].valor
//    }

  //--> Pega o campo pela sequência
  const getIndexSeq = (lista,seq) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].seq === seq){
          return i
        }
    }
   }

   const atualizaDados = (seq,valor) =>{
       console.log(seq)
       console.log(valor)
       let index = getIndexSeq(listacampos,seq)
       listacampos[index].valor = valor
       if( seq == 11){
         let filtro_data = listaanosmes.filter((item) => item.dat_ano == valor) // '==' inteiros '===' string
          setListameses(filtro_data)
          console.log(listaanosmes)
          console.log(filtro_data)
       }
       //let filtro = filtpo
    //    if( seq == 3 ){
    //       setTipoglobal(valor)
    //       listacampos[3].label = valor == 1 ? 'CPF' : 'CNPJ'
    //    }
    //    if( seq == 4 ){
    //       setValorglobal(valor)
    //    }
      console.log(listacampos)
   }

   return(
        <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
            {/* <ModalTratamentoValor icone={faBrazilianRealSign}isOpen={openmodal} dados={dadosmodal} close={closeModal} token={token}/> */}
            <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
            <CCard className="mb-4">
                <CCardHeader className="clfooter">
                    <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Realização de Agendamentos</span>
                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>
                        <CRow className='mt-3'>
                            <CCol md={6} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectAdd index="0" {...listacampos[9]}/>)}
                            </CCol>
                            <CCol md={6} xs={12} >
                                {/* {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples {...listacampos[0]} />)} */}
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples index="0" {...listacampos[10]}/>)}
                            </CCol>
                            <CRow className='mb-2 mt-1'>
                                 <CCol md={6} xs={12} >
                                    {
                                    loadpage
                                    ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>)
                                    : (
                                       <div style={{display:'flex',alignItems:'center',justifyContent:'left',gap:'6px'}}>
                                         { intervalopesquisa == 1 ? (<CFormCheck id="defaultIntervalo1" checked onClick={(e)=>DefineItervaloPesquisa(e,1)}/>) : (<CFormCheck id="defaultIntervalo1" onClick={(e)=>DefineItervaloPesquisa(e,1)}/>) }
                                         <CBadge className='badge4' color="primary">Definir por Intervalo de Datas</CBadge>
                                       </div>
                                      )
                                    }
                                 </CCol>
                            </CRow>
                            <CRow className='mb-1 mt-1'>
                                 <CCol md={6} xs={12} >
                                    {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <CBadge style={{backgroundColor:'#722E56 !important'}} color="primary">Período Inicial</CBadge>)}
                                 </CCol>
                            </CRow>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputDatePickerInicio name="inicio" {...listacampos[3]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[0]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                 {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[1]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                 {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[2]}/>)}
                            </CCol>
                            <CRow className='mb-1 mt-0'>
                                 <CCol md={6} xs={12} >
                                    {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <CBadge style={{backgroundColor:'#722E56 !important'}} color="primary">Período Final</CBadge>)}
                                 </CCol>
                            </CRow>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputDatePickerFim name="fim" {...listacampos[8]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[4]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[5]}/>)}
                            </CCol>
                            <CCol md={3} xs={12} >
                                {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[6]}/>)}
                            </CCol>
                        </CRow>
                        <CRow className='mb-3 mt-1'>
                             <CCol md={6} xs={12} >
                                    {
                                    loadpage
                                    ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>)
                                    : (
                                       <div style={{display:'flex',alignItems:'center',justifyContent:'left',gap:'6px'}}>
                                         { intervalopesquisa == 2 ? (<CFormCheck id="defaultIntervalo2" checked onClick={(e)=>DefineItervaloPesquisa(e,2)}/>) : (<CFormCheck id="defaultIntervalo1" onClick={(e)=>DefineItervaloPesquisa(e,2)}/>) }
                                         <CBadge className='badge4' color="primary">Definir por Períodos Fixos Ano/Mês</CBadge>
                                       </div>
                                      )
                                    }
                             </CCol>
                        </CRow>
                        <CRow>
                            <CCol md={4} xs={12} >
                                 {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimplesAnos {...listacampos[11]}/>)}
                            </CCol>
                            <CCol md={4} xs={12} >
                                 {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimplesMeses {...listacampos[12]}/>)}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md={12} xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <CButton style={{height:'38px'}} onClick={(e)=>Limpar(e)} color="secondary">Limpar / Novo Registro
                                    &nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faEraser}/>
                                </CButton>
                                &nbsp;
                                <CButton
                                    //saveAgenda()
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
                                            <CTableHeaderCell className='clthinterno' scope="col">Profissional</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Serviço</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Tratamento</CTableHeaderCell>
                                            <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Inicio</CTableHeaderCell>
                                            <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Fim</CTableHeaderCell>
                                            {/* <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Ano</CTableHeaderCell>
                                            <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Data</CTableHeaderCell> */}
                                            {/* <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell> */}
                                            <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CorpoTabela lista={listaagendamento} estado={est}/>
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

export default ManAgendamentos
