import { React,useEffect, useState, Suspense, useRef, memo, useMemo  } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { SpinnerComp } from '../../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img01 from '../../images/foto01.jpeg'
import img02 from '../../images/foto02.png'
import { ModalTratamentoValor } from '../../components/ModalTratamentoValor';
import { faBrazilianRealSign ,faCalendar, faSave, faEdit, faTrash,faEraser, faCancel, faCircleXmark, faCircleArrowDown, faCircleArrowUp, faSearch  } from '@fortawesome/free-solid-svg-icons';
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
  CFormSelect, CTooltip
} from '@coreui/react'
import { useStore } from '../../store/useStore';
import { io } from 'socket.io-client';
import { LineElement } from 'chart.js';
import { Modal } from '../../components/Modal';
import { IMaskInput,IMaskMixin } from 'react-imask';

//const io = require('socket.io-client');
//const socket = io('http://jemosistemas-domain.com/inertia-react/salao');

const ManProfissionais = (props) =>{
  console.log('props ManProfissionais')
  console.log(props)
  const { changetestemunho } = useStore();
  const [loadpage,setLoadpage] = useState(true)
  const [loadspin,setLoadspin] = useState(false)
  const [icone,setIcon] = useState(props.icon)
  const [listacampos,setListacampos] = useState([])
  const [listatags,setListatags] = useState([])
  const [listatipos,setListatipos] = useState([])
  const [listacard,setListacard] = useState([])
  const [listatratamento,setListatratamento] = useState([])
  const [listaprofissional,setListaprofissional] = useState([])
  const [listatipo,setListatipo] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [listafiltrotra,setListafiltrotra] = useState([])
  const [estcard,setEstcard] = useState(false)
  const [est,setEst] = useState(false)
  const [estform,setEstform] = useState(true)
  const [proid,setProid] = useState(null)
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
  const [mainimage, setMainimage] = useState(false)
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
  const [valorglobal,setValorglobal]  = useState(null)
  const [descontoglobal,setDescontoglobal]  = useState(0)
  const [tipoglobal,setTipoglobal]  = useState(1)
  const [idpesquisa,setIdpesquisa] = useState(props.idpesquisa)

  const token = props.token
  const sei_display = 1
  const empresa = props.dados_section.sec_id_emp
  const endpoint = props.end
  //const idpesquisa = props.idpesquisa
  const endpoint_img = import.meta.env.VITE_APP_ENDPOINT_IMG
  const sei_id_sec = props.dados_section.sec_id_sec
  const toaster = useRef(null)
  const style = {width:'120px'}
  const stylebtsave = {width:'92px'}
  const styleinputcard = {width:'92px'}
  const styleinputcardimg = {width:'40px'}
  const styleimg = {width:'30%',marginRight:'auto'}
  const style_dropdown = {borderRadius:'0px 0px 0px 0px',width:'118px',backgroundColor:'#200D35',color:'white'}
  const style_placeholder = {paddingBottom:'15px'}
  const style_cursor = {cursor:'pointer'}
  const { abretela } = props
  const [dadosmodal,setDadosmodal] = useState({
    tra_id_tra:null,
    tra_titulo:null,
  })


  const openModal = () =>{
     setOpenmodal(true)
  }

  const closeModal = () =>{
     setOpenmodal(false)
  }


  const handleClick = (event,id,nome,valor) => {
     handleSave(id,listacampos,nome)
  }

  const atualizaItem = (id, param, newValue) => {
    switch(param){

      case 'spinner':
         setListacampos(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, load: newValue } : item
            )
          )
         break

      case 'valor':
         setListacampos(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, valor: newValue } : item
            )
          )
         break

      case 'idfield':
         setListacampos(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, idfield: newValue } : item
            )
          )
         break

      case 'tipo':
         setListacampos(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, tipo: newValue } : item
            )
          )
         break

      case 'tipo_id':
         setListacampos(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, tipo_id: newValue } : item
            )
          )
        break

      case 'imagem':
         setListacampos(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, valor: newValue } : item
            )
          )
         break

      case 'link':
         setLista(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, link: newValue } : item
            )
          )
         break

      case 'collapse':
         let index = getIndex(listacampos,id)
         let estado_atual = listacampos[index].collapse
         let muda = !estado_atual
         setListacampos(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, collapse: muda } : item
            )
          )
         break
    }
    console.log(listacampos)
  };

  const setValor = (id,nome,valor) => {
     let index = getIndex(listacampos,id)
     listacampos[index].valor = valor
  }

  const getIndex = (lista,id) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].id === id){
          return i
        }
    }
  }

  const getIndexProfissional = (lista,id) => {
    for(let i=0; i < lista.length; i++){
       if( lista[i].pro_id_pro === id){
         return i
       }
    }
  }

  const getIndexItensPacote = (lista,id) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].tra_id_tra === id){
          return i
        }
    }
  }

  const getTipoTag = (valor) =>{
    let array = listatags.filter((item)=> item.tag_nome === valor)
    return array[0].tag_id_tag
  }

  const array_campos = [////pro_id_pro,pro_nome,pro_apelido,pro_tipo,pro_cpf_cnpj,pro_path_image,pro_ativo,pro_created_at,pro_updated_at,pro_deleted_at
    {
       seq:1,
       nome:'pro_nome',
       label:'Nome',
       placeholder:'Informe o Nome do Profissional',
       readonly:false,
       erro:'Nome do Profissional dve ser Informado'
    },
    {
       seq:2,
       nome:'pro_apelido',
       label:'Apelido',
       placeholder:'Informe o Apelido',
       readonly:false,
       erro:'Apelido deve ser Informado'
     },
     {
       seq:3,
       nome:'pro_tipo',
       label:'Tipo',
       placeholder:'Pessoas Física/Juridica',
       readonly:false,
       erro:'O Tipo de Pessoa deve ser informnado'
     },
     {
       seq:4,
       nome:'pro_cpf_cnpj',
       label:'CNPJ/CPF',
       placeholder:'Informe o Documento',
       readonly:false,
       erro:'O Documento deve ser informado'
     },
     {
       seq:5,
       nome:'pro_path_image',
       label:'Imagem',
       placeholder:'Informe a Imagem do Profissional',
       readonly:false,
       erro:'A Imagem do Profissional deve ser informada'
     },
     {
       seq:6,
       nome:'pro_ativo',
       label:'Ativo',
       placeholder:'Ativo',
       readonly:true
     },
     {
       seq:7,
       nome:'pro_created_at',
       label:'Criação',
       placeholder:'Data de Criação',
       readonly:true
     },
     {
       seq:8,
       nome:'filtro',
       label:'Tratamento',
       label1:'Adicionar',
       placeholder:'Selecione o tratamento',
       readonly:false
     },
  ]

  const lista =[
    {
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
    {
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
      required:false
    },
    {
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
    {
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
    {
      idfield:4,
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
      imgfile:[],
      imgsaved:false,
      link:'profissional/',
      required:true
    },
    {
      idfield:5,
      seq:array_campos[5].seq,
      titulo:array_campos[5].nome,
      nome:array_campos[5].nome,
      label:array_campos[5].label,
      placeholder:array_campos[5].placeholder,
      erro:array_campos[5].erro,
      readonly:true,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {
      idfield:6,
      seq:array_campos[6].seq,
      titulo:array_campos[6].nome,
      nome:array_campos[6].nome,
      label:array_campos[6].label,
      label1:array_campos[6].label1,
      placeholder:array_campos[6].placeholder,
      erro:array_campos[6].erro,
      readonly:true,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {
      idfield:7,
      seq:array_campos[7].seq,
      titulo:array_campos[7].nome,
      nome:array_campos[7].nome,
      label:array_campos[7].label,
      label1:array_campos[7].label1,
      placeholder:array_campos[7].placeholder,
      erro:array_campos[7].erro,
      readonly:true,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
 ]

 const lista_tipo =[
    {nome:'Selecione o Tipo',valor:''},
    {nome:'CPF',valor:1},
    {nome:'CNPJ',valor:2}
 ]
 const lista_experiencia =[
    {qtde:1},
    {qtde:2},
    {qtde:3},
    {qtde:4},
    {qtde:5},
    {qtde:6},
    {qtde:7},
    {qtde:8},
    {qtde:9},
    {qtde:10},
    {qtde:11},
    {qtde:12},
    {qtde:13},
    {qtde:14},
    {qtde:15},
    {qtde:16},
    {qtde:17},
    {qtde:18},
    {qtde:19},
    {qtde:20}
 ]

 //--> Atualizações do Estado Inicial do Componente
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
           axios.get(`${endpoint}/profissional?listagem=S`,{
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                },
           })
        ]

        const responses = await Promise.all(requests);

        let result = responses[0]
        let result_profissional = responses[1]

        //pacotes
        setListaprofissional(result_profissional.data.data.slice(0,5))
        setListafiltro(result_profissional.data.data)
        let tam = result_profissional.data.data.length
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
        //let filtrotra =  result_profissional.data.data.sort((a,b)=>a.pac_id_pac - b.pac_id_pac)

        //tratamentos
        //setListafiltro(result.data.data.tratamentos)
        let filtrotra =  result.data.data.tratamentos.sort((a,b)=>a.tra_servico.ser_id_ser - b.tra_servico.ser_id_ser)
        setListafiltrotra(filtrotra)
        setListatratamento(result.data.data.tratamentos.slice(0,5))
        let array_service = result.data.data.servicos
        array_service.unshift({ser_id_ser:'',ser_titulo:'---> Selecione o serviço <---'})
        setListatipo(lista_tipo)
        setListacampos(lista)
        setLoadpage(false)
        // setTimeout(() => {
        //   console.log('edita_profissinal:'+listaprofissional.length)
        //   if(listaprofissional.length > 0){

        //   }
        // }, 5000);

      }
      catch (error) {
        console.error("One of the requests failed", error);
      }
        // Create
   }
   fetchData()
   return
   axios.get(`${endpoint}/tratamentos?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           console.log('lista tratamento')
           console.log(result.data.data.tratamentos)
           setListafiltro(result.data.data.tratamentos)
           let filtrotra =  result.data.data.tratamentos.sort((a,b)=>a.tra_servico.ser_id_ser - b.tra_servico.ser_id_ser)
           setListafiltrotra(filtrotra)
           setListatratamento(result.data.data.tratamentos.slice(0,5))
           let tam = result.data.data.tratamentos.length
           setQtderegistros(tam)
           let res = tam / qtderegistrospagina
           console.log('divisao:'+res)
           if( res % 2 === 0){
              setNumpagination(res)
              console.log('num_reg_pagina:'+res)
           } else {
              res = res + 1
              let numpag = res.toFixed(0)
              setNumpagination(numpag)
              console.log('num_reg_pagina:'+numpag)
           }
           setUltimapagina(res)
        //    let tam = result.data.data.tratamentos.length
        //    setQtderegistros(tam)
        //    let res = tam % 5
        //    if( res % 2 ===0){
        //       setNumpagination(res)
        //    } else {
        //       res = res + 1
        //       setNumpagination(res)
        //    }
        //    setUltimapagina(res)
           let array_service = result.data.data.servicos
           array_service.unshift({ser_id_ser:'',ser_titulo:'---> Selecione o serviço <---'})
           setListatipo(array_service)
           setListacampos(lista)
           setPaginaatual(1)
           if( tam > 0){
             setRegistroini(1)
             setRegistrofim(5)
           }
           setLoadpage(false)
       })
 },[saved])

 //funciona verificar passando parametro//
  setTimeout(() => {
     if(idpesquisa != null){
        EditaProfissional(idpesquisa)
        setIdpesquisa(null)
     }
  },100)

 const atualizaDados = (seq,valor) =>{
   let index = getIndexSeq(listacampos,seq)
   listacampos[index].valor = valor
   if( seq == 3){
     setTipoglobal(valor)
   }
   if( seq == 4){
     setValorglobal(valor)
   }
   console.log(listacampos)
 }

 const  handleSave = (id,lista,valor) =>{

     if( validaTipo(id) ){
       addToast(CompToast('O Tipo de dados deve ser informado !!!', 'danger')) //--> usa toast
       setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
       }, 3000)
       return
     }

     let index = getIndex(lista,id)
     let tag = getTipoTag(lista[index].type)
     let json = null
     if( lista[index].idfield == 0){
        atualizaItem(id, 'spinner', true)

        const formData = new FormData()

        if( lista[index].type == 'textarea' ){

           json = CriaJsonTextArea(index)

        } else if( lista[index].type == 'lista' ){

           json  = CriaJsonCard(id)
           let listaimg = listacard.filter((item)=>item.imgfile.length > 0)
           if( listaimg.length > 0 ){
               listaimg.map((item,index)=>{
                   formData.append('files[]', item.imgfile[0])
               })
               formData.append('has_image', true)
               formData.append('has_multiple', true)
           }

        } else {

           json = null

        }


        formData.append('sei_display', sei_display)
        formData.append('sei_nome', lista[index].nome)
        formData.append('sei_valor', lista[index].valor)
        formData.append('sei_placeholder', lista[index].placeholder)
        formData.append('sei_json', json)
        formData.append('sei_id_emp', empresa)
        formData.append('sei_id_sec', sei_id_sec)
        formData.append('sei_id_tip', lista[index].tipo_id)
        formData.append('sei_id_tag', tag)

        axios
        .post(`${endpoint}/sectionitem`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setSaved(!saved)
            atualizaItem(id, 'idfield', result.data.data.sei_id_sei)
            atualizaItem(id, 'spinner', false)
            changestaff()
            addToast(CompToast('Dados gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
            }, 2000)
        })
    } else {
        const formData = new FormData()

        if( lista[index].type == 'textarea' ){
           json = CriaJsonTextArea(index)
        } else if( lista[index].type == 'lista' ){

           json  = CriaJsonCard(id)
           let listaimg = listacard.filter((item)=>item.imgfile.length > 0)
           if( listaimg.length > 0 ){
                listaimg.map((item,index)=>{
                    formData.append('files[]', item.imgfile[0])
                })
                formData.append('has_image', true)
                formData.append('has_multiple', true)
            }
        } else {

           json = null

        }
        atualizaItem(id, 'spinner', true)

        formData.append('sei_display', sei_display)
        formData.append('sei_nome', lista[index].nome)
        formData.append('sei_valor', lista[index].valor)
        formData.append('sei_json', json)
        formData.append('sei_placeholder', lista[index].placeholder)
        formData.append('sei_id_emp', empresa)
        formData.append('sei_id_sec', sei_id_sec)
        formData.append('sei_id_tip', lista[index].tipo_id)
        formData.append('sei_id_tag', tag)
        formData.append('_method', 'put')
        let ident = lista[index].idfield
        axios
         .post(`${endpoint}/sectionitem/${ident}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setSaved(!saved)
            atualizaItem(id, 'spinner', false)
            changestaff()
            addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
            }, 2000)
        })
    }
 }

  //--> Salva ou Atualiza os dados no banco de dados //
  const saveProfissional = (event) => {
        let filtro = listaitens.filter((item) => item.tra_exclui === 'N')
        if( filtro.length == 0){
          addToast(CompToast('Não foi associado nenhum serviço ao Profissional!!!', 'danger')) //--> usa toast
          setTimeout(() => {
                  document.getElementById('idtoast').classList.remove('show')
                  document.getElementById('idtoast').remove()
          }, 2500)
          return
        }
        setLoadspin(true)
        let prt_itens = null
        if(proid == null ){
           let tem_imagem = listacampos[4].imgfile.length
           if( tem_imagem == 0 ){
              addToast(CompToast('Não foi selecionada nenhuma imagem!!!', 'danger')) //--> usa toast
              setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
              }, 2500)
              setLoadspin(false)
              return
           }
           prt_itens = CriaJsonItens('novo')
        }
        else {
           prt_itens = CriaJsonItens('editar')
        }
        let path_image = listacampos[4].link+listacampos[4].valor
        const formData = new FormData()
        let val_ativo = valorSeq(6) ? 1 : 0;
        formData.append('pro_nome', valorSeq(1))
        formData.append('pro_ativo', val_ativo)
        formData.append('pro_apelido', valorSeq(2))
        formData.append('pro_tipo', valorSeq(3))
        formData.append('pro_cpf_cnpj', valorSeq(4))
        formData.append('pro_path_image', path_image)
        formData.append('prt_itens', prt_itens)
        formData.append('file', listacampos[4].imgfile[0])
        if(proid == null ){
          axios
          .post(`${endpoint}/profissional`, formData, {
              headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token,//dentro do env//
              },
          })
          .then((result) => {
              Limpar(event)
              setSaved(!saved)
              setLoadspin(false)
              setValidated(false) //--> set form validation to original state <--//
              addToast(CompToast('Dados gravados com sucesso !!!', 'success')) //--> usa toast
              setTimeout(() => {
                  document.getElementById('idtoast').classList.remove('show')
                  document.getElementById('idtoast').remove()
              }, 2000)

          })
        } else {
            let tem_imagem = listacampos[4].imgfile.length
            if( tem_imagem > 0){
               formData.append('has_image', false)
            }
            formData.append('_method', 'put')
          axios
           .post(`${endpoint}/profissional/${proid}`, formData, {
              headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token,//dentro do env//
              },
          })
          .then((result) => {
              Limpar(event)
              setSaved(!saved) // change list state force re-render
              setLoadspin(false) // hide spin
              setValidated(false) // set form validation to original state
              setProid(null) // set update id flag to null
              addToast(CompToast('Dados Atulizados com sucesso !!!', 'success')) //--> usa toast
              setTimeout(() => {
                  document.getElementById('idtoast').classList.remove('show')
                  document.getElementById('idtoast').remove()
              }, 2000)
          })
        }
  }

  //-->mascaras
  const ValorInput = (props) => {
        const [value, setValue] = useState(props.valor)
        return (
            <IMaskInput
                className="form-control"
                mask={Number} // Define o tipo da máscara como numérico
                scale={2} // Quantidade de casas decimais
                signed={false} // Se permite números negativos
                //thousandsSeparator="." // Separador de milhar
                padFractionalZeros={true} // Se deve preencher com zeros (ex: 1.2 -> 1.20)
                normalizeZeros={true} // Remove zeros desnecessários à esquerda
                radix="." // Separador decimal (ex: vírgula para PT-BR)
                mapToRadix={['.']} // Mapeia o ponto do teclado numérico para a vírgula
                min={0} // Valor mínimo aceito
                max={999.99} // Valor máximo aceito

                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value)
                }}
                onBlur = {(e)=>atualizaDados(4,value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
        );
    };

   const DescontoInput = (props) => {
      const [value, setValue] = useState(props.valor)
        return (
            <IMaskInput
                className="form-control"
                mask={Number} // Define o tipo da máscara como numérico
                scale={2} // Quantidade de casas decimais
                signed={false} // Se permite números negativos
                //thousandsSeparator="." // Separador de milhar
                padFractionalZeros={true} // Se deve preencher com zeros (ex: 1.2 -> 1.20)
                normalizeZeros={true} // Remove zeros desnecessários à esquerda
                radix="." // Separador decimal (ex: vírgula para PT-BR)
                mapToRadix={['.']} // Mapeia o ponto do teclado numérico para a vírgula
                min={0} // Valor mínimo aceito
                max={999.99} // Valor máximo aceito

                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {(e)=>atualizaDados(4,value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
        )
  }

  const CPFInput = (props) => {
      const [value, setValue] = useState(props.valor)
        return (
            <IMaskInput
                className="form-control"
                mask='000.000.000-00' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {(e)=>atualizaDados(4,value)}
                defaultValue={value}
                placeholder="000.000.000-00"
                required
            />
        );
  }

  const CNPJInput = (props) => {
      const [value, setValue] = useState(props.valor)
        return (
            <IMaskInput
                className="form-control"
                mask='00.000.000/0000-00' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {(e)=>atualizaDados(5,value)}
                defaultValue={value}
                placeholder="00.000.000/0000-00"
                required
            />
        );
  }

  //--> Componente Input type text
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
              listatipo.map((item,index)=>{
                  return(
                    <option value={item.valor}>{item.nome}</option>
                  )
              })
            }
            </CFormSelect>
            {props.required ? (<CFormFeedback id={'btinvaid'+props.seq} invalid>{props.erro}</CFormFeedback>) : (<></>) }
        </CInputGroup>
    )
  }

  const DropDownExperiencia = () =>{
   return(
    <CTooltip content="Adicionar Tempo de Experiência" placement="top">
    <CDropdown variant="btn-group">
      <CDropdownToggle size="sm" style={{maxHeight:'38px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Experiencia</CDropdownToggle>
      <CDropdownMenu>
      {
        lista_experiencia.map((item,index)=>{
            return(
                <CDropdownItem style={{fontSize:'13px'}} href="#" onClick={(e)=>AlteraExperiencia(e,item.qtde)}>
                   {item.qtde}
                </CDropdownItem>
            )
        })
      }
      </CDropdownMenu>
     </CDropdown>
     </CTooltip>
    )
  }

  //Cria Json de Item do Tratamento
  const CriaJsonItens = (acao) =>{

    let obj = null
    let arrayitens = []
    listaitens.map((item,index)=>{
       //prt_id_prt,prt_id_tra,prt_id_pro,prt_tempo_experiencia,prt_ativo,prt_created_at,prt_updated_at,prt_deleted_at
       obj ={
         prt_ativo:item.tra_display,
         prt_id_tra:item.tra_id_tra,
         prt_tempo_experiencia:item.tra_experiencia,
         prt_exclui:item.tra_exclui
       }

       if( acao == 'editar'){
          obj.prt_id_prt = item.prt_id_prt
          obj.prt_exclui = item.tra_exclui
       }

       arrayitens.push(obj)
    })
    let objfinal = {
       "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }

  //--> Componente Input type text
  const InputSelectAdd = (props) =>{

       let array =['badge1','badge2','badge3','badge4','badge5','badge6','badge7']
       let classe = ''
       let idxclasse = -1

       return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
            <CTooltip content="Selecionar Tratamento" placement="top">
                <CDropdown variant="btn-group">
                    <CDropdownToggle size="sm" style={{maxHeight:'38px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Escolher</CDropdownToggle>
                    <CDropdownMenu>
                    {
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
                                <CDropdownItem style={{fontSize:'13px'}} href="#" onClick={(e)=>AlteraEscolha(e,item.tra_id_tra,item.tra_titulo)}>
                                    <CBadge className={array[idxclasse]} color="success">{item.tra_servico.ser_titulo}</CBadge>&nbsp;{item.tra_servico.ser_titulo+' - '+item.tra_titulo}
                                </CDropdownItem>
                            </>
                            )
                        })
                    }

                    </CDropdownMenu>
                </CDropdown>
            </CTooltip>
            <CFormInput value={itematualtexto} placeholder='Item selecionado'readOnly/>
            <DropDownExperiencia/>
            <CFormInput style={{maxWidth:'62px'}} value={itemqtdeatualtexto} placeholder='Anos'readOnly/>
            <CTooltip content="Adicionar Tratamento" placement="right">
                <CInputGroupText style={{maxHeight:'38px',borderRadius:'0px 5px 5px 0px'}}  onClick={(e)=>addTratamento(e)} className="clinputtext">
                    {props.label1}&nbsp;&nbsp;<FontAwesomeIcon className="cpointer" size="sm" style={{color:'white'}} icon={faCircleArrowDown}/>
                </CInputGroupText>
            </CTooltip>
            {/* {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) } */}
        </CInputGroup>
    )
  }


  //--> Componente Input type text
  const InputSelectAddOficial = (props) =>{
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
               feedbackInvalid={props.erro}
               required={props.required}
               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            >
            {
            //   <option value="">{''}</option>
              listafiltrotra.map((item,index)=>{
                  return(
                    <option value={item.tra_id_tra}>{item.tra_servico.ser_titulo+' - '+item.tra_titulo}</option>
                  )
              })
            }
            </CFormSelect>
            <CInputGroupText style={props.estilo} className="clinputtext has-validation">
                {props.label1}&nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faCircleArrowDown}/>
            </CInputGroupText>
            {/* {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) } */}
        </CInputGroup>
    )
  }

  //--> Componente Input type text
  const InputTextoValor = (props) =>{
    console.log(props.index)
    let dados = lista[props.index]
    console.log(dados)
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
            <ValorInput valor={valorglobal} est={estadovalor}/>
            {/* <CFormInput
               id={props.titulo}
               placeholder={props.placeholder}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
               defaultValue={props.valor}
               //feedbackInvalid={props.erro}
               required={props.required}
               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            /> */}
            {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
        </CInputGroup>
    )
  }

  const InputTextoDesconto = (props) =>{
    console.log(props.index)
    let dados = lista[props.index]
    console.log(dados)
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
            <DescontoInput valor={descontoglobal}/>
            {/* <CFormInput
               id={props.titulo}
               placeholder={props.placeholder}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
               defaultValue={props.valor}
               //feedbackInvalid={props.erro}
               required={props.required}
               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            /> */}
            {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
        </CInputGroup>
    )
  }

  const InputTextoCPFCNPJ = (props) =>{
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
            {
              tipoglobal == 1 ? (<CPFInput valor={valorglobal}/>) :<CNPJInput valor={valorglobal}/>
            }
            {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
        </CInputGroup>
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
               required={props.required}
               //feedbackInvalid={props.erro}

               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            />
            {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
        </CInputGroup>
    )
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
                    <CFormCheck id="defaultCheck1" required={props.required} checked onChange={(e)=>atualizaDados(props.seq,e.target.checked)}/>
                     {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
                </div>)
             : (<div className='ms-2 mt-2'>
                    <CFormCheck id="defaultCheck1" required={props.required} onChange={(e)=>atualizaDados(props.seq,e.target.checked)}/>
                    {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
                </div>)
            }

        </CInputGroup>
    )
  }

  const InputTextArea = (props) =>{
    let texto_botao = props.idfield === 0 ? 'Salvar' : 'Atualizar'
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext">{props.titulo}</CInputGroupText>
            <CFormTextarea
               id={props.titulo}
               placeholder={props.placeholder}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
               rows={props.linhas}
               defaultValue={props.valor}
               onChange={(e)=>setValor(props.id,'valor',e.target.value)}
            />
            <Dropdown id={props.id} tipo={props.tipo}/>
            <CButton type="button" style={stylebtsave} color="success" variant="outline" id="button-addon1" onClick={(e)=>handleClick(e,props.id,'spinner',true)}>
                {texto_botao}&nbsp;{props.load ? <SpinnerComp size="sm" color="primaty"/> : <></>}
            </CButton>
        </CInputGroup>
    )
  }


  const onImageChange = (e) =>{
    let obj = null
    if (event.target.files && event.target.files[0]) {
      let imagem = event.target.files[0]
      listacampos[4].valor = event.target.files[0].name;
      listacampos[4].imgfile.length = 0;
      listacampos[4].imgfile.push(event.target.files[0])
      setMainimage(event.target.files[0])
      console.log(listacampos)
      setEst(!est)
    }
  }

  const onRemoveAnexo = (event) =>{
    listacampos[4].valor = ''
    listacampos[4].imgfile.length = 0;
     setEst(!est)
  }

  const BadgeImg = (props) =>{
        const fonte = props.fonte ? props.fonte : '10px'
        const largura = props.fonte ? '110px' : ''
        return(
           <CBadge style={{minWidth:largura,borderRadius:'5px',fontSize:fonte,display:'inline-flex',alignItems:'center'}} color={props.color}>{props.valor}</CBadge>
        )
  }

  const ImageSimple = (props) => {
      return(
          <>
          { props.imgsaved ? (<div className='mb-1 d-flex justify-content-center align-items-center'><CCardImage style={styleimg} src={endpoint_img + props.link + props.valor}/></div>) :(<></>)}
          <CInputGroup className="mb-3">
              <CInputGroupText style={props.estilo} className="clinputtext">{props.label}</CInputGroupText>
              <CFormInput
                 type="file"
                 id="inputGroupFile03"
                 aria-describedby="inputGroupFileAddon03"
                 aria-label="Upload"
                 onChange={(e)=>onImageChange(e)}
                 //value={mainimage}
                 //required={props.required}
              />
              {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) }
          </CInputGroup>
          <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'5px'}}>
              <div className="circleimg">
                <CTooltip content="Excluir Imagem" placement="top">
                    <FontAwesomeIcon onClick={(e)=>onRemoveAnexo(e)} style={{cursor:'pointer',color:'red'}} icon={faTrash} />
                </CTooltip>
              </div>
              { props.valor == null ? (<></>) : (<BadgeImg color="primary" fonte="11px" valor={props.valor}/>) }
          </div>
          </>
      )
   }


  const AlteraEscolha = (event,item,valor) =>{
    setItematual(item)
    setItematualtexto(valor)
    console.log(listacampos)
  }

  const AlteraExperiencia = (event,valor) =>{
    setItemqtdeatual(valor)
    setItemqtdeatualtexto(valor)
  }

  //--> Atualiza o campo display do campo na tabela
  const atualizaLista = (id,event) =>{
     let valor = event.target.checked == true ? 1 : 0
     setListaprofissional(prevItems =>
            prevItems.map(item =>
                item.pac_id_pac === id ? { ...item, pac_display: valor } : item
            )
     )
     setEst(!est)
     AualizaExibe(id,valor,'display')
     console.log(listaprofissional)
  }

  //--> Atualiza o campo display do campo na tabela
  const atualizaListaAtivo = (id,event) =>{
     let valor = event.target.checked == true ? 1 : 0
     setListaprofissional(prevItems =>
            prevItems.map(item =>
                item.pro_id_pro === id ? { ...item, pro_ativo: valor } : item
            )
     )
     setEst(!est)
     AualizaExibe(id,valor,'ativo')
     console.log(listaprofissional)
  }

  //--> Atualiza o campo display do campo na tabela
  const atualizaListaItem = (id,event) =>{
     let valor = event.target.checked == true ? 1 : 0
     setListaitens(prevItems =>
            prevItems.map(item =>
                item.tra_id_tra === id ? { ...item, tra_display: valor } : item
            )
     )
     setEstitens(!estitens)
     AualizaExibe(id,valor)
     console.log(listafiltro)
  }

  //--> Exibe os dados da Tabela
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
                        {item.pro_load ? (<CSpinner size="sm" color="primary"/>) : (item.pro_id_pro)}
                    </CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                       {
                            item.pro_ativo == true ?
                            (<CFormCheck style={{backgroundColor:'#5243C2'}} checked onChange={(e)=>atualizaListaAtivo(item.pro_id_pro,e)}/>) :
                            (<CFormCheck style={{backgroundColor:'white'}} onChange={(e)=>atualizaListaAtivo(item.pro_id_pro,e)}/>)
                       }
                    </CTableDataCell>
                    <CTableDataCell>{item.pro_nome}</CTableDataCell>
                    <CTableDataCell>{item.pro_apelido}</CTableDataCell>
                    <CTableDataCell>{item.pro_tipo == 1 ? 'Física' : 'Jurídica'}</CTableDataCell>
                    <CTableDataCell>{item.pro_cpf_cnpj}</CTableDataCell>
                    <CTableDataCell>{item.pro_path_image}</CTableDataCell>
                    <CTableDataCell>{item.pro_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.pro_id_pro}/></CTableDataCell>
                    </CTableRow>
               )
            }
         })
      )
  }

