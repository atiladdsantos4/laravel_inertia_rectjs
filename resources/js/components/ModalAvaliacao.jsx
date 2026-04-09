import {CAlert, CSpinner, CForm, CRow, CBadge, CCol, CButton, CFormTextarea, CModal, CModalHeader, CModalTitle, CModalFooter, CModalBody, CInputGroup, CInputGroupText, CFormInput, CFormSelect  } from '@coreui/react';
import { ButtonComp } from './ButtonComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar,faComment } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { Calendario } from './Calendario';
import { ButtonOutlineComp } from './ButtonOutlineComp';
import { BadgeComp } from './BadgeComp';
import { RateComp } from './RateComp';
import { RateCompNew } from './RateCompNew';
import axios from 'axios';
import { CssSyntaxError } from 'postcss';
import { IMaskInput,IMaskMixin } from 'react-imask';

//<FontAwesomeIcon size="2x" style={{ color: '#229741' }} icon={faHeartbeat} />


export const ModalAvaliacao = (props) =>{

   const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
   const { isOpen, close, section, tela, token } = props
   const [nome,setNome] = useState(null)
   const [profissao,setProfissao] = useState(null)
   const [comentario,setComentario]  = useState(null)
   const [valor,setValor] = useState(null)
   const [email,setEmail] = useState(null)
   const [sexo,setSexo] = useState(null)
   const [load,setLoad] = useState(false)
   const [show,setShow] = useState(false)
   const [telefone,setTelefone] = useState(null)
   const [validated, setValidated] = useState(false)
   const styleinput = {width:'100px'}


   useEffect(()=>{},[
      console.log(props)
   ])

   const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        event.preventDefault()
        setValidated(true)
        setLoad(true)
        const formData = new FormData()
        formData.append('tes_nome', nome)
        formData.append('tes_profissao', profissao)
        formData.append('tes_valor_rate', valor)
        formData.append('tes_comentario', comentario)
        formData.append('tes_sexo', sexo)
        formData.append('tes_id_sec', section)
        formData.append('tes_email', email)
        axios
            .post(`${endpoint}/testemunho`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setLoad(false)
                setShow(true)
                setTimeout(()=>{
                   setShow(false)
                   handleClose()
                },2500)
            })
   }

   const handleClose = () =>{
      close()
   }

   const profissoes = [
    {nome:'Outras'},
    {nome:'Administrador'},
    {nome:'Advogado'},
    {nome:'Agrônomo'},
    {nome:'Analista de Customer Success'},
    {nome:'Analista de Segurança da Informação'},
    {nome:'Cientista de Dados'},
    {nome:'Cineasta/Editor de Vídeo'},
    {nome:'Consultor de Inteligência Artificial'},
    {nome:'Consultor Financeiro'},
    {nome:'Contador'},
    {nome:'Coordenador de Mídias Sociais'},
    {nome:'Copywriter'},
    {nome:'Corretor de Imóveis'},
    {nome:'Cuidador de Idosos'},
    {nome:'Desenvolvedor de Software/Aplicativos'},
    {nome:'Designer Gráfico/Digital'},
    {nome:'Enfermeiro'},
    {nome:'Engenheiro Ambiental'},
    {nome:'Engenheiro Civil'},
    {nome:'Engenheiro de Produção'},
    {nome:'Engenheiro de Software'},
    {nome:'Engenheiro Florestal'},
    {nome:'Gestor Ambiental'},
    {nome:'Gestor de Recursos Humanos'},
    {nome:'Médico (Cardiologista, Clínico Geral, Cirurgião)'},
    {nome:'Nutricionista'},
    {nome:'Operador de Produção/Máquinas'},
    {nome:'Pedagogo'},
    {nome:'Produtor Cultural'},
    {nome:'Professor (Educação Básica/Superior)'},
    {nome:'Psicólogo'},
    {nome:'Relações Internacionais'},
    {nome:'Sociólogo'},
    {nome:'Técnico em Eletricidade'},
    {nome:'Veterinário'},
  ]

   return(
      <CModal
        visible={isOpen}
        aria-labelledby="LiveDemoExampleLabel"
        onClose={() => handleClose()}
        backdrop="static"
        alignment="center"
        id="modal-combo"
        //style={{zIndex:'10000'}}
      >
        <CModalHeader className="cmodal_header">
          <CModalTitle id="VerticallyCenteredExample">
             <FontAwesomeIcon size="1x" icon={faComment}/>&nbsp;
               Faça a sua Avaliação
          </CModalTitle>
        </CModalHeader>
        <CForm
             className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>
        <CModalBody className="pt-5">
            <CAlert dismissible visible={show} color="success" onClose={() => setShow(false)}>Testemunho Enviado Comsucesso</CAlert>
            <CRow>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Nome</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu nome"
                            className="input-text"
                            aria-label="Username"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                            feedbackInvalid="O Nome deve ser informado."
                            aria-describedby="basic-addon1"
                            required
                        />
                    </CInputGroup>

               </CCol>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Email</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu nome"
                            className="input-text"
                            aria-label="Username"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            feedbackInvalid="O Email deve ser informado."
                            aria-describedby="basic-addon1"
                            required
                        />
                    </CInputGroup>
               </CCol>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Sexo</CInputGroupText>
                         <CFormSelect
                              className="input-text"
                              feedbackInvalid="Sexo deve ser informada"
                              onChange={(e)=>setSexo(e.target.value)}
                              required
                         >
                            <option value="">{'----> Selecione o Sexo'}</option>
                            <option value="M">{'Masculino'}</option>
                            <option value="F">{'Feminino'}</option>
                        </CFormSelect>
                    </CInputGroup>
                </CCol>
                <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Profissao</CInputGroupText>
                         <CFormSelect
                              className="input-text"
                              feedbackInvalid="A Profissão deve ser informada"
                              onChange={(e)=>setProfissao(e.target.value)}
                              required
                         >
                            <option value="">{'----> Selecione a Profissão'}</option>
                            {
                              profissoes.map((item,index)=>{
                                 return(
                                    <option value={item.nome}>{item.nome}</option>
                                 )
                              })
                            }
                        </CFormSelect>
                    </CInputGroup>
                </CCol>
                <CCol md={6} xs={6}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Rate</CInputGroupText>
                        <div style={{maxHeight:'20px',width:'130px',display:'flex',top:'8px;'}}><RateCompNew click={setValor}/></div>
                    </CInputGroup>
                </CCol>
                <CCol md={6} xs={6}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Valor</CInputGroupText>
                        <CFormInput
                            placeholder="Valor Avaliação"
                            className="input-text"
                            aria-label="Username"
                            onChange={(e) => setValor(e.target.value)}
                            value={valor}
                            feedbackInvalid="O Valor deve ser informado."
                            required
                        />
                    </CInputGroup>
                </CCol>
            </CRow>
            <CRow>
               <CCol md={12} xs={12} className="pt-2">
                    <CInputGroup>
                        <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Comentário</CInputGroupText>
                        <CFormTextarea
                            rows={4}
                            size="sm"
                            className="input-text"
                            placeholder="Digite seu comentário"
                            aria-label="Disabled textarea example"
                            onChange={(e)=>setComentario(e.target.value)}
                            value={comentario}
                        />
                    </CInputGroup>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleClose()}>
              Close
          </CButton>
          <CButton type="submit" color="primary">
            Enviar Comentário&nbsp;{load ? (<CSpinner size="sm"/>) : (<></>)}
           </CButton>
        </CModalFooter>
        </CForm>
      </CModal>
   )
}
