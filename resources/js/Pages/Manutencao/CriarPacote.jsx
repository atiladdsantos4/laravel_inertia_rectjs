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
import { IMaskInput,IMaskMixin } from 'react-imask';

//const io = require('socket.io-client');
//const socket = io('http://jemosistemas-domain.com/inertia-react/salao');

const CriarPacote = (props) =>{

  const { changetestemunho } = useStore();
  const [loadpage,setLoadpage] = useState(true)
  const [loadspin,setLoadspin] = useState(false)
  const [icone,setIcon] = useState(props.icon)
  const [listacampos,setListacampos] = useState([])
  const [listatags,setListatags] = useState([])
  const [listatipos,setListatipos] = useState([])
  const [listacard,setListacard] = useState([])
  const [listatratamento,setListatratamento] = useState([])
  const [listapacote,setListapacote] = useState([])
  const [listaservices,setListaservices] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [listafiltrotra,setListafiltrotra] = useState([])
  const [estcard,setEstcard] = useState(false)
  const [est,setEst] = useState(false)
  const [estform,setEstform] = useState(true)
  const [pacid,setPacid] = useState(null)
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
  const [exiberesumo, setExiberesumo] = useState(false)

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
  const [valorglobal,setValorglobal]  = useState(0)
  const [descontoglobal,setDescontoglobal]  = useState(0)
  const [descontoperc,setDescontoperc]  = useState(1)

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

  //console.log(props)

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

  const getIndexPacote = (lista,id) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].pac_id_pac === id){
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

  const array_campos = [////ser_id_ser,ser_titulo,ser_texto,ser_display,ser_created_at,ser_updated_at,ser_deleted_at
    {
       seq:1,
       nome:'pac_nome',
       label:'Descrição',
       placeholder:'Informe o Nome do Pacote',
       readonly:false,
       erro:'O Nome do Pacote deve ser Informado'
    },
    {
       seq:2,
       nome:'pac_ativo',
       label:'Ativo',
       placeholder:'Ativo deve ser informado',
       readonly:false,
       erro:'Ativo  deve ser Informado'
     },
     {
       seq:3,
       nome:'pac_display',
       label:'Exibe',
       placeholder:'Informe se será Exibido',
       readonly:false,
       erro:'A forma de exibição deve ser Informada'
     },
     {
       seq:4,
       nome:'pac_valor',
       label:'Valor',
       placeholder:'Informe o valor do pacote',
       readonly:false,
       erro:'O Valor deve ser informado'
     },
     {
       seq:5,
       nome:'pac_desconto',
       label:'Desconto(%)',
       placeholder:'Informe o percentual do desconto',
       readonly:false,
       erro:'O Desconto deve ser informado'
     },
     {
       seq:6,
       nome:'pac_created_at',
       label:'Criação',
       placeholder:'Data de Criação',
       readonly:true
     },
     {
       seq:7,
       nome:'filtro',
       label:'Tratamento',
       label1:'Adicionar',
       placeholder:'Selecione o tratamento',
       readonly:false
     },
     {
       seq:8,
       nome:'pac_valor_final',
       label:'Valor Final',
       placeholder:'Valor Final',
       readonly:true
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
      required:false
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
      valor:0,
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
    }
 ]

 const lista_qtde =[
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
           axios.get(`${endpoint}/pacote?listagem=S`,{
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                },
           })
        ]

        const responses = await Promise.all(requests);

        let result = responses[0]
        let result_pacote = responses[1]

        //pacotes
        setListapacote(result_pacote.data.data.slice(0,5))
        setListafiltro(result_pacote.data.data)
        let tam = result_pacote.data.data.length
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
           setPaginaatual(1)
           if( tam > 0){
             setRegistroini(1)
             setRegistrofim(5)
           }
        //let filtrotra =  result_pacote.data.data.sort((a,b)=>a.pac_id_pac - b.pac_id_pac)

        //tratamentos
        //setListafiltro(result.data.data.tratamentos)
        let filtrotra =  result.data.data.tratamentos.sort((a,b)=>a.tra_servico.ser_id_ser - b.tra_servico.ser_id_ser)
        setListafiltrotra(filtrotra)
        setListatratamento(result.data.data.tratamentos.slice(0,5))
        let array_service = result.data.data.servicos
        array_service.unshift({ser_id_ser:'',ser_titulo:'---> Selecione o serviço <---'})
        setListaservices(array_service)
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
           setListaservices(array_service)
           setListacampos(lista)
           setPaginaatual(1)
           if( tam > 0){
             setRegistroini(1)
             setRegistrofim(5)
           }
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
        let pac_itens = null
        if(pacid == null ){
          pac_itens = CriaJsonItens('novo')
        } else {
          pac_itens = CriaJsonItens('editar')
        }
        const formData = new FormData()
        let val_display = valorSeq(3) ? 1 : 0;
        let val_ativo = valorSeq(2) ? 1 : 0;
        formData.append('pac_display', val_display)
        formData.append('pac_nome', valorSeq(1))
        formData.append('pac_ativo', val_ativo)
        formData.append('pac_desconto', descontoglobal)
        formData.append('pac_valor', valorSeq(4))
        formData.append('pac_valor_final', valorSeq(8))
        formData.append('pac_itens', pac_itens)
        if(pacid == null ){
          axios
          .post(`${endpoint}/pacote`, formData, {
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
              listaitens.length = 0;
              setTimeout(() => {
                  document.getElementById('idtoast').classList.remove('show')
                  document.getElementById('idtoast').remove()
              }, 2000)
          })
        } else {
            formData.append('_method', 'put')
          axios
           .post(`${endpoint}/pacote/${pacid}`, formData, {
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
              setPacid(null) // set update id flag to null
              listaitens.length = 0;
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
                onBlur = {(e)=>atualizaDados(5,value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
        );
  };

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
               feedbackInvalid={props.erro}
               required={props.required}
               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            >
            {
            //   <option value="">{''}</option>
              listaservices.map((item,index)=>{
                  return(
                    <option value={item.ser_id_ser}>{item.ser_titulo}</option>
                  )
              })
            }
            </CFormSelect>
            {props.required ? (<CFormFeedback id={'btinvaid'+props.seq} invalid>{props.erro}</CFormFeedback>) : (<></>) }
        </CInputGroup>
    )
  }

  const DropDownQtde = () =>{
   return(
    <CDropdown variant="btn-group">
      <CDropdownToggle size="sm" style={{maxHeight:'38px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Qtde</CDropdownToggle>
      <CDropdownMenu>
      {
        lista_qtde.map((item,index)=>{
            return(
                <CDropdownItem style={{fontSize:'13px'}} href="#" onClick={(e)=>AlteraQtde(e,item.qtde)}>
                   {item.qtde}
                </CDropdownItem>
            )
        })
      }
      </CDropdownMenu>
     </CDropdown>
    )
  }

  //Cria Json de Item do Tratamento
  const CriaJsonItens = (acao) =>{

    let obj = null
    let arrayitens = []
    let valor_desc = null
    listaitens.map((item,index)=>{
      //pai_id_pai,pai_id_pacpai_created_at,pai_updated_at,pai_deleted_at
      let valor = (item.tra_valor_atual.tva_valor * descontoperc).toFixed(2)
       obj ={
         pai_display:item.tra_display,
         pai_id_tra:item.tra_id_tra,
         pai_qtde:item.tra_qtde,
         pai_valor:item.tra_valor_atual.tva_valor,
         pai_valor_desc:valor,
         pai_desconto:item.tra_valor_atual.tva_max_desconto,
         pai_exclui:item.tra_exclui
       }
       if( acao == 'editar'){
          obj.pai_id_pai = item.pai_id_pai
          obj.pai_id_pac = item.pai_id_pac
          obj.pai_exclui = item.tra_exclui
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
                            // <option value={item.tra_id_tra}>{item.tra_servico.ser_titulo+' - '+item.tra_titulo}</option>
                        )
                    })
                }

                </CDropdownMenu>
            </CDropdown>
            <CFormInput value={itematualtexto} placeholder='Item selecionado'readOnly/>
            <DropDownQtde/>
            <CFormInput style={{maxWidth:'62px'}} value={itemqtdeatualtexto} placeholder='Qtde'readOnly/>
            <CInputGroupText style={{maxHeight:'38px',borderRadius:'0px 5px 5px 0px'}}  onClick={(e)=>addTratamento(e)} className="clinputtext">
                {props.label1}&nbsp;&nbsp;<FontAwesomeIcon className="cpointer" size="sm" style={{color:'white'}} icon={faCircleArrowDown}/>
            </CInputGroupText>
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
               feedbackInvalid={props.erro}
               required={props.required}
               onChange={(e)=>atualizaDados(props.seq,e.target.value)}
            />
            {/* {props.required ? (<CFormFeedback invalid>{props.erro}</CFormFeedback>) : (<></>) } */}
        </CInputGroup>
    )
  }

  const AlteraEscolha = (event,item,valor) =>{
    setItematual(item)
    setItematualtexto(valor)
    console.log(listacampos)
  }

  const AlteraQtde = (event,valor) =>{
    setItemqtdeatual(valor)
    setItemqtdeatualtexto(valor)
  }

  //--> Atualiza o campo display do campo na tabela
  const atualizaLista = (id,event) =>{
     let valor = event.target.checked == true ? 1 : 0
     setListapacote(prevItems =>
            prevItems.map(item =>
                item.pac_id_pac === id ? { ...item, pac_display: valor } : item
            )
     )
     setEst(!est)
     AualizaExibe(id,valor,'display')
     console.log(listapacote)
  }

  //--> Atualiza o campo display do campo na tabela
  const atualizaListaAtivo = (id,event) =>{
     let valor = event.target.checked == true ? 1 : 0
     setListapacote(prevItems =>
            prevItems.map(item =>
                item.pac_id_pac === id ? { ...item, pac_ativo: valor } : item
            )
     )
     setEst(!est)
     AualizaExibe(id,valor,'ativo')
     console.log(listapacote)
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
     //AualizaExibe(id,valor)
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
                        {item.pac_load ? (<CSpinner size="sm" color="primary"/>) : (item.pac_id_pac)}
                    </CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                       {
                            item.pac_display == true ?
                            (<CFormCheck style={{backgroundColor:'#200D35 !important'}} checked onChange={(e)=>atualizaLista(item.pac_id_pac,e)}/>) :
                            (<CFormCheck style={{backgroundColor:'#200D35 !important'}} onChange={(e)=>atualizaLista(item.pac_id_pac,e)}/>)
                       }
                    </CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                       {
                            item.pac_ativo == true ?
                            (<CFormCheck style={{backgroundColor:'#5243C2'}} checked onChange={(e)=>atualizaListaAtivo(item.pac_id_pac,e)}/>) :
                            (<CFormCheck style={{backgroundColor:'white'}} onChange={(e)=>atualizaListaAtivo(item.pac_id_pac,e)}/>)
                       }
                    </CTableDataCell>
                    <CTableDataCell>{item.pac_nome}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.pac_desconto}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.pac_valor}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.pac_valor_final}</CTableDataCell>
                    <CTableDataCell>{item.pac_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.pac_id_pac}/></CTableDataCell>
                    </CTableRow>
               )
            }
         })
      )
  }

  const CorpoTabelaItensXXX = (props) =>{
      console.log('inicio renderizou CorpoTabelaItens')
      console.log(props)
      console.log('fim renderizou CorpoTabelaItens')
      let classe = null
      let tem_registro = false
      let listafinal =  props.lista.filter((it) => it.tra_exclui === 'N')
      let tam = listafinal.length - 1
      console.log('tam:'+tam)
      return(
         listafinal.filter((it) => it.tra_exclui === 'N').map((item,index)=>{
            tem_registro = true
            console.log('index:'+index)
            if(index < tam ) {
                return(
                    <CTableRow color={classe}>
                        <CTableDataCell>{item.tra_id_tra}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                        {
                            item.tra_display == 1 ?
                            (<CFormCheck checked onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>) :
                            (<CFormCheck onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>)
                        }
                        </CTableDataCell>
                        <CTableDataCell>{item.tra_servico.ser_titulo}</CTableDataCell>
                        <CTableDataCell>{item.tra_titulo}</CTableDataCell>
                        <CTableDataCell>{item.tra_texto}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'center'}}>{item.tra_qtde}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'right'}}>{item.tra_valor_atual ? item.tra_valor_atual.tva_valor : '000.00'}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'right'}}>{item.tra_valor_atual ? item.tra_valor_atual.tva_max_desconto : '00.00'}</CTableDataCell>
                        {/* <CTableDataCell>{item.tra_created_at}</CTableDataCell> */}
                        <CTableDataCell style={{textAlign:'center'}}><ItensAcaoAdd id={item.tra_id_tra}/></CTableDataCell>
                    </CTableRow>
                )
            } else {
                return(
                    <>
                    <CTableRow color={classe}>
                        <CTableDataCell>{item.tra_id_tra}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                        {
                            item.tra_display == 1 ?
                            (<CFormCheck checked onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>) :
                            (<CFormCheck onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>)
                        }
                        </CTableDataCell>
                        <CTableDataCell>{item.tra_servico.ser_titulo}</CTableDataCell>
                        <CTableDataCell>{item.tra_titulo}</CTableDataCell>
                        <CTableDataCell>{item.tra_texto}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'center'}}>{item.tra_qtde}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'right'}}>{item.tra_valor_atual ? item.tra_valor_atual.tva_valor : '000.00'}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'right'}}>{item.tra_valor_atual ? item.tra_valor_atual.tva_max_desconto : '00.00'}</CTableDataCell>
                        {/* <CTableDataCell>{item.tra_created_at}</CTableDataCell> */}
                        <CTableDataCell style={{textAlign:'center'}}><ItensAcaoAdd id={item.tra_id_tra}/></CTableDataCell>
                    </CTableRow>
                    <CTableRow color={classe}>
                       <CTableDataCell colspan="7"></CTableDataCell>
                       <CTableDataCell>valor</CTableDataCell>
                       <CTableDataCell>valor</CTableDataCell>
                    </CTableRow>
                    </>
                )
            }

        })
      )
  }


  const CorpoTabelaItens = (props) =>{
      setExiberesumo(false)
      let classe = null
      //let desconto = descontoglobal == 0 ? 1 : 1 - (descontoglobal/100)
      let desconto = descontoperc
      return(
         props.lista.filter((it) => it.tra_exclui === 'N').map((item,index)=>{
            setExiberesumo(true)
            return(
                <CTableRow color={classe}>
                    <CTableDataCell>{item.tra_id_tra}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',width:'40px'}}>
                      {
                          item.tra_display == 1 ?
                          (<CFormCheck checked onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>) :
                          (<CFormCheck onChange={(e)=>atualizaListaItem(item.tra_id_tra,e)}/>)
                      }
                    </CTableDataCell>
                    <CTableDataCell>{item.tra_servico.ser_titulo}</CTableDataCell>
                    <CTableDataCell>{item.tra_titulo}</CTableDataCell>
                    <CTableDataCell>{item.tra_texto}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}>{item.tra_qtde}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.tra_valor_atual ? item.tra_valor_atual.tva_max_desconto : '00.00'}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.tra_valor_atual ? item.tra_valor_atual.tva_valor : '000.00'}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'right'}}>{item.tra_valor_atual ? (item.tra_valor_atual.tva_valor * desconto).toFixed(2) : '000.00'}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcaoAdd id={item.tra_id_tra}/></CTableDataCell>
               </CTableRow>
            )
        })
      )
  }

  const LinhaSoma = () =>{
    //const total = listaitens.reduce((accumulator, current) => accumulator + (parseFloat(current.tra_valor_atual.tva_valor) * parseFloat(current.tra_qtde)), 0);
    let desconto = descontoglobal == 0 ? 1 : 1 - (descontoglobal/100)
    const total = listaitens
                   .filter((item)=>item.tra_exclui == 'N')
                   .reduce((accumulator, current) => accumulator + (parseFloat(current.tra_valor_atual.tva_valor) * parseFloat(current.tra_qtde)), 0);

    const total_desc = listaitens
                   .filter((item)=>item.tra_exclui == 'N')
                   .reduce((accumulator, current) => accumulator + (parseFloat(current.tra_valor_atual.tva_valor) * parseFloat(current.tra_qtde) * desconto), 0);
    let classe = null
    return(
       <CTableRow color={classe}>
          <CTableDataCell colspan="6"></CTableDataCell>
          <CTableDataCell><CBadge className='badgetotal'>  Totais</CBadge></CTableDataCell>
          <CTableDataCell style={{textAlign:'right'}}><CBadge className='badgetotal'>{total.toFixed(2)}</CBadge></CTableDataCell>
          <CTableDataCell style={{textAlign:'right'}}><CBadge className='badgetotal'>{total_desc.toFixed(2)}</CBadge></CTableDataCell>
       </CTableRow>
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
    filtro[0].tra_qtde = itemqtdeatual
    filtro[0].tra_exclui = 'N'
    console.log(filtro[0])
    listaitens.push(filtro[0])
    setEstitens(!estitens)
    setItematual(null)
    setItematualtexto(null)
    setItemqtdeatual(null)
    setItemqtdeatualtexto(null)
    let val  = CalculaValor()
    atualizaDados(4,val)
    setValorglobal(val)
    CalculaValorFinal()
   }

    const AddItensEdit = (lista) =>{
      listaitens.length = 0
      let obj = null
      lista.map((item,index)=>{
         obj={
            pai_id_pai:item.pai_id_pai,
            pai_id_pac:item.pai_id_pac,
            tra_id_tra:item.pai_id_tra,
            tra_display:item.pai_display,
            tra_exclui:'N',
            tra_servico:{
                ser_titulo:item.tratamento.servico_api.ser_titulo
            },
            tra_titulo:item.tratamento.tra_titulo,
            tra_texto:item.tratamento.tra_texto,
            tra_qtde:item.pai_qtde,
            tra_valor_atual:{
                tva_valor:item.pai_valor,
                tva_max_desconto:item.pai_desconto
            },
            tra_created_at:item.pai_created_at
         }
         listaitens.push(obj)
      })

    }

   const CalculaValor = () =>{
     //const total = listaitens.reduce((accumulator, current) => accumulator + (parseFloat(current.tra_valor_atual.tva_valor) * parseFloat(current.tra_qtde)), 0);
     const total = listaitens
                   .filter((item)=>item.tra_exclui == 'N')
                   .reduce((accumulator, current) => accumulator + (parseFloat(current.tra_valor_atual.tva_valor) * parseFloat(current.tra_qtde)), 0);
     console.log('total')
     console.log(total)
     return total
  }

  const CalculaValorFinal = () =>{
     console.log('calculei')
     let valor = parseFloat(listacampos[3].valor);
     let desconto = parseFloat(listacampos[4].valor);
     if( desconto > 0 ){
        let val_desc = valor - ((valor * desconto)/100)
        listacampos[7].valor = val_desc.toFixed(2)
     } else {
        listacampos[7].valor = valor.toFixed(2)
     }
     console.log(listacampos)
  }

  const Existe = (index) =>{
     let filtro  = listaitens.filter((item)=>item.tra_id_tra === index && item.tra_exclui == 'N')
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
        addToast(CompToast('Nenhuma Qtde foi definida!!!', 'danger')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
            //console.log(listafiltro)
        }, 2000)
     }
     return achou
  }

  const ExcluirItem = (event,id) =>{
     let index = getIndexPacote(listaitens,id)
    //  console.log(listaitens)
    //  listaitens[index].pai_exclui = 'S'
     listaitens.splice(index,1)
     setListaitens(listaitens)
     setEstitens(!estitens)
     setItematual(null)
     setItematualtexto(null)
     let val= CalculaValor()
     atualizaDados(4,val)
     setValorglobal(val)
     CalculaValorFinal()
  }

  const ExcluirItemPacote = (event,id) =>{
     let index = getIndexItensPacote(listaitens,id)
     listaitens[index].tra_exclui='S'
     console.log(listaitens)
     //listaitens.splice(index,1)
     setListaitens(listaitens)
     setEstitens(!estitens)
     setItematual(null)
     setItematualtexto(null)
     let val= CalculaValor()
     atualizaDados(4,val)
     setValorglobal(val)
     CalculaValorFinal()
  }


  //--> Edita os campos e atualiza os dados
  const EditaPacote = (id) =>{
     let idx = getIndexPacote(listapacote,id)
     listacampos[0].valor = listapacote[idx].pac_nome
     listacampos[1].valor = listapacote[idx].pac_ativo == 1 ? true : false
     listacampos[2].valor = listapacote[idx].pac_display == 1 ? true : false

     listacampos[4].valor = listapacote[idx].pac_desconto
     setDescontoglobal(listapacote[idx].pac_desconto)
     let desc = 1 - (listapacote[idx].pac_desconto/100)
     setDescontoperc(desc)

     listacampos[3].valor = listapacote[idx].pac_valor
     setValorglobal(listapacote[idx].pac_valor)


     listacampos[5].valor = listapacote[idx].pac_created_at

     listacampos[7].valor = listapacote[idx].pac_valor_final
     AddItensEdit(listapacote[idx].pac_itens)
     setPacid(listapacote[idx].pac_id_pac)
     setEst(!est)
     console.log(listacampos)
     console.log(listapacote[idx])
  }

  const EditaValorModal = (id) =>{
    let idx = getIndexPacote(listatratamento,id)
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
     listacampos[0].valor = ''
     listacampos[1].valor = ''
     listacampos[2].valor = ''
     listacampos[3].valor = ''
     listacampos[4].valor = ''
     listacampos[5].valor = ''
     listacampos[6].valor = ''
     listacampos[7].valor = ''
     listaitens.length = 0
     setValorglobal(null)
     setDescontoglobal(null)
     setDescontoperc(1)
     setPacid(null)
     setEst(!est)
     setValidated(false)
  }

  //--> Display dos Ícones no grid
  const ItensAcao = (props) => {
    return(
       <>
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       &nbsp;
       <FontAwesomeIcon onClick={(e)=>EditaPacote(props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </>
    )
  }

  //--> Display dos Ícones no grid
  const ItensAcaoAdd = (props) => {
    return(
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash} onClick={(e)=>ExcluirItemPacote(e,props.id)}/>
    )
  }

  //--> Atualiza o display de exibição do traviço
   const AualizaExibe = (id,valor,campo) =>{
        //socket.emit('changeState', 'Updated from Terminal!');
        setListapacote(prevItems =>
            prevItems.map(item =>
                item.pac_id_pac === id ? { ...item, pac_load: true } : item
            )
        )
        const formData = new FormData()
        if( campo === 'display'){
            formData.append('pac_display', valor)
        }

        if( campo === 'ativo'){
            formData.append('pac_ativo', valor)
        }

        formData.append('_method', 'put')

        axios
        .post(`${endpoint}/pacote/${id}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            if( campo === 'display'){
                setListafiltro(prevItems =>
                    prevItems.map(item =>
                        item.pac_id_pac === id ? { ...item, pac_exibe: valor } : item
                    )
                )
                setListapacote(prevItems =>
                    prevItems.map(item =>
                        item.pac_id_pac === id ? { ...item, pac_exibe: valor } : item
                    )
                )
            }
            if( campo === 'ativo'){
                setListafiltro(prevItems =>
                    prevItems.map(item =>
                        item.pac_id_pac === id ? { ...item, pac_ativo: valor } : item
                    )
                )
                setListapacote(prevItems =>
                    prevItems.map(item =>
                        item.pac_id_pac === id ? { ...item, pac_ativo: valor } : item
                    )
                )
            }

            //setListatratamento(listafiltro.slice(0,5))
             setListapacote(prevItems =>
                prevItems.map(item =>
                    item.pac_id_pac === id ? { ...item, pac_load: false } : item
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

  const atualizaDados = (seq,valor) =>{
    console.log(seq)
    console.log(valor)
    let index = getIndexSeq(listacampos,seq)
    listacampos[index].valor = valor
    if( seq == 5 ){
       let desc = 1 - (valor/100)
       setDescontoperc(desc)
       setDescontoglobal(valor)
       CalculaValorFinal()
    }
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
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.pac_nome.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListapacote(lista.slice(0,5))
     } else {
        setListapacote(listafiltro.slice(0,5))
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
    setListapacote(lista)
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
           saveService()
        //    let valor = CriaJsonItens()
        //    console.log(valor)
        }
  }

  return(
         <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
           <ModalTratamentoValor icone={faBrazilianRealSign} isOpen={openmodal} dados={dadosmodal} close={closeModal} token={token}/>
           <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
           <CCard className="mb-4">
             <CCardHeader className="clfooter">
               <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Criação de Pacotes</span>
             </CCardHeader>
             <CCardBody>
                <CForm
                   className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>
                    <CRow className='mt-3'>
                        <CCol md={12} xs={12} >
                            {/* {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectSimples {...listacampos[0]} />)} */}
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples index="0" {...listacampos[0]}/>)}
                        </CCol>
                    </CRow>
                    <CRow className='mt-1'>
                        <CCol md={4} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoValor index="3" {...listacampos[3]}/>)}
                         </CCol>
                         <CCol md={4} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoDesconto {...listacampos[4]}/>)}
                         </CCol>
                         <CCol md={4} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[7]}/>)}
                         </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={4} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoCheck {...listacampos[1]}/>)}
                        </CCol>
                        <CCol md={4} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoCheck {...listacampos[2]}/>)}
                        </CCol>
                        <CCol md={4} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextoSimples {...listacampos[5]}/>)}
                        </CCol>
                    </CRow>
                    <CRow className='mb-3'>
                        <CCol md={6} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <CBadge style={{backgroundColor:'#722E56 !important'}} color="primary">Items do Pacote</CBadge>)}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={10} xs={12} >
                            {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputSelectAdd {...listacampos[6]}/>)}
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
                                            <CTableHeaderCell className='clthinterno' scope="col">Qtde</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Max.Desc(%)</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Preço Real</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' scope="col">Preço Desc</CTableHeaderCell>
                                            <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CorpoTabelaItens lista={listaitens} estado={estitens}/>
                                        { exiberesumo  ? (<LinhaSoma/>) : (<></>)}
                                    </CTableBody>
                                </CTable>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12} xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                            <CButton style={{height:'38px'}} onClick={(e)=>Limpar(e)} color="secondary">Limpar / Novo Registro
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
                                        <CTableHeaderCell className='clthinterno' scope="col">Exibir</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Ativo</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Nome</CTableHeaderCell>
                                        <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Desconto</CTableHeaderCell>
                                        <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">Valor(Bruto)</CTableHeaderCell>
                                        <CTableHeaderCell style={{maxWidth:'20px'}} className='clthinterno' scope="col">ValorFinal</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CorpoTabela lista={listapacote} estado={est}/>
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

export default CriarPacote
