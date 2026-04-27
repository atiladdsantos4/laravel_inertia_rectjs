import { React,useEffect, useState, Suspense, useRef } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { SpinnerComp } from '../../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img01 from '../../images/foto01.jpeg'
import img02 from '../../images/foto02.png'
import { faSave, faEdit, faTrash,faEraser, faCancel, faCircleXmark, faCircleArrowDown,faCircleArrowUp  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  CTable, CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,CTableHead,
  CButton,
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
  CPagination, CPaginationItem
} from '@coreui/react'
import { useStore } from '../../store/useStore';
import { io } from 'socket.io-client';
import { LineElement } from 'chart.js';

//const io = require('socket.io-client');
//const socket = io('http://jemosistemas-domain.com/inertia-react/salao');

const ManServicos = (props) =>{

  const { changetestemunho } = useStore();
  const [loadpage,setLoadpage] = useState(true)
  const [loadspin,setLoadspin] = useState(false)
  const [icone,setIcon] = useState(null)
  const [listacampos,setListacampos] = useState([])
  const [listatags,setListatags] = useState([])
  const [listatipos,setListatipos] = useState([])
  const [listacard,setListacard] = useState([])
  const [listaservice,setListaservice] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [estcard,setEstcard] = useState(false)
  const [est,setEst] = useState(false)
  const [estform,setEstform] = useState(true)
  const [serid,setSerid] = useState(null)
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
  const token = props.token
  const sei_display = 1
  const empresa = props.dados_section.sec_id_emp
  const endpoint = props.end
  const endpoint_img = import.meta.env.VITE_APP_ENDPOINT_IMG
  const sei_id_sec = props.dados_section.sec_id_sec
  const toaster = useRef(null)
  const style = {width:'90px'}
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

  const getIndexServico = (lista,id) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].ser_id_ser === id){
          return i
        }
    }
  }

  const getTipoTag = (valor) =>{
    let array = listatags.filter((item)=> item.tag_nome === valor)
    return array[0].tag_id_tag
  }

  const array_campos = [////ser_id_ser,ser_titulo,ser_texto,ser_display,ser_created_at,ser_updated_at,ser_deleted_at
     {
       seq:1,
       nome:'ser_titulo',
       label:'Título',
       placeholder:'Informe o Nome do Serviço',
       readonly:false,
       feedbackerro:'O Nome do Serviço deve ser Informado'
     },
     {
       seq:2,
       nome:'ser_texto',
       label:'Descrição',
       placeholder:'Informe a Descrição do Serviço',
       readonly:false,
       feedbackerro:'A Descrição do Serviço deve ser Informada'
     },
     {
       seq:3,
       nome:'ser_display',
       label:'Exibe',
       placeholder:'Exibe Serviço',
       readonly:false
     },
     {
       seq:4,
       nome:'ser_created_at',
       label:'Criação',
       placeholder:'Data de Criação',
       readonly:false
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
      readonly:false,
      estilo:style,
      type:'input',
      valor:0,
      required:false
    },
    {
      idfield:0,
      seq:array_campos[3].seq,
      id:null,
      nome:array_campos[3].nome,
      label:array_campos[3].label,
      placeholder:array_campos[3].placeholder,
      readonly:false,
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
           setListaservice(result.data.data.slice(0,5))
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
  const saveService = () => {

        setLoadspin(true)
        const formData = new FormData()
        let val_display = valorSeq(3) ? 1 : 0;
        formData.append('ser_display', val_display)
        formData.append('ser_titulo', valorSeq(1))
        formData.append('ser_texto', valorSeq(2))
        if(serid == null ){
          axios
          .post(`${endpoint}/services`, formData, {
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
           .post(`${endpoint}/services/${serid}`, formData, {
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
              setSerid(null) // set update id flag to null
              addToast(CompToast('Dados Atulizados com sucesso !!!', 'success')) //--> usa toast
              setTimeout(() => {
                  document.getElementById('idtoast').classList.remove('show')
                  document.getElementById('idtoast').remove()
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
            //    { props.readonly ? readOnly : ''}
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
     setListaservice(prevItems =>
            prevItems.map(item =>
                item.ser_id_ser === id ? { ...item, ser_display: valor } : item
            )
     )
     setEst(!est)
     AualizaExibe(id,valor)
     console.log(listaservice)
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
                       {item.ser_load ? (<CSpinner size="sm" color="primary"/>) : (item.ser_id_ser)}
                   </CTableDataCell>
                   <CTableDataCell>
                        {
                        item.ser_display == 1 ?
                        (<CFormCheck checked onChange={(e)=>atualizaLista(item.ser_id_ser,e)}/>) :
                        (<CFormCheck onChange={(e)=>atualizaLista(item.ser_id_ser,e)}/>)
                        }
                   </CTableDataCell>
                   <CTableDataCell>{item.ser_titulo}</CTableDataCell>
                   <CTableDataCell>{item.ser_texto}</CTableDataCell>
                   <CTableDataCell>{item.ser_created_at}</CTableDataCell>
                   <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.ser_id_ser}/></CTableDataCell>
                </CTableRow>
            )
         })
      )
  }

  //--> Edita os campos e atualiza os dados
  const EditaService = (id) =>{
     let idx = getIndexServico(listaservice,id)
     listacampos[0].valor = listaservice[idx].ser_titulo
     listacampos[1].valor = listaservice[idx].ser_texto
     listacampos[2].valor = listaservice[idx].ser_display
     listacampos[3].valor = listaservice[idx].ser_created_at
     setSerid(listaservice[idx].ser_id_ser)
     setEst(!est)
  }

  //--> Limpa os campos e resseta o form
  const Limpar = (event) => {
     listacampos[0].valor = ''
     listacampos[1].valor = ''
     listacampos[2].valor = ''
     listacampos[3].valor = ''
     setSerid(null)
     setEst(!est)
     setValidated(false)
  }

  //--> Display dos Ícones no grid
  const ItensAcao = (props) => {
    return(
       <>
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       &nbsp;
       <FontAwesomeIcon onClick={(e)=>EditaService(props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </>
    )
  }

  //--> Atualiza o display de exibição do serviço
   const AualizaExibe = (id,valor) =>{
        //socket.emit('changeState', 'Updated from Terminal!');
        setListaservice(prevItems =>
            prevItems.map(item =>
                item.ser_id_ser === id ? { ...item, ser_load: true } : item
            )
        )
        const formData = new FormData()
        formData.append('ser_display', valor)
        formData.append('_method', 'put')

        axios
        .post(`${endpoint}/services/${id}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setListaservice(prevItems =>
                prevItems.map(item =>
                    item.ser_id_ser === id ? { ...item, ser_load: false } : item
                )
            )
            setListafiltro(prevItems =>
                prevItems.map(item =>
                    item.ser_id_ser === id ? { ...item, ser_exibe: valor } : item
                )
            )
            setEst(!est)
            addToast(CompToast('Alteração efetuada com sucesso !!!', 'success')) //--> usa toast
            changetestemunho()
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
            (item)=>item.ser_titulo.toLowerCase().includes(valor.toLowerCase()) ||
                    item.ser_texto.toLowerCase().includes(valor.toLowerCase())
        )
        //listafiltro.filter((item)=> item.tes_id_tes == event.target.value)
        console.log(lista)
        setListaservice(lista.slice(0,5))
     } else {
        setListaservice(listafiltro.slice(0,5))
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
//     setListaservice(lista)
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
    setListaservice(lista)
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
           saveService()
        }
  }

  return(
         <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
           <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
           <CCard className="mb-4">
             <CCardHeader className="clfooter">
               <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Manutenção Serviços</span>
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
                        {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextAreaSimples {...listacampos[1]}/>)}
                    </CCol>
                    </CRow>
                    <CRow>
                    <CCol md={12} xs={12} >
                        {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoCheck {...listacampos[2]}/>)}
                    </CCol>
                    </CRow>
                    <CRow>
                    <CCol md={12} xs={12} >
                        {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[3]}/>)}
                    </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12} xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                            <CButton style={{height:'38px'}} onClick={(e)=>Limpar(e)} color="secondary">Limpar
                                &nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faEraser}/>
                            </CButton>
                            &nbsp;
                            <CButton
                                //saveService()
                                className='clinputtext mb-3'
                                type="submit"
                                style={{width:'110px',borderRadius:'5px 5px 5px 5px',color:'white'}} >
                                    Salvar&nbsp;&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faSave}/>
                                    { loadspin ? (<>&nbsp;<CSpinner size="sm"/></>) : (<></>)}
                            </CButton>
                        </CCol>
                    </CRow>
                 </CForm>
                 <CRow>
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
                            <CTable>
                                <CTableHead style={{fontSize:'11px !important'}}>
                                    <CTableRow>
                                        <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Exibir</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Nome</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Texto</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CorpoTabela lista={listaservice} estado={est}/>
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

export default ManServicos