const CorpoTabelaItens = (props) =>{
      let classe = null
      return(
         props.lista.filter((it) => it.tra_exclui === 'N').map((item,index)=>{
            return(
                <CTableRow color={classe}>
                    <CTableDataCell>{item.tra_id_tra}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                      {
                        item.tra_display == true ?
                        (<CFormCheck checked onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>) :
                        (<CFormCheck onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>)
                      }
                    </CTableDataCell>
                    <CTableDataCell>{item.tra_servico}</CTableDataCell>
                    <CTableDataCell>{item.tra_titulo}</CTableDataCell>
                    <CTableDataCell>{item.tra_texto}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.tra_experiencia}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.tra_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcaoAdd id={item.tra_id_tra}/></CTableDataCell>
               </CTableRow>
               )
        })
      )
  }


  //export default memo(CorpoTabelaItens);

  const addTratamento = () =>{

    if(ValorSetado()){
       return
    }

    if(ValorQtde()){
       return
    }

    if(Existe(itematual)){
       return
    }

    let idx = itematual
    let lista = listaitens
    let filtro  = listafiltrotra.filter((item)=>item.tra_id_tra === idx)
    let obj = {
      tra_load:false,
      tra_id_tra:filtro[0].tra_id_tra,
      tra_display:filtro[0].tra_display == 1 ? true : false,
      tra_servico:filtro[0].tra_servico.ser_titulo,
      tra_titulo:filtro[0].tra_titulo,
      tra_texto:filtro[0].tra_texto,
      tra_experiencia:itemqtdeatual,
      tra_created_at:null,
      tra_exclui:'N'
    }
    listaitens.push(obj)
    setEstitens(!estitens)
    setItematual(null)
    setItematualtexto(null)
    setItemqtdeatual(null)
    setItemqtdeatualtexto(null)
    atualizaDados(4,val)
    setValorglobal(val)
   }

    const AddItensEdit = (lista) =>{
      listaitens.length = 0
      let obj = null
      lista.map((item,index)=>{
         obj={
            tra_load:false,
            tra_id_tra:item.prt_id_tra,
            prt_id_prt:item.prt_id_prt,
            tra_display:item.prt_ativo  == 1 ? true : false,
            tra_exclui:'N',
            tra_servico:item.tratamento.servico_api.ser_titulo,
            tra_titulo:item.tratamento.tra_titulo,
            tra_texto:item.tratamento.tra_texto,
            tra_experiencia:item.prt_tempo_experiencia,
            tra_created_at:item.prt_created_at
         }
         listaitens.push(obj)
      })
      console.log(listaitens)
   }

  const Existe = (index) =>{
     let filtro  = listaitens.filter((item)=>item.tra_id_tra === index)
     let achou = false
     if( filtro.length > 0){
        achou = true
        addToast(CompToast('Item já foi adicionado na lista!!!', 'danger')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
        }, 2000)
     }
     return achou
  }

  const ValorSetado = (index) =>{
     let achou = false
     if( itematual === null){
        achou = true
        addToast(CompToast('Nenhum Item foi selecionado!!!', 'danger')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
            //console.log(listafiltro)
        }, 2000)
     }
     return achou
  }

  const ValorQtde = (index) =>{
     let achou = false
     if( itemqtdeatual === null){
        achou = true
        addToast(CompToast('Nenhuma Experiencia foi definida!!!', 'danger')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
            //console.log(listafiltro)
        }, 2000)
     }
     return achou
  }

  const ExcluirItem = (event,id) =>{
     let index = getIndexProfissional(listaitens,id)
    //  console.log(listaitens)
    //  listaitens[index].pai_exclui = 'S'
     listaitens.splice(index,1)
     setListaitens(listaitens)
     setEstitens(!estitens)
     setItematual(null)
     setItematualtexto(null)
     atualizaDados(4,val)
  }

  const ExcluirItemTratamento = (event,id) =>{
     let index = getIndexItensPacote(listaitens,id)
     listaitens[index].tra_exclui='S'
     console.log(listaitens)
     setListaitens(listaitens)
     setEstitens(!estitens)
     setItematual(null)
     setItematualtexto(null)
  }


  //--> Edita os campos e atualiza os dados
  const EditaProfissional = (id) =>{
      let idx = getIndexProfissional(listaprofissional,id)
      listacampos[0].valor = listaprofissional[idx].pro_nome
      listacampos[1].valor = listaprofissional[idx].pro_apelido
      listacampos[2].valor = listaprofissional[idx].pro_tipo
      listacampos[5].valor = listaprofissional[idx].pro_ativo == 1 ? true : false
      listacampos[6].valor = listaprofissional[idx].pro_created_at
      setValorglobal(listaprofissional[idx].pro_cpf_cnpj)
      listacampos[3].valor = listaprofissional[idx].pro_cpf_cnpj
      listacampos[4].imgsaved = true
      let imagepath = listaprofissional[idx].pro_path_image.split('/')
      listacampos[4].valor = imagepath[1]
      listacampos[4].required = false
      AddItensEdit(listaprofissional[idx].pro_tratamentos)
      setProid(listaprofissional[idx].pro_id_pro)
      setEst(!est)
      console.log(listacampos)
      console.log(listaprofissional[idx])
      scrollToId('target-id')
  }

  const EditaValorModal = (id) =>{
    let idx = getIndexProfissional(listatratamento,id)
    let obj ={
        tra_id_tra:listatratamento[idx].tra_id_tra,
        tra_titulo:listatratamento[idx].tra_titulo,
        tra_servico:listatratamento[idx].tra_servico.ser_titulo,
        tra_valor:listatratamento[idx].tra_valor_atual ? listatratamento[idx].tra_valor_atual.tva_valor : null,
        tra_desconto:listatratamento[idx].tra_valor_atual ? listatratamento[idx].tra_valor_atual.tva_max_desconto : null,
    }
    setDadosmodal(obj)
    openModal()
  }

  //--> Limpa os campos e resseta o form
  const Limpar = (event) => {
     listacampos[0].valor = null
     listacampos[1].valor = null
     listacampos[2].valor = ''
     listacampos[4].imgsaved = false
     listacampos[4].imgfile.length = 0
     listacampos[4].required = true
     listacampos[4].valor = ''
     listacampos[5].valor = ''
     listacampos[6].valor = ''
     listacampos[7].valor = ''
     listaitens.length = 0
     setValorglobal(null)
     setProid(null)
     setEst(!est)
     setValidated(false)
  }

  //--> Display dos Ícones no grid
  const ItensAcao = (props) => {
    return(
       <>
       <CTooltip content="Excluir Registro" placement="top">
         <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       </CTooltip>
       &nbsp;
       <CTooltip content="Editar Registro" placement="top">
           <FontAwesomeIcon onClick={(e)=>EditaProfissional(props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
        </CTooltip>
       </>
    )
  }

  //--> Display dos Ícones no grid
  const ItensAcaoAdd = (props) => {
    return(
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash} onClick={(e)=>ExcluirItemTratamento(e,props.id)}/>
    )
  }

  //--> Atualiza o display de exibição do traviço
   const AualizaExibe = (id,valor,campo) =>{
        setListaprofissional(prevItems =>
            prevItems.map(item =>
                item.pro_id_pro === id ? { ...item, pro_load: true } : item
            )
        )
        const formData = new FormData()
        let valck = valor ? 1 : 0
        formData.append('pro_ativo', valck)
        formData.append('_method', 'put')

        axios
        .post(`${endpoint}/profissional/${id}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setListafiltro(prevItems =>
                prevItems.map(item =>
                     item.pro_id_pro === id ? { ...item, pro_ativo: valor } : item
                )
            )
            setListaprofissional(prevItems =>
                prevItems.map(item =>
                        item.pro_id_pro === id ? { ...item, pro_ativo: valor } : item
                )
            )
            //setListatratamento(listafiltro.slice(0,5))
            setListaprofissional(prevItems =>
                prevItems.map(item =>
                    item.pro_id_pro === id ? { ...item, pro_load: false } : item
                )
            )
            setEst(!est)
            addToast(CompToast('Alteração efetuada com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                //console.log(listafiltro)
            }, 2000)
        })
  }

  //--> Pega o campo pela sequência
  const getIndexSeq = (lista,seq) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].seq === seq){
          return i
        }
    }
  }

  //--> Retorna o valor da lista pela sequencia informada
  const valorSeq = (seq) =>{
    let idx  = getIndexSeq(listacampos,seq)
    return listacampos[idx].valor
  }


  //--> Envia o Cursor ao id informada
  const scrollToId = (id) => {
    const element = document.getElementById(id);
     if (element) {
         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
  };

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

  //--> Rotina de Pesquisa de dados do grid
  const pesquisarGrid = (event) => {
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.pro_nome.toLowerCase().includes(valor.toLowerCase()) ||
                    item.pro_apelido.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListaprofissional(lista.slice(0,5))
     } else {
        setListaprofissional(listafiltro.slice(0,5))
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
    lista = listafiltro.slice(inicio,fim)
    setRegistroini(inicio+1)
    if(fim > qtderegistros){
       setRegistrofim(qtderegistros)
    } else {
       setRegistrofim(fim)
    }
    setListaprofissional(lista)
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

  //--> Efetua a validação do form e envoia os dados
  const handleSubmit = (event) => {
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
           saveProfissional(event)
        }
  }

  return(
         <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
           <ModalTratamentoValor icone={faBrazilianRealSign} isOpen={openmodal} dados={dadosmodal} close={closeModal} token={token}/>
           <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
           <CCard className="mb-4">
             <div id="target-id"></div>
             <CCardHeader className="clfooter">
               <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Mantenção de Profissionais</span>
             </CCardHeader>
             <CCardBody>
                <CForm
                   className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>
                    <CRow className='mt-3'>
                        <CCol md={12} xs={12} >
                            {/* {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples {...listacampos[0]} />)} */}
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples index="0" {...listacampos[0]}/>)}
                        </CCol>
                        <CCol md={12} xs={12} >
                            {/* {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples {...listacampos[0]} />)} */}
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples index="0" {...listacampos[1]}/>)}
                        </CCol>
                    </CRow>
                    <CRow className='mt-1'>
                        <CCol md={3} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples index="3" {...listacampos[2]}/>)}
                         </CCol>
                         <CCol md={4} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoCPFCNPJ {...listacampos[3]}/>)}
                         </CCol>
                         <CCol md={2} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoCheck {...listacampos[5]}/>)}
                         </CCol>
                         <CCol md={3} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[6]}/>)}
                        </CCol>

                    </CRow>
                    <CRow>
                        <CCol md={6} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <ImageSimple {...listacampos[4]}/>)}
                        </CCol>
                    </CRow>
                    <CRow className='mb-3 mt-3'>
                        <CCol md={6} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <CBadge className='badge8' color="primary">Associar Tratamentos</CBadge>)}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={10} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectAdd {...listacampos[7]}/>)}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={10} xs={12} >
                            <CCard style={{padding:'3px'}}>
                                <CTable responsive>
                                    <CTableHead style={{fontSize:'11px !important'}}>
                                        <CTableRow>
                                            <CTableHeaderCell className='clthinterno' scope="col" style={{borderRadius:'5px 0px 0px 0px'}}>#</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Exibir</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Serviço</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Tratamento</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Descrição</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Tempo Experiencia</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CorpoTabelaItens lista={listaitens} estado={estitens}/>
                                    </CTableBody>
                                </CTable>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow className='mt-3'>
                        <CCol md={12} xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                            <CTooltip content="Efetuar Agendamentos" placement="top">
                                <CButton
                                        onClick={(e)=>abretela('Agendamento')}
                                        className='clinputtext mb-3'
                                        type="button"
                                        style={{width:'200px',borderRadius:'5px 5px 5px 5px',color:'white'}} >
                                            Agendamentos&nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faCalendar}/>
                                </CButton>
                            </CTooltip>
                            &nbsp;
                            <CTooltip content="Limpar Dados do Formulário" placement="top">
                                <CButton style={{height:'38px'}} onClick={(e)=>Limpar(e)} color="secondary">Limpar / Novo Registro
                                    &nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faEraser}/>
                                </CButton>
                            </CTooltip>
                            &nbsp;
                            <CTooltip content="Gravar Infomações" placement="top">
                                <CButton
                                    //saveProfissional()
                                    className='clinputtext mb-3'
                                    type="submit"
                                    style={{width:'110px',borderRadius:'5px 5px 5px 5px',color:'white'}} >
                                        Salvar&nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faSave}/>
                                        { loadspin ? (<>&nbsp;<CSpinner size="sm"/></>) : (<></>)}
                                </CButton>
                            </CTooltip>
                        </CCol>
                    </CRow>
                  </CForm>
                  <CRow className='mb-0 mt-1'>
                        <CCol md={6} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <CBadge className='badge8' color="primary">Listagem de Profissionais</CBadge>)}
                        </CCol>
                  </CRow>
                  <CRow className='mt-3'>
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
                                        <CTableHeaderCell className='clthinterno' scope="col">Nome</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Apelido</CTableHeaderCell>
                                        <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Tipo</CTableHeaderCell>
                                        <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">CPF/CNPJ</CTableHeaderCell>
                                        <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Imagem</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CorpoTabela lista={listaprofissional} estado={est}/>
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
             </CCardBody>
           </CCard>
         </div>
  )

}

export default ManProfissionais
