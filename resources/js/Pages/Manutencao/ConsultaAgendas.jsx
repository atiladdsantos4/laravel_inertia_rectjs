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
import { defaultClientConditions } from 'vite';


//const io = require('socket.io-client');
//const socket = io('http://jemosistemas-domain.com/inertia-react/salao');

const ConsultaAgendas = (props) =>{
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

   return(
      <div>teste</div>
   )
}

export default ConsultaAgendas
