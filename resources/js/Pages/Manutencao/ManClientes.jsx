import { React,useEffect, useState, Suspense, useRef } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { SpinnerComp } from '../../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img01 from '../../images/foto01.jpeg'
import img02 from '../../images/foto02.png'
import { faSave, faEdit, faTrash, faEraser,faFilePdf, faSearch, faCancel, faCircleXmark, faCircleArrowDown, faCircleArrowUp, faCalendar  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  CTable, CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,CTableHead,
  CButton,CFormSelect,
  CCard,CCardBody,CCardFooter,CCardGroup,CCardHeader,CCardImage,CCardLink,CCardSubtitle,CCardText,CCardTitle,
  CCol,
  CSpinner,
  CRow,
  CPlaceholder,
  CFormInput,
  CFormTextarea,
  CAlert,
  CInputGroup,CInputGroupText,
  CFormLabel,CFormCheck,CForm,CFormFeedback,
  CToaster,CToast,CToastBody,CToastClose,
  CBadge,
  CContainer,
  CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem,
  CImage,
  CCollapse,
  CPagination, CPaginationItem,CTooltip
} from '@coreui/react'
import { useStore } from '../../store/useStore';
import { io } from 'socket.io-client';
import { LineElement } from 'chart.js';
import { ModalAgendamentoCliente } from '../../components/ModalAgendamentoCliente';

//const io = require('socket.io-client');
//const socket = io('http://jemosistemas-domain.com/inertia-react/salao');

