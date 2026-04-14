import { React,useEffect, useState, Suspense, useRef } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { SpinnerComp } from '../../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img01 from '../../images/foto01.jpeg'
import img02 from '../../images/foto02.png'
import { faTrash, faCancel, faCircleXmark, faCircleArrowDown,faCircleArrowUp  } from '@fortawesome/free-solid-svg-icons';
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
  CFormLabel,CFormCheck,
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
//const io = require('socket.io-client');
  //const socket = io('http://jemosistemas-domain.com/inertia-react/salao');
  const ManTestemunhos = (props) =>{

  const { changetestemunho } = useStore();
  const [loadpage,setLoadpage] = useState(true)
  const [icone,setIcon] = useState(null)
  const [listacampos,setListacampos] = useState([])
  const [listatags,setListatags] = useState([])
  const [listatipos,setListatipos] = useState([])
  const [listacard,setListacard] = useState([])
  const [listatestemunho,setListatestemunho] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [estcard,setEstcard] = useState(false)
  const [est,setEst] = useState(false)
  const [numnpagination,setNumpagination] = useState(false)
  const [pesquisar,setPesquisar] = useState(null)
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const token = props.token
  const sei_display = 1
  const empresa = props.dados_section.sec_id_emp
  const endpoint = props.end
  const endpoint_img = import.meta.env.VITE_APP_ENDPOINT_IMG
  const sei_id_sec = props.dados_section.sec_id_sec
  const toaster = useRef(null)
  const style = {width:'130px'}
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

  const onImageChange = (event,id) => {
    let obj = null
    if (event.target.files && event.target.files[0]) {
      let imagem = event.target.files[0]
      atualizaListaCard(id,'imagem',event.target.files[0].name)
      let index = getIndex(listacard,id)
      listacard[index].imgfile.length = 0;
      listacard[index].imgfile.push(event.target.files[0])
      console.log(listacard)
    }
  }

  const onRemoveAnexo = (event,id) => {
    console.log('aqui')
     atualizaListaCard(id,'imagem',null)
     let index = getIndex(listacard,id)
     listacard[index].imgfile.length = 0
  }

  const getIndex = (lista,id) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].id === id){
          return i
        }
    }
  }

  const validaTipo = (id) =>{
    let index = getIndex(listacampos,id)
    if( listacampos[index].tipo == null ){
       return true
    }
    return false
  }

  const validaImagem = (id) =>{
    let index = getIndex(listacard,id)
    if( listacard[index].imgfile.length == 0 ){
       return true
    }
    return false
  }

  const getTipoTag = (valor) =>{
    let array = listatags.filter((item)=> item.tag_nome === valor)
    return array[0].tag_id_tag
  }

  const array_campos = [
     {
       nome:'titulo',
       label:'Título'
     },
     {
       nome:'sub-titulo',
       label:'Sub-Título'
     },
     {
       nome:'paragraph',
       label:"Parágrafo"
     }
  ]

  const lista =[
    {
      idfield:0,
      id:'titulo',
      nome:'titulo',
      titulo:"Título",
      placeholder:"Informe o Título",
      load:false,
      estilo:style,
      type:'input',
      valor:'',
      tipo:null,
      tipo_id:'',
      collapse:false
    },
    {
      idfield:0,
      id:'subtitulo',
      nome:'sub-titulo',
      titulo:"Sub-Título",
      placeholder:"Informe o Sub-Título",
      load:false,
      estilo:style,
      linhas:0,
      type:'input',
      valor:'',
      tipo:null,
      tipo_id:'',
      collapse:false
    },
    {
      idfield:0,
      id:'cardprofsection',
      nome:'cardprofsection',
      titulo:"Card's da Seção",
      placeholder:"Adicione os Card's de Ofertas",
      load:false,
      estilo:style,
      linhas:0,
      type:'lista',
      listacard:[],
      valor:"Card's da Seção",
      tipo:null,
      tipo_id:'',
      collapse:false
    }
 ]

 useEffect(()=>{
    setIcon(props.icon)
    //setListacampos(lista)
    setListatipos(props.tipos)
    setListatags(props.tags)
    axios
        .get(`${endpoint}/section/${sei_id_sec}?section_man=S`,{
        headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,//dentro do env//
        },
        })
        .then((result) => {
            let objlista = null
            let lista_inicial = []
            let label_campos = null
            let nlinhas = null
            let link = null
            let string = null
            setListatestemunho(result.data.data.sec_testemunhos)
            setListafiltro(result.data.data.sec_testemunhos)
            let tam = result.data.data.sec_testemunhos.length
            let pages = parseInt(tam) / 5;
            let resto = parseInt(tam) % 5;
            if( resto == 0 ){
              setNumpagination(pages)
            } else {
              setNumpagination((pages+1))
            }
            console.log('items:'+Math.floor(tam))
            console.log('pages:'+Math.floor(pages))
            console.log('resto:'+resto)
            //setNumpagination
            result.data.data.sec_itens.map((item,index)=>{
               label_campos = array_campos.filter((it)=> it.nome === item.sei_nome)
               nlinhas = null
               if( item.sei_tag == 'textarea' ){
                  string = JSON.parse(item.sei_json)
                  nlinhas = string.meta[0].linhas
               }

               if( item.sei_tag == 'image' ){
                  string = JSON.parse(item.sei_json)
                  link = string.meta[0].path
               }

               if( item.sei_tag == 'lista' ){
                  string = JSON.parse(item.sei_json)
                  string.meta.map((it,index)=>{
                    it.imgsaved = true
                    it.imgfile = []
                  })
                  setListacard(string.meta)
                  //console.log(string)

               }

               objlista = {
                 idfield:item.sei_id_sei,
                 id:item.sei_nome,
                 nome:item.sei_nome,
                 titulo:label_campos[0].label,
                 placeholder:item.sei_placeholder,
                 load:false,
                 estilo:style,
                 linhas:nlinhas,
                 type:item.sei_tag,
                 valor:item.sei_valor,
                 tipo:item.sei_tipo,
                 tipo_id:item.sei_id_tip,
                 collapse:true
               }

               if( item.sei_tag == 'image' ){
                  objlista.link = link
                  objlista.imgsaved = true
                  objlista.imgfile = []
                  objlista.display = true
               }

               if( item.sei_tag == 'lista' ){
                  //objlista.lista = string.meta[0]
                  //objlista.imgsaved = true
                  null
                //   objlista.imgsaved = true
                //   objlista.imgfile = []
                //   objlista.display = true
               }
               lista_inicial.push(objlista)
               //console.log(item)
            })
            let existe = null
            lista.map((item,index)=>{
              existe = lista_inicial.filter((it)=> it.nome === item.nome)
              if( existe.length == 0){
                //console.log('existe')
                //console.log(existe)
                lista_inicial.push(item)
              }
            })
            setListacampos(lista_inicial)
            //setListacard()
            setLoadpage(false)
        })
},[props,saved])

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

  const  handleSaveImg = (event,id,lista,valor) =>{

    if( validaTipo(id) ){
       addToast(CompToast('O Tipo de dados deve ser informado !!!', 'danger')) //--> usa toast
       setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
       }, 2000)
       return
    }

    if( validaImagem(id) ){
       addToast(CompToast('Nenhuma imagem foi informada!!!', 'danger')) //--> usa toast
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
        json = CriaJsonImageSimple(index)

        const formData = new FormData()
        formData.append('file', lista[index].imgfile[0])
        formData.append('sei_display', sei_display)
        formData.append('sei_nome', lista[index].nome)
        formData.append('sei_valor', lista[index].valor)
        formData.append('sei_placeholder', lista[index].placeholder)
        formData.append('sei_json', json)
        formData.append('sei_id_emp', empresa)
        formData.append('sei_id_sec', sei_id_sec)
        formData.append('sei_id_tip', lista[index].tipo_id)
        formData.append('sei_id_tag', tag)
        formData.append('sei_link', lista[index].link)
        formData.append('has_image', true)

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

        json = CriaJsonImageSimple(index)
        atualizaItem(id, 'spinner', true)
        const formData = new FormData()
        formData.append('file', lista[index].imgfile[0])
        formData.append('sei_display', sei_display)
        formData.append('sei_nome', lista[index].nome)
        formData.append('sei_valor', lista[index].valor)
        formData.append('sei_json', json)
        formData.append('sei_placeholder', lista[index].placeholder)
        formData.append('sei_id_emp', empresa)
        formData.append('sei_id_sec', sei_id_sec)
        formData.append('sei_id_tip', lista[index].tipo_id)
        formData.append('sei_id_tag', tag)
        formData.append('sei_link', lista[index].link)
        formData.append('has_image', true)
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
            //atualizaItem(id, 'idfield', result.data.data.sei_id_sei)
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

  const ImageSimple = (props) => {
    let texto_botao = props.idfield === 0 ? 'Salvar' : 'Atualizar'
    return(
        <>
        { props.imgsaved ? (<div style={{width:'80%'}}><CCardImage style={styleimg} src={endpoint_img + props.link + props.valor}/></div>) :(<></>)}
        <CInputGroup className="mb-3">
            <CInputGroupText style={props.estilo} className="clinputtext">{props.titulo}</CInputGroupText>
            <CFormInput
               type="file"
               id="inputGroupFile03"
               aria-describedby="inputGroupFileAddon03"
               aria-label="Upload"
               //defaultValue={props.imagem}
               onChange={(e)=>onImageChange(e,props.id)}
            />
            <Dropdown id={props.id} tipo={props.tipo}/>
            <CButton type="button" style={stylebtsave} color="success" variant="outline" id="button-addon1" onClick={(e)=>handleSaveImg(e,props.id,listacampos,props.valor)}>
                {texto_botao}&nbsp;{props.load ? <SpinnerComp size="sm" color="primaty"/> : <></>}
            </CButton>
        </CInputGroup>
        <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'5px'}}>
            <div className="circleimg"><FontAwesomeIcon onClick={(e)=>onRemoveAnexo(e,props.id)} style={{cursor:'pointer',color:'red'}} icon={faTrash} /></div>
            { props.valor == null ? (<></>) : (<BadgeImg color="primary" fonte="11px" valor={props.valor}/>) }
        </div>
        </>
    )
  }

   //onChange={(e)=>atualizaListaCard(item.id,'naoexibir',e.target.checked)}
  const atualizaLista = (id,event) =>{
     let valor = event.target.checked == true ? 1 : 0
     setListatestemunho(prevItems =>
            prevItems.map(item =>
                item.tes_id_tes === id ? { ...item, tes_exibir: valor } : item
            )
     )
     setEst(!est)
     AualizaExibe(id,valor)
     console.log(listatestemunho)
  }

  const CorpoTabela = (props) =>{
      let classe = null
      return(
         props.lista.map((item,index)=>{
            classe = index % 2 == 0 ? 'primary' : 'danger'
            return(
              <CTableRow color={classe}>
                    <CTableDataCell>
                    {item.load ? (<CSpinner size="sm" color="primary"/>) : (item.tes_id_tes)}
                    </CTableDataCell>
                    <CTableDataCell>
                    {
                      item.tes_exibir == 1 ?
                      (<CFormCheck checked onChange={(e)=>atualizaLista(item.tes_id_tes,e)}/>) :
                      (<CFormCheck onChange={(e)=>atualizaLista(item.tes_id_tes,e)}/>)
                    }
                    {/* {
                      (<CSpinner color="primary">)
                    } */}

                    </CTableDataCell>
                   <CTableDataCell>{item.tes_nome}</CTableDataCell>
                   <CTableDataCell>{item.tes_email}</CTableDataCell>
                   <CTableDataCell>{item.tes_profissao}</CTableDataCell>
                   <CTableDataCell>{item.tes_sexo}</CTableDataCell>
                   <CTableDataCell>{item.tes_valor_rate}</CTableDataCell>
                   <CTableDataCell>{item.tes_comentario}</CTableDataCell>
                   <CTableDataCell>{item.tes_created_at}</CTableDataCell>
              </CTableRow>
            )
         })
      )
  }

  const AualizaExibe = (id,valor) =>{
        //socket.emit('changeState', 'Updated from Terminal!');
        setListatestemunho(prevItems =>
            prevItems.map(item =>
                item.tes_id_tes === id ? { ...item, load: true } : item
            )
        )
        const formData = new FormData()
        formData.append('tes_exibir', valor)
        formData.append('_method', 'put')

        axios
        .post(`${endpoint}/testemunho/${id}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setListatestemunho(prevItems =>
                prevItems.map(item =>
                    item.tes_id_tes === id ? { ...item, load: false } : item
                )
            )
            addToast(CompToast('Alteração efetuada com sucesso !!!', 'success')) //--> usa toast
            changetestemunho()
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
            }, 2000)
        })
  }


  const NewCardLista = (event) =>{
    let idx = listacard.length
    let obj ={
       id:idx+1,
       nome:'',
       imagem:null,
       imgfile:[],
       path:'/profissionais',
       imgsaved:false,
       naoexibir:false,
       estado:false,
       display: true
    }
    listacard.push(obj)
    setEstcard(!estcard)
    scrollToId('target-id')
  }

  const atualizaListaCard = (id, param, newValue) => {
    let idx = getIndex(listacard,id)
    //console.log(listacard)
    switch(param){
       case 'nome':
          listacard[idx].nome = newValue
        break
       case 'experiencia':
          listacard[idx].experiencia = newValue
        break
       case 'imagem':
          listacard[idx].imagem = newValue
          setEstcard(!estcard)
        break
       case 'estado':
          listacard[idx].estado = newValue
          //setEstcard(!estcard)
        break
       case 'naoexibir':
          listacard[idx].naoexibir = newValue
          setEstcard(!estcard)
        break
       case 'display':
          listacard[idx].display = newValue
          setEstcard(!estcard)
        break
    }
    console.log(listacard)
  };

  const AddCard = (props) =>{
    let texto_botao = props.idfield === 0 ? 'Salvar' : 'Atualizar'
    return(
      <>
      <div className='mb-1'>
      <CInputGroup className="mb-3">
          <CButton className="clinputtext" style={style} color="primary" onClick={(e)=>NewCardLista(e)}>
               Novo Card
               &nbsp;<FontAwesomeIcon style={{cursor:'pointer',color:'white'}} icon={faCircleArrowDown} />
           </CButton>
           <CFormInput
               id={props.titulo}
               placeholder={props.placeholder}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
               defaultValue={props.valor}
               readOnly
               onChange={(e)=>setValor(props.id,'valor',e.target.value)}
           />
            <Dropdown id={props.id} tipo={props.tipo}/>
            <CButton type="button" style={stylebtsave} color="success" variant="outline" id="button-addon1" onClick={(e)=>handleClick(e,props.id,'spinner',true)}>
                {texto_botao}&nbsp;{props.load ? <SpinnerComp size="sm" color="primaty"/> : <></>}
            </CButton>
       </CInputGroup>
      </div>
      <div>
         <div className='mb-1 d-flex justify-content-center align-items-center'><BtExpandir expande={props.collapse}/></div>
         <CCollapse visible={props.collapse}>
            <CRow>
                <ListaCardService estado={estcard}/>
            </CRow>
            <div id="target-id"></div>
         </CCollapse>
      </div>
      </>
    )
  }

  const scrollToId = (id) => {
    const element = document.getElementById(id);
     if (element) {
         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
  };

  //adiciona nova opcao na lista do body do card
  const AddListaOpcao = (idlistapai,lista) =>{
    //pega "idxpai" index da lista principal
    let idxpai = getIndex(listacard,idlistapai)
    let valor = listacard[idxpai].estado
    let idx = lista.length
    let obj ={
       id:idx,
       texto:'',
       display: true
    }
    lista.push(obj)
    listacard[idxpai].estado = !valor //altera o estado da
    setEstcard(!estcard) //força re-render da lista pai//
  }

  //atualiza input text do index lista de opções atual
  const atualizaListaOpcao = (id, lista, param, newValue) => {
    let idx = getIndex(lista,id)
    switch(param){
       case 'texto':
          lista[idx].texto = newValue
       break

       case 'display':
          lista[idx].display = newValue
          setEstcard(!estcard)
       break

    }

    //console.log(listacard)
  }

  //componente de exibição da lista de opcoes do card
  const ListaCardOpcao = (props) => {
    //console.log(props)
    let listagem = props.lista.filter((item)=>item.display === true)
    return(
        listagem.map((item,index)=>{
          return(
            <CRow>
                <CCol xs={10} className='mt-2'>
                   <CFormInput size="sm"  style={{border:'1px solid #6b38a2'}} onChange={(e)=>atualizaListaOpcao(item.id,listagem,'texto',e.target.value)} defaultValue={item.texto}/>
                </CCol>
                <CCol xs={2} className='mt-2'>
                   <div className="circleimg"><FontAwesomeIcon style={{cursor:'pointer',color:'#6b38a2'}} icon={faTrash} onClick={(e)=>atualizaListaOpcao(item.id,props.lista,'display',false)}/></div>
                </CCol>
             </CRow>
          )
        })
    )
    //let lista = listacard.filter((item)=>item.display === true)
  }

  const ListaCardService = () => {
     //console.log(listacard)
     let lista = listacard.filter((item)=>item.display === true)
     return(
        lista.map((item,index)=>{
            return(
            <CCol xs={4} className='mb-2'>
                <CCard style={{border:'2px solid #360f61'}}>
                    <CCardHeader>
                        <CCardText className='mb-5'>
                        <>
                          { item.naoexibir
                             ? (<div className='mb-2'><CFormCheck id="defaultCheck1" label="Não Exibir Card" checked onChange={(e)=>atualizaListaCard(item.id,'naoexibir',e.target.checked)} /></div>)
                             : (<div className='mb-2'><CFormCheck id="defaultCheck1" label="Não Exibir Card" onChange={(e)=>atualizaListaCard(item.id,'naoexibir',e.target.checked)} /></div>)
                          }
                        </>
                        </CCardText>
                        <CCardText className='mb-4'>
                        {
                          item.imgsaved ?
                          (<div className="containerimg"><CardImagem image={endpoint_img + item.path +'/'+ item.imagem}/></div>)
                          :(<></>)
                        }
                        </CCardText>
                        <CInputGroup size="sm" className="mb-0">
                            <CInputGroupText style={styleinputcard} className="clinputtext">Imagem</CInputGroupText>
                            <CFormInput type="file" onChange={(e)=>onImageChange(e,item.id)} />
                            <div>
                               <div style={{position:'relative',display:'flex',justifyContent:'center',left:'3px',top:'4px'}} className='circleimgspan'>
                                 <FontAwesomeIcon onClick={(e)=>onRemoveAnexo(e,item.id)} style={{cursor:'pointer',position:'relative',top:'3px',color:'#6b38a2'}} size="sm" icon={faTrash}/>
                                </div>
                            </div>
                        </CInputGroup>
                        { item.imagem == null ? (<></>) : (<BadgeImg color="primary" fonte="11px" valor={item.imagem}/>) }
                        {/* <CInputGroup size="sm" className="mb-2 mt-1">
                            <CInputGroupText style={styleinputcard} className="clinputtext">Preço</CInputGroupText>
                            <CFormInput onChange={(e)=>atualizaListaCard(item.id,'preco',e.target.value)} defaultValue={item.preco}/>
                        </CInputGroup> */}
                        <CInputGroup size="sm" className="mb-2 mt-1">
                            <CInputGroupText style={styleinputcard} className="clinputtext">Nome</CInputGroupText>
                            <CFormInput onChange={(e)=>atualizaListaCard(item.id,'nome',e.target.value)} defaultValue={item.nome}/>
                        </CInputGroup>
                        <CInputGroup size="sm" className="mb-2">
                            <CInputGroupText style={styleinputcard} className="clinputtext">Experiênca</CInputGroupText>
                            <CFormTextarea style={{fontSize:'13px'}} rows={2} onChange={(e)=>atualizaListaCard(item.id,'experiencia',e.target.value)} defaultValue={item.experiencia}/>
                        </CInputGroup>
                    </CCardHeader>
                    <CCardFooter>
                        <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'5px'}}>
                           <div className="circleimg"><FontAwesomeIcon style={{cursor:'pointer',color:'red'}} icon={faTrash} onClick={(e)=>atualizaListaCard(item.id,'display',false)}/></div>
                        </div>
                    </CCardFooter>
                </CCard>
            </CCol>
            )
        })
     )
  }

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

  const BtExpandir = (props) =>{
      const fonte = props.fonte ? props.fonte : '10px'
      const largura = props.fonte ? '110px' : ''
      return(
        //  <CBadge style={{minWidth:largura,borderRadius:'5px',fontSize:fonte}} color={props.color}>{props.tipo}</CBadge>
        <CButton size="sm" className="btexpandir" style={{width:'100px'}} onClick={(e)=>atualizaItem('cardprofsection','collapse',null)}>
            Expandir&nbsp;
            { props.expande ? (<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faCircleArrowUp}/>) : (<FontAwesomeIcon size="sm" icon={faCircleArrowDown} style={{color:'white'}}/>) }
        </CButton>
      )
  }

  const Badge = (props) =>{
      const fonte = props.fonte ? props.fonte : '10px'
      const largura = props.fonte ? '110px' : ''
      return(
         <CBadge style={{minWidth:largura,borderRadius:'5px',fontSize:fonte}} color={props.color}>{props.tipo}</CBadge>
      )
  }

  const BadgeImg = (props) =>{
      const fonte = props.fonte ? props.fonte : '10px'
      const largura = props.fonte ? '110px' : ''
      return(
         <CBadge style={{padding:'4px',minWidth:largura,borderRadius:'5px',fontSize:fonte,display:'inline-flex',alignItems:'center'}} color={props.color}>{props.valor}</CBadge>
      )
  }


  const handleDrop = (event,id,param,valor) =>{
      //console.log(listatipos)
      event.preventDefault();
      atualizaItem(id,param,valor)
      let array = listatipos.filter((item)=> item.tip_nome === valor)
      atualizaItem(id,'tipo_id',array[0].tip_id_tip)
      return

  }

  const Dropdown = (props) =>{
     return(
          <CDropdown>
              <CDropdownToggle style={style_dropdown} color="secondary" variant="outline">
                Tipo {props.tipo !== null ? <Badge color={'info'} tipo={props.tipo}/> : <></>}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={(e)=>handleDrop(e,props.id,'tipo','Texto')} href="#">Texto</CDropdownItem>
                <CDropdownItem onClick={(e)=>handleDrop(e,props.id,'tipo','Lista')} href="#">Lista</CDropdownItem>
                <CDropdownItem onClick={(e)=>handleDrop(e,props.id,'tipo','Imagem')} href="#">Imagem</CDropdownItem>
                <CDropdownItem onClick={(e)=>handleDrop(e,props.id,'tipo','Icone')} href="#">Ícone</CDropdownItem>
                <CDropdownItem onClick={(e)=>handleDrop(e,props.id,'tipo','Video')} href="#">Vídeo</CDropdownItem>
              </CDropdownMenu>
          </CDropdown>
     )
  }

  const CriaJsonTextArea = (index) =>{

    //let index = getIndex(listacampos,id)
    let linhas = listacampos[index].linhas
    let obj =  {
      "linhas" : linhas,
    }
    let arrayitens = []
    arrayitens.push(obj)
    let objfinal = {
       "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }

  const CriaJsonImageSimple = (index) =>{

    //let index = getIndex(listacampos,id)
    //let linhas = listacampos[index].linhas
    let obj =  {
      "imagem" : listacampos[index].imagem,
      "path" : listacampos[index].link,
      "saved": listacampos[index].imgsaved,
      "display":listacampos[index].visible,
    }
    let arrayitens = []
    arrayitens.push(obj)
    let objfinal = {
       "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }


  const CriaJsonCard = (id) =>{
    let index = getIndex(listacampos,id)
    let vetor = listacard.filter((item)=>item.display === true)
    let arrayitens = []
    vetor.map((item,index)=>{
       arrayitens.push(item)
    })
    let objfinal = {
       "meta":arrayitens
    }
    let texto  = JSON.stringify(objfinal)
    console.log(texto)
    return JSON.stringify(objfinal)
  }

  const CardImagem = (props) => {
     return(
       <div className="imgprofman" style={{backgroundPosition:'center',backgroundSize:'cover',backgroundImage:`url(${props.image})`}}></div>
     )
  }

  const pesquisarGrid = (event) => {
     console.log(listafiltro)
     console.log(event.target.value)
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.tes_nome.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tes_email.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tes_profissao.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tes_sexo.includes(valor)
        )
        //listafiltro.filter((item)=> item.tes_id_tes == event.target.value)
        console.log(lista)
        setListatestemunho(lista.slice(0,5))
     } else {
        setListatestemunho(listafiltro.slice(0,5))
     }
  }

  const clickPagination = (event,idx) =>{
    //  0,5,5,10
    let ref = idx == 1 ? 0 : idx
    let inicio = ref == 0 ? ref : (ref * 5) - 5
    let fim = idx * 5
    let lista = null
    lista = listafiltro.slice(inicio,fim)
    setListatestemunho(lista)
  }

  const Pagination = (props) => {
    let elemento = []

    for(let i = 1; i <= props.pages; i++ ){
      elemento.push(<CPaginationItem className='cpointer' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
    }

    return (
        <CPagination aria-label="Page navigation example">
        <CPaginationItem className='cpointer' aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        { elemento }
        <CPaginationItem className='cpointer' aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
        </CPagination>
    )
  }

  return(
         <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
           <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
           <CCard className="mb-4">
             <CCardHeader className="clfooter">
               <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Manutenção Section Testemonial</span>
             </CCardHeader>
             <CCardBody>
                 <CRow>
                     <CCol md={12} xs={12} >
                         {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTexto {...listacampos[0]}/>)}
                     </CCol>
                     <CCol md={12} xs={12} >
                         {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTexto {...listacampos[1]}/>)}
                     </CCol>
                      <CCol md={12} xs={12} >
                         {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTextArea {...listacampos[2]}/>)}
                     </CCol>
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
                                        <CTableHeaderCell className='clthinterno' scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Profissão</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Sexo</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Valor</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Comentário</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{borderRadius:'0px 5px 0px 0px'}} scope="col">Criação</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CorpoTabela lista={listatestemunho} estado={est}/>
                                </CTableBody>
                            </CTable>
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                               <Pagination pages={numnpagination}/>
                            </div>
                        </CCard>
                        )}
                     </CCol>
                     {/* <CCol md={12} xs={12} >
                         {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad65full' xs={12} size="lg"/></div>) : ( <AddCard {...listacampos[2]}/>)}
                     </CCol> */}
                    {/* <CCol md={6} xs={6} >
                        <CardImagem image={img02}/>
                    </CCol> */}
                 </CRow>
             </CCardBody>
           </CCard>
         </div>
  )

}

export default ManTestemunhos
