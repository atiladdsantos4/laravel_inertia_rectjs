import { React,useEffect, useState, Suspense, useRef } from 'react';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import { SpinnerComp } from '../../components/SpinnerComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CSpinner,
  CRow,
  CPlaceholder,
  CFormInput,
  CFormTextarea,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  CBadge,
  CContainer,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react'


const ManAbout = (props) =>{


  const [loadpage,setLoadpage] = useState(true)
  const [icone,setIcon] = useState(null)
  const [listacampos,setListacampos] = useState([])
  const [listatags,setListatags] = useState([])
  const [listatipos,setListatipos] = useState([])
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const token = props.token
  const sei_display = 1
  const empresa = props.dados_section.sec_id_emp
  const endpoint = props.end
  const sei_id_sec = props.dados_section.sec_id_sec
  const toaster = useRef(null)
  const style = {width:'130px'}
  const style_dropdown = {borderRadius:'0px 0px 0px 0px',width:'118px',backgroundColor:'#200D35',color:'white'}
  const style_placeholder = {paddingBottom:'15px'}
  console.log(props)


  const handleClick = (event,id,nome,valor) => {
     console.log(listacampos)
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
         setLista(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, valor: newValue } : item
            )
          )
          let path_img = empresa+'/about/'+newValue
          setLista(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, link: path_img } : item
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
    }
  };

  const setValor = (id,nome,valor) => {
     console.log(id)
     console.log(nome)
     console.log(valor)
     console.log(listacampos)
     //atualizaItem(id,nome,valor)
     let index = getIndex(listacampos,id)
     listacampos[index].valor = valor
    //  console.log(listacampos[index])
  }

  const getIndex = (lista,id) => {
    for(let i=0; i < lista.length; i++){
        if( lista[i].id === id){
          return i
        }
    }
  }

  const getTipoTag = (valor) =>{
    console.log('tipos')
    console.log(listatipos)
    console.log(listatags)
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
       nome:'textosection',
       label:'Texto Sessão'
     },
     {
       nome:'pontuacao',
       label:"Pontuação Rate"
     },
     {
       nome:'textorate',
       label:"Texto Rate"
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
      //muda: setValor,
      //click: (e)=>handleClick('titulo','spinner',true)
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
      //muda: (e)=>setValor('subtitulo','valor',e.target.value),
      //click: (e)=>handleClick('subtitulo','spinner',true)
    },
    {
      idfield:0,
      id:'textosection',
      nome:'textosection',
      titulo:"Texto Sessão",
      placeholder:"Informe o Texto Sessão",
      load:false,
      estilo:style,
      linhas:3,
      type:'textarea',
      valor:'',
      tipo:null,
      tipo_id:'',
      //muda: (e)=>setValor('subtitulo','valor',e.target.value),
      //click: (e)=>handleClick('subtitulo','spinner',true)
    },
    {
      idfield:0,
      id:'pontuacao',
      nome:'pontuacao',
      titulo:"Pontuação Rate",
      placeholder:"Informe a Pontuação do Rate",
      load:false,
      estilo:style,
      linhas:0,
      type:'input',
      valor:'',
      tipo:null,
      tipo_id:'',
      //muda: (e)=>setValor('subtitulo','valor',e.target.value),
      //click: (e)=>handleClick('subtitulo','spinner',true)
    },
    {
      idfield:0,
      id:'textorate',
      nome:'textorate',
      titulo:"Texto do Rate",
      placeholder:"Informe Texto do Rate",
      load:false,
      estilo:style,
      linhas:0,
      type:'input',
      valor:'',
      tipo:null,
      tipo_id:'',
      //muda: (e)=>setValor('subtitulo','valor',e.target.value),
      //click: (e)=>handleClick('subtitulo','spinner',true)
    }

  ]

  useEffect(()=>{
    setIcon(props.icon)
    //setListacampos(lista)
    setListatipos(props.tipos)
    setListatags(props.tags)
    axios
        .get(`${endpoint}/sectionitem?listagem=S`,{
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
            result.data.data.sections.map((item,index)=>{
               label_campos = array_campos.filter((it)=> it.nome === item.sei_nome)
               nlinhas = null
               if( item.sei_tag == 'textarea' ){
                  let string = JSON.parse(item.sei_json)
                  nlinhas = string.meta[0].linhas
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
               }
               lista_inicial.push(objlista)
               console.log(item)
            })
            let existe = null
            lista.map((item,index)=>{
              existe = lista_inicial.filter((it)=> it.nome === item.nome)
              if( existe.length == 0){
                console.log('existe')
                console.log(existe)
                lista_inicial.push(item)
              }
            })
            setListacampos(lista_inicial)
            setLoadpage(false)
        })
  },[props,saved])


  const  handleSave = (id,lista,valor) =>{
     let index = getIndex(lista,id)
     let tag = getTipoTag(lista[index].type)
     let json = null
     if( lista[index].idfield == 0){
        atualizaItem(id, 'spinner', true)

        if( lista[index].type == 'textarea' ){
           json = CriaJsonTextArea(index)
        } else {
           json = null
        }

        const formData = new FormData()
        //formData.append('file', lista[index].imgfile[0])
        formData.append('sei_display', sei_display)
        formData.append('sei_nome', lista[index].nome)
        formData.append('sei_valor', lista[index].valor)
        formData.append('sei_placeholder', lista[index].placeholder)
        formData.append('sei_json', json)
        formData.append('sei_id_emp', empresa)
        formData.append('sei_id_sec', sei_id_sec)
        formData.append('sei_id_tip', lista[index].tipo_id)
        formData.append('sei_id_tag', tag)
        //formData.append('sei_link', lista[index].link)
        //formData.append('has_image', true)

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
            addToast(CompToast('Dados gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
            }, 2000)
        })
    } else {
        if( lista[index].type == 'textarea' ){
           json = CriaJsonTextArea(index)
        } else {
           json = null
        }
        atualizaItem(id, 'spinner', true)
        const formData = new FormData()
        //formData.append('file', lista[index].imgfile[0])
        formData.append('sei_display', sei_display)
        formData.append('sei_nome', lista[index].nome)
        formData.append('sei_valor', lista[index].valor)
        formData.append('sei_json', json)
        formData.append('sei_placeholder', lista[index].placeholder)
        formData.append('sei_id_emp', empresa)
        formData.append('sei_id_sec', sei_id_sec)
        formData.append('sei_id_tip', lista[index].tipo_id)
        formData.append('sei_id_tag', tag)
        //formData.append('sei_link', lista[index].link)
        //formData.append('has_image', true)
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
            <CButton type="button" color="success" variant="outline" id="button-addon1" onClick={(e)=>handleClick(e,props.id,'spinner',true)}>
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
            <CButton type="button" color="success" variant="outline" id="button-addon1" onClick={(e)=>handleClick(e,props.id,'spinner',true)}>
                {texto_botao}&nbsp;{props.load ? <SpinnerComp size="sm" color="primaty"/> : <></>}
            </CButton>
        </CInputGroup>
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

  const Badge = (props) =>{
      const fonte = props.fonte ? props.fonte : '10px'
      const largura = props.fonte ? '110px' : ''
      return(
         <CBadge style={{minWidth:largura,borderRadius:'5px',fontSize:fonte}} color={props.color}>{props.tipo}</CBadge>
      )
  }


  const handleDrop = (event,id,param,valor) =>{
      console.log(listatipos)
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




  return(

    <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
      <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
      <CCard className="mb-4">
        {/* <CSpinner id="spin1" color="light" size="sm" aria-hidden="false" className="exibe_spin"/> */}
        <CCardHeader className="clfooter">
          {/* <Icon classe="text-success" icon={cilTablet} size="xl" />{' '} */}
          {/* <Icon icon={cilSettings} className="flex-shrink-0 me-2" width={24} height={24} /> */}
          <span style={{color:'white'}}><FontAwesomeIcon icon={icone} />&nbsp;Manutenção Section About</span>
          {/* <DocsLink text="preview" href={preview} /> */}
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
                    {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad65full' xs={12} size="lg"/></div>) : ( <InputTextArea {...listacampos[2]}/>)}
                </CCol>
                <CCol md={12} xs={12} >
                    {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTexto {...listacampos[3]}/>)}
                </CCol>
                <CCol md={12} xs={12} >
                    {loadpage ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={12} size="lg"/></div>) : ( <InputTexto {...listacampos[4]}/>)}
                </CCol>
            </CRow>
        </CCardBody>
      </CCard>
    </div>
  )

}

export default ManAbout