const ManClientes = (props) =>{

  const { changetestemunho } = useStore();
  const [loadpage,setLoadpage] = useState(true)
  const [loadspin,setLoadspin] = useState(false)
  const [loaditens,setLoaditens] = useState(false)
  const [icone,setIcon] = useState(null)
  const [clienteatual,setClienteatual] = useState(null)
  const [idclienteatual,setIdClienteatual] = useState(null)
  const [listacampos,setListacampos] = useState([])
  const [listatags,setListatags] = useState([])
  const [listatipos,setListatipos] = useState([])
  const [listaagendas,setListaagendas] = useState([])
  const [listafiltroagendas,setListafiltroagendas] = useState([])
  const [listacliente,setListacliente] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [estcard,setEstcard] = useState(false)
  const [est,setEst] = useState(false)
  const [estitens,setEstitens] = useState(false)
  const [textosubmit,setTextosubmit] = useState('Salvar')
  const [estform,setEstform] = useState(true)
  const [cliid,setCliid] = useState(null)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [pesquisar,setPesquisar] = useState(null)
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [validated, setValidated] = useState(false)
  const [openmodal,setOpenmodal] = useState(false)
  const [dadosagenda,setDadosAgenda] = useState(null)
  const [itematualtexto,setItematualtexto] = useState(null)
  const [tratamento,setTratamento] = useState(null)
  const token = props.token
  const sei_display = 1
  const empresa = props.dados_section.sec_id_emp
  const endpoint = props.end
  const endpoint_img = import.meta.env.VITE_APP_ENDPOINT_IMG
  const sei_id_sec = props.dados_section.sec_id_sec
  const toaster = useRef(null)
  const style = {width:'94px'}
  const stylebtsave = {width:'92px'}
  const styleinputcard = {width:'92px'}
  const styleinputcardimg = {width:'40px'}
  const styleimg = {width:'20%',marginRight:'auto'}
  const style_dropdown = {borderRadius:'0px 0px 0px 0px',width:'118px',backgroundColor:'#200D35',color:'white'}
  const style_placeholder = {paddingBottom:'15px'}
  const style_cursor = {cursor:'pointer'}
  //console.log(props)

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

  const getIndexCli = (lista,id) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].cli_id_cli === id){
          return i
        }
    }
  }

  const getTipoTag = (valor) =>{
    let array = listatags.filter((item)=> item.tag_nome === valor)
    return array[0].tag_id_tag
  }

  const lista_tipo_telefone  = [
    {
      id:'',
      nome:'Tipo de Telefone'
    },
    {
      id:'1',
      nome:'Celular'
    },
    {
      id:'2',
      nome:'Fixo'
    }
  ]

  const array_campos = [//cli_name,cli_cpf,cli_email,cli_tipo_telefone,cli_telefone,cli_ativo,cli_created_at,cli_updated_at
     {
       seq:1,
       nome:'cli_name',
       label:'Nome',
       placeholder:'Informe o Nome do Cliente',
       readonly:false,
       feedbackerro:'O Nome do Cliente deve ser Informado'
     },
     {
       seq:2,
       nome:'cli_cpf',
       label:'CPF',
       placeholder:'Informe o CPF',
       readonly:false,
       feedbackerro:'O CPF deve ser Informado'
     },
     {
       seq:3,
       nome:'cli_email',
       label:'Email',
       placeholder:'Informe o Email do Pix',
       readonly:false,
       feedbackerro:'O Email deve ser Informado'
     },
     {
       seq:4,
       nome:'cli_tipo_telefone',
       label:'Tipo Tel',
       placeholder:'Tipo de Telefone',
       readonly:false,
       feedbackerro:'O Tipo de Telefone deve ser Informado'
     },
     {
       seq:5,
       nome:'cli_telefone',
       label:'Telefone',
       placeholder:'Informe o Telefone',
       readonly:false,
       feedbackerro:'O Telefone deve ser Informado'
     },
     {
       seq:6,
       nome:'cli_ativo',
       label:'Ativo',
       placeholder:'Ativo',
       readonly:false
     },
     {
       seq:7,
       nome:'cli_created_at',
       label:'Criacão',
       placeholder:'Data de Criação',
       readonly:true
     }
  ]

  const lista =[
    {
      idfield:0,
      seq:array_campos[0].seq,
      id:null,
      nome:array_campos[0].nome,
      label:array_campos[0].label,
      placeholder:array_campos[0].placeholder,
      feedbackerro:array_campos[0].feedbackerro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {
      idfield:0,
      seq:array_campos[1].seq,
      id:null,
      nome:array_campos[1].nome,
      label:array_campos[1].label,
      placeholder:array_campos[1].placeholder,
      feedbackerro:array_campos[1].feedbackerro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {
      idfield:0,
      seq:array_campos[2].seq,
      id:null,
      nome:array_campos[2].nome,
      label:array_campos[2].label,
      placeholder:array_campos[2].placeholder,
      feedbackerro:array_campos[2].feedbackerro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {
      idfield:0,
      seq:array_campos[3].seq,
      id:null,
      nome:array_campos[3].nome,
      label:array_campos[3].label,
      placeholder:array_campos[3].placeholder,
      feedbackerro:array_campos[3].feedbackerro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {
      idfield:0,
      seq:array_campos[4].seq,
      id:null,
      nome:array_campos[4].nome,
      label:array_campos[4].label,
      placeholder:array_campos[4].placeholder,
      feedbackerro:array_campos[4].feedbackerro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:true
    },
    {
      idfield:0,
      seq:array_campos[5].seq,
      id:null,
      nome:array_campos[5].nome,
      label:array_campos[5].label,
      placeholder:array_campos[5].placeholder,
      feedbackerro:array_campos[5].feedbackerro,
      readonly:false,
      estilo:style,
      type:'input',
      valor:'',
      required:false
    },
    {
      idfield:0,
      seq:array_campos[6].seq,
      id:null,
      nome:array_campos[6].nome,
      label:array_campos[6].label,
      placeholder:array_campos[6].placeholder,
      feedbackerro:array_campos[4].feedbackerro,
      readonly:true,
      estilo:style,
      type:'input',
      valor:'',
      required:false
    }
 ]

 //--> Atualizações do Estado Inicial do Componente
 useEffect(()=>{
   setIcon(props.icon)
   setListatipos(props.tipos)
   setListatags(props.tags)
   console.log(lista)
   setLoadpage(true)
   const fetchData = async () => {
        try {

               const requests = [
                   axios.get(`${endpoint}/cliente?listagem=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                   }),
                   axios.get(`${endpoint}/bancos?filtro=S`,{
                       headers: {
                           Accept: 'application/json',
                           'Content-Type': 'multipart/form-data',
                           Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                       },
                   })
               ]

             const responses = await Promise.all(requests);
             let result_cliente = responses[0]
             let result_tratamento = responses[1]
             setListacliente(result_cliente.data.data.slice(0,5))
             setListafiltro(result_cliente.data.data)
             let tam = result_cliente.data.data.length
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
             result_tratamento.data.data.unshift({ban_id_ban:'',ban_nome:'Selecione o Banco',ban_sigla:''})
             //setListaagendas(result_tratamento.data.data)
             setListacampos(lista)
             setLoadpage(false)

        } catch (error) {
            console.error("One of the requests failed", error);
        }
   }
   fetchData()
   return
   axios
       .get(`${endpoint}/services?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           console.log(result)
           setListacliente(result.data.data.slice(0,5))
           setListafiltro(result.data.data)
           let tam = result.data.data.length
           setQtderegistros(tam)
           let res = tam % 5
           if( res % 2 ===0){
              setNumpagination(res)
           } else {
              res = res + 1
              setNumpagination(res)
           }
           setPaginaatual(1)
           if( tam > 0){
             setRegistroini(1)
             setRegistrofim(5)
           }
           setUltimapagina(res)
           setListacampos(lista)
           setLoadpage(false)
       })
 },[saved])

 const  handleSave = (id,lista,valor) =>{

     if( validaTipo(id) ){
       addToast(CompToast('O Tipo de dados deve ser informado !!!', 'danger')) //--> usa toast
       setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
       }, 2000)
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
  const saveCliente = () => {

        setLoadspin(true)
        const formData = new FormData()
        let val_ativo = valorSeq(6) ? 1 : 0;
        formData.append('cli_name', valorSeq(1))
        formData.append('cli_email', valorSeq(3))
        formData.append('cli_tipo_telefone', valorSeq(4))
        formData.append('cli_telefone', valorSeq(5))
        formData.append('cli_ativo', val_ativo)
        if(cliid == null ){
          axios
          .post(`${endpoint}/cliente`, formData, {
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
              setTimeout(() => {
                  document.getElementById('idtoast').classList.remove('show')
                  document.getElementById('idtoast').remove()
              }, 2000)
          })
        } else {
            formData.append('_method', 'put')
          axios
           .post(`${endpoint}/cliente/${cliid}`, formData, {
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
              setCliid(null) // set update id flag to null
              addToast(CompToast('Dados Atulizados com sucesso !!!', 'success')) //--> usa toast
              setTimeout(() => {
                  document.getElementById('idtoast').classList.remove('show')
                  document.getElementById('idtoast').remove()
                  setTextosubmit('Salvar')
              }, 2000)
          })
        }
  }

  const InputTexto = (props) =>{
    let texto_botao = props.idfield === 0 ? 'Salvar' : 'Atualizar'
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext">{props.titulo}</CInputGroupText>
            <CFormInput
               id={props.titulo}
               placeholder={props.placeholder}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
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

  //--> Componente Input type text
  const InputTextoSimples = (props) =>{
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
            <CFormInput
               id={props.titulo}
               placeholder={props.placeholder}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
               defaultValue={props.valor}
               feedbackInvalid={props.feedbackerro}
               required={props.required}
               readonly={props.readonly}
               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            />
            {/* {props.required ? (<CFormFeedback invalid>{props.feedbackerro}</CFormFeedback>) : (<></>) } */}
        </CInputGroup>
    )
  }

  //--> Componente Checkbox
  const InputTextoCheck = (props) =>{
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext">{props.label}</CInputGroupText>
            {
             props.valor === '1'
             ? (<div className='ms-2 mt-2'><CFormCheck id="defaultCheck1" checked onChange={(e)=>atualizaDados(props.seq,e.target.checked)}/></div>)
             : (<div className='ms-2 mt-2'><CFormCheck id="defaultCheck1" onChange={(e)=>atualizaDados(props.seq,e.target.checked)}/></div>)
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
                 feedbackInvalid={props.feedbackerro}
                 required={props.required}
                 onChange={(e)=>atualizaDados(props.seq,e.target.value)}
              >
              {
              //   <option value="">{''}</option>
                lista_tipo_telefone.map((item,index)=>{
                    return(
                      <option value={item.id}>{item.nome}</option>
                    )
                })
              }
              </CFormSelect>
          </CInputGroup>
      )
  }

  const InputSelectBancos = (props) =>{
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

                listaagendas.map((item,index)=>{
                    return(
                      <option value={item.ban_id_ban}>{item.ban_nome+' '+item.ban_sigla}</option>
                    )
                })
              }
              </CFormSelect>
              {props.required ? (<CFormFeedback id={'btinvaid'+props.seq} invalid>{props.erro}</CFormFeedback>) : (<></>) }
          </CInputGroup>
      )
  }

  //--> Componente Textarea
  const InputTextAreaSimples = (props) =>{
    return(
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext has-validation">{props.label}</CInputGroupText>
            <CFormTextarea
               id={props.titulo}
               placeholder={props.placeholder}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
               rows={props.linhas}
               defaultValue={props.valor}
               feedbackInvalid={props.feedbackerro}
               required={props.required}
               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            />
            {/* {props.required ? (<CFormFeedback invalid>{props.feedbackerro}</CFormFeedback>) : (<></>) } */}
        </CInputGroup>
    )
  }

  //--> Atualiza o campo display do campo na tabela
  const atualizaLista = (id,event) =>{
     console.log(id)
     let valor = event.target.checked == true ? 1 : 0
     setListacliente(prevItems =>
            prevItems.map(item =>
                item.ser_id_ser == id ? { ...item, ser_display: valor } : item
            )
     )
     setEst(!est)
     AualizaExibe(id,valor)
     console.log(listacliente)
  }

  const atualizaListaStatus = (id,event,val) =>{
     console.log(id)
     let valor = event.target.checked == true ? 1 : 0
     if(val === 'ativo'){
        setListacliente(prevItems =>
                prevItems.map(item =>
                    item.cli_id_cli == id ? { ...item, cli_ativo: valor } : item
                )
        )
        setEst(!est)
     }
     AualizaExibe(id,valor,val)
     console.log(listacliente)
  }

//   const atualizaAtual = (id) =>{
//     listacliente.map((item,index) => {
//        if (item.cli_id_cli != id) {
//           item.pix_atual = 0
//        }
//     })
//   }

  const CorpoTabelaItens = (props) =>{
        let classe = null
        let lista = props.lista.length > 0 ? props.lista : []
        let diasemana = ['','segunda','Terça','Quarta','Quinta','Sexta','Sábado']
        if(lista.length == 0 ){
            return
        } else {
            return(
            lista.map((item,index)=>{
                return(
                    <CTableRow color={classe}>
                        <CTableDataCell style={{textAlign:'center'}}></CTableDataCell>
                        <CTableDataCell>{item.cla_created_at}</CTableDataCell>
                        <CTableDataCell>{item.horario.dataagenda.dat_data}</CTableDataCell>
                        <CTableDataCell>{diasemana[item.horario.dataagenda.dat_diasemana]}</CTableDataCell>
                        <CTableDataCell>{item.horario.protratamento.profissional.pro_nome}</CTableDataCell>
                        <CTableDataCell>{item.horario.protratamento.tratamento.servico_api.ser_titulo}</CTableDataCell>
                        <CTableDataCell>{item.horario.protratamento.tratamento.tra_titulo}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'center'}}>
                            <Label agenda={item.horario.hoa_status_atual}/>
                        </CTableDataCell>
                        <CTableDataCell style={{textAlign:'right'}}>
                            <CBadge style={{backgroundColor:'#722E56'}}>
                               {item.horario.dataagenda.dat_horainicial+'-'+item.horario.dataagenda.dat_horafinal}
                            </CBadge>
                        </CTableDataCell>
                        {/* <CTableDataCell style={{textAlign:'center'}}>{item.cla_created_at}</CTableDataCell> */}
                        <CTableDataCell style={{textAlign:'center'}}><ItensAcaoAgenda idload={item.cla_id_cla} load={item.acao} id={item.horario.hoa_id_hoa}/></CTableDataCell>
                    </CTableRow>
                    )
            })
            )
        }
  }

  //--> Exibe os dados da Tabela
  const CorpoTabela = (props) =>{
      let classe = null
      return(
         props.lista.map((item,index)=>{
            classe = index % 2 == 0 ? 'primary' : 'danger'
            return(
              <CTableRow color={classe}>
                   <CTableDataCell>
                       {item.cli_load ? (<CSpinner size="sm" color="primary"/>) : (item.cli_id_cli)}
                   </CTableDataCell>
                   <CTableDataCell style={{textAlign:'center'}}>
                        {
                        item.cli_ativo == 1 ?
                        (<CFormCheck checked onChange={(e)=>atualizaListaStatus(item.cli_id_cli,e,'ativo')}/>) :
                        (<CFormCheck onChange={(e)=>atualizaListaStatus(item.cli_id_cli,e,'ativo')}/>)
                        }
                   </CTableDataCell>
                   <CTableDataCell>{item.cli_name}</CTableDataCell>
                   <CTableDataCell>{item.cli_cpf}</CTableDataCell>
                   <CTableDataCell>{item.cli_email}</CTableDataCell>
                   <CTableDataCell>{item.cli_tipo_telefone == 1 ? 'Celular' : 'Fixo'}</CTableDataCell>
                   <CTableDataCell>{item.cli_telefone}</CTableDataCell>
                   <CTableDataCell>{item.cli_created_at}</CTableDataCell>
                   <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.cli_id_cli}/></CTableDataCell>
                </CTableRow>
            )
         })
      )
  }

  //--> Edita os campos e atualiza os dados
  //pix_id_pix,pix_tipo,pix_chave,pix_nome_fantasia,pix_cidade,pix_id_ban,pix_ativo,pix_atual,pix_created_at,pix_updated_at,pix_deleted_at
  const EditaCliente = (id) =>{
     setTextosubmit('Atualizar')
     let idx = getIndexCli(listacliente,id)
     console.log('idx:'+idx)
     console.log(listacliente[idx])
     listacampos[0].valor = listacliente[idx].cli_name
     listacampos[1].valor = listacliente[idx].cli_cpf
     listacampos[2].valor = listacliente[idx].cli_email
     listacampos[3].valor = listacliente[idx].cli_tipo_telefone
     listacampos[4].valor = listacliente[idx].cli_telefone
     listacampos[5].valor = listacliente[idx].cli_ativo
     listacampos[6].valor = listacliente[idx].cli_created_at
     setCliid(listacliente[idx].cli_id_cli)
     pesquisaAgendas(listacliente[idx].cli_id_cli,null)
     setEst(!est)
  }

  //--> Limpa os campos e resseta o form
  const Limpar = (event) => {
     listacampos[0].valor = ''
     listacampos[1].valor = ''
     listacampos[2].valor = ''
     listacampos[3].valor = ''
     listacampos[4].valor = ''
     listacampos[5].valor = ''
     listacampos[6].valor = ''
     setClienteatual(null)
     listaagendas.length = 0
     setTextosubmit('Salvar')
     setCliid(null)
     setEst(!est)
     setValidated(false)
  }

  //--> Display dos Ícones no grid
  const ItensAcao = (props) => {
    return(
       <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       <FontAwesomeIcon style={{color:'#3B6DE3',cursor:'pointer'}} icon={faCalendar} onClick={(e)=>pesquisaAgendas(props.id,'limpa')}/>
       <FontAwesomeIcon onClick={(e)=>EditaCliente(props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </div>
    )
  }

  const getIndexAgendas = (id) =>{
     for(let i=0; i < listaagendas.length; i++){
        if( listaagendas[i].cla_id_cla === id){
          return i
        }
    }
  }

  const ItensAcaoAgenda = (props) => {
    return(
       <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
         <FontAwesomeIcon style={{color:'#3B6DE3',cursor:'pointer'}} icon={faSearch} onClick={(e)=>abreAgenda(props.id,props.idload)}/>
         &nbsp;{props.load ? <SpinnerComp size="sm" color="primaty"/> : <></>}
       </div>
    )
  }

  const abreAgenda = (id,idload) => {
    console.log(id)
    console.log(idload)
    let idx = getIndexAgendas(idload)
    console.log(listaagendas[idx])
    setListaagendas(prevItems =>
        prevItems.map(item =>
           item.cla_id_cla == idload ? { ...item, acao: true } : item
        )
    )
    setEstitens(!estitens)
    axios
        .get(`${endpoint}/horarioagenda?consultaagendadiafiltro=S&hoa_id_hoa=${id}`,{
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setListaagendas(prevItems =>
                prevItems.map(item =>
                item.cla_id_cla == idload ? { ...item, acao: false } : item
                )
            )
            console.log(listaagendas)
            setEstitens(!estitens)
            setDadosAgenda(result.data.data[0])
            setTratamento(result.data.data[0].hoa_tratamento.tra_titulo)
            setOpenmodal(true)
            setLoaditens(false)
        })
  }

  const BtCliAtual = (props) => {
    return (
        <CButton className="btexpandir" color="primary">
           Agendamentos Cliente: <CBadge style={{backgroundColor:'white',color:'#722E56'}} color="">{props.valor}</CBadge>
        </CButton>
    )
  }

  const pesquisaAgendas = (id,acao) =>{
      if( acao == 'limpa'){
        Limpar()
      }
      setLoaditens(true)
      axios
        .get(`${endpoint}/cliente/${id}`,{
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            let dados = result.data.data[0].agendamentos.sort((a,b)=>b.cla_id_hoa - a.cla_id_hoa)
            let idx = getIndexCli(listacliente,id)
            setClienteatual(listacliente[idx].cli_name)
            setIdClienteatual((listacliente[idx].cli_id_cli))
            setListaagendas(dados)
            setListafiltroagendas(dados)
            setLoaditens(false)
            // setListacliente(prevItems =>
            //     prevItems.map(item =>
            //         item.pix_id_pix === id ? { ...item, pix_load: false } : item
            //     )
            // )
            //setSaved(!saved)
            //setEst(!est)
            // addToast(CompToast('Alteração efetuada com sucesso !!!', 'success')) //--> usa toast
            // //changetestemunho()
            // setTimeout(() => {
            //     document.getElementById('idtoast').classList.remove('show')
            //     document.getElementById('idtoast').remove()
            // }, 2000)
        })
  }

  //--> Atualiza o display de exibição do serviço
  const AualizaExibe = (id,valor,val) =>{

        setListacliente(prevItems =>
            prevItems.map(item =>
                item.cli_id_cli === id ? { ...item, cli_load: true } : item
            )
        )

        const formData = new FormData()
        formData.append('cli_ativo', valor)
        formData.append('_method', 'put')

        axios
        .post(`${endpoint}/cliente/${id}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setListacliente(prevItems =>
                prevItems.map(item =>
                    item.cli_id_cli === id ? { ...item, cli_load: false } : item
                )
            )
            // setListafiltro(prevItems =>
            //     prevItems.map(item =>
            //         item.ser_id_ser === id ? { ...item, ser_exibe: valor } : item
            //     )
            // )
            //setSaved(!saved)
            setEst(!est)
            addToast(CompToast('Alteração efetuada com sucesso !!!', 'success')) //--> usa toast
            //changetestemunho()
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
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

  const atualizaDados = (seq,valor) =>{
    let index = getIndexSeq(listacampos,seq)
    listacampos[index].valor = valor
    console.log(listacampos)
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
     console.log(listafiltro)
     console.log(event.target.value)
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.cli_name.toLowerCase().includes(valor.toLowerCase()) ||
                    item.cli_cpf.toLowerCase().includes(valor.toLowerCase()) ||
                    item.cli_email.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListacliente(lista.slice(0,5))
     } else {
        setListacliente(listafiltro.slice(0,5))
     }
  }

  //--> Rotina de Pesquisa de dados do grid
  const pesquisarGridItens = (event) => {
    /*
    <CTableDataCell>{item.horario.protratamento.profissional.pro_nome}</CTableDataCell>
                        <CTableDataCell>{item.horario.protratamento.tratamento.servico_api.ser_titulo}</CTableDataCell>
                        <CTableDataCell>{item.horario.protratamento.tratamento.tra_titulo}</CTableDataCell>
    */
     console.log(listafiltro)
     console.log(event.target.value)
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltroagendas.filter(
            (item)=>item.horario.protratamento.profissional.pro_nome.toLowerCase().includes(valor.toLowerCase()) ||
                    item.horario.protratamento.tratamento.servico_api.ser_titulo.toLowerCase().includes(valor.toLowerCase()) ||
                    item.horario.protratamento.tratamento.tra_titulo.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListaagendas(lista)
     } else {
        setListaagendas(listafiltroagendas)
     }
  }

  //--> Efetuar a pesquisa pelo click
//   const clickPagination = (event,idx) =>{
//     //  0,5,5,10
//     let ref = idx == 1 ? 0 : idx
//     let inicio = ref == 0 ? ref : (ref * 5) - 5
//     let fim = idx * 5
//     let lista = null
//     lista = listafiltro.slice(inicio,fim)
//     setListacliente(lista)
//   }
  const clickPagination = (event,idx) =>{
    //  0,5,5,10
    setPaginaatual(idx)
    let ref = idx == 1 ? 0 : idx
    let inicio = ref == 0 ? ref : (ref * 5) - 5
    let fim = idx * 5
    let lista = null
    lista = listafiltro.slice(inicio,fim)
    setRegistroini(inicio+1)
    if(fim > qtderegistros){
       setRegistrofim(qtderegistros)
    } else {
       setRegistrofim(fim)
    }
    setListacliente(lista)
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


  //--> Exibe o componente de paginação
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
           saveCliente()
        }
  }

  const Label = (props) => {
      let status = null
      let classe = null
      /*
      "hoa_agendado": "N",
      "hoa_confirmado": "N",
      "hoa_cancelado": "N",
      "hoa_finalizado": "N",
      "hoa_pago": "N",
      */
      switch(props.agenda){
        case 'L':
            status = 'Liberado'
            classe = 'badgeliberado badgecoldados'
        break
        case 'C':
            status = 'Cancelado'
            classe = 'badgecancelado badgecoldados'
        break
        case 'A':
            status = 'Agendado'
            classe = 'badgeagendado badgecoldados'
        break
        case 'F':
            status = 'Finalizado'
            classe = 'badgefinalizado badgecoldados'
        break
        case 'N':
            status = 'Confirmado'
            classe = 'badgeconfirmado badgecoldados'
        break
        case 'B':
            status = 'Bloqueado'
            classe = 'badgebloqueado badgecoldados'
        break
      }

      return(
         <CBadge className={classe}>{status}</CBadge>
       )
  }

  return(
         <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
           <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
           <ModalAgendamentoCliente open={openmodal} close={setOpenmodal} agenda={dadosagenda} tratamento={tratamento}/>
           <CCard className="mb-4">
             <CCardHeader className="clfooter">
               <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Manutenção Clientes</span>
             </CCardHeader>
             <CCardBody>
                <CForm
                   className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated} est={estform}>
                    <CRow className='mt-3'>
                    <CCol md={12} xs={12} >
                        {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[0]}/>)}
                    </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[1]}/>)}
                        </CCol>
                    </CRow>
                    <CRow>
                    <CCol md={12} xs={12} >
                        {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[2]}/>)}
                    </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={6} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples {...listacampos[3]}/>)}
                        </CCol>
                        <CCol md={6} xs={12}>
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[4]}/>)}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={6} xs={12}>
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoCheck {...listacampos[5]}/>)}
                        </CCol>
                        <CCol md={6} xs={12}>
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[6]}/>)}
                        </CCol>
                    </CRow>
                    <CRow className='mb-3 mt-3'>
                        <CCol md={10} xs={12} >
                            {/* <CBadge color="primary">Cliente:{clienteatual}</CBadge> */}
                            <CRow>
                               <CCol md={6} xs={12} >
                                  <BtCliAtual valor={clienteatual}/>&nbsp;&nbsp;
                                  {clienteatual != null ? <a href={'relatorio/cliente?relatorio=listaagendas&valor='+idclienteatual} target="_blank">
                                     <CTooltip content="Relatório de Agendas Efetuadas" placement="top"><FontAwesomeIcon className="pdfreport" icon={faFilePdf} size="xl"/></CTooltip>
                                     </a> : <></>}
                               </CCol>
                               <CCol md={6} xs={12} >
                                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                                        <CInputGroup style={{maxWidth:'400px'}}>
                                            <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                            <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGridItens(e)}/>
                                        </CInputGroup>
                                    </div>
                               </CCol>
                            </CRow>
                            <CCard style={{padding:'3px'}}>
                                <CTable responsive>
                                    <CTableHead style={{fontSize:'11px !important'}}>
                                        <CTableRow>
                                            <CTableHeaderCell className='clthinterno' scope="col" style={{borderRadius:'5px 0px 0px 0px'}}>#</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Data Agendamento</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Data Atendimento</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">DiaSemana</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Profissional</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Serviço</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Tratamento</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Status</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Horário</CTableHeaderCell>
                                            {/* <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell> */}
                                            <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {
                                           loaditens ? (
                                            <CTableRow>
                                                <CTableDataCell colspan="8" style={{textAlign:'center'}}>Carregando...</CTableDataCell>
                                            </CTableRow>
                                           ) : (
                                              <CorpoTabelaItens lista={listaagendas} estado={estitens}/>
                                           )
                                        }
                                    </CTableBody>
                                </CTable>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12} xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                            <CTooltip content="Limpar Dados" placement="top">
                                <CButton style={{height:'38px'}} onClick={(e)=>Limpar(e)} color="secondary">Limpar
                                    &nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faEraser}/>
                                </CButton>
                            </CTooltip>
                            &nbsp;
                            <CTooltip content="Salvar Dados" placement="top">
                                <CButton
                                    //saveCliente()
                                    className='clinputtext mb-3'
                                    type="submit"
                                    style={{width:'110px',borderRadius:'5px 5px 5px 5px',color:'white'}} >
                                        {textosubmit}&nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faSave}/>
                                        { loadspin ? (<>&nbsp;<CSpinner size="sm"/></>) : (<></>)}
                                </CButton>
                            </CTooltip>
                        </CCol>
                    </CRow>
                 </CForm>
                 <CRow>
                     <CCol md={12} xs={12} >
                        {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) :
                        (
                        <CCard style={{padding:'3px'}}>
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                            <div className='mt-3'>
                                <CTooltip content="Relatório Lista de Clientes" placement="top">
                                <a href={'relatorio/cliente?relatorio=listaclientes'} target="_blank"><FontAwesomeIcon className="pdfreport" icon={faFilePdf} size="xl"/></a>
                                </CTooltip></div>&nbsp;
                            <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                             </CInputGroup>
                             </div>
                            <CTable>
                                <CTableHead style={{fontSize:'11px !important'}}>
                                    <CTableRow>
                                        {/* pix_id_pix,pix_tipo,pix_chave,pix_nome_fantasia,pix_cidade,pix_id_ban,pix_ativo,pix_atual,pix_created_at,pix_updated_at,pix_deleted_at */}
                                        <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell style={{textAlign:'center'}} className='clthinterno' scope="col">Ativo</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Nome</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">CPF</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">TipoTelefone</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Telefone</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CorpoTabela lista={listacliente} estado={est}/>
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
                            {/* <div style={{display:'flex',justifyContent:'flex-end'}}>
                               <Pagination pages={numnpagination}/>
                            </div> */}
                        </CCard>
                        )}
                     </CCol>
                 </CRow>
             </CCardBody>
           </CCard>
         </div>
  )

}

export default ManClientes
