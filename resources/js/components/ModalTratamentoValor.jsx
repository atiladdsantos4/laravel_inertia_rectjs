import {CAlert, CSpinner, CForm, CRow, CBadge, CCol, CButton, CFormTextarea, CModal,
        CModalHeader, CModalTitle, CModalFooter, CModalBody,CCollapse,
        CInputGroup, CInputGroupText, CFormInput, CFormSelect,
        CTable, CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,CTableHead
} from '@coreui/react';
import { ButtonComp } from './ButtonComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar,faComment,faArrowAltCircleDown,faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, memo  } from 'react';
import { Calendario } from './Calendario';
import { ButtonOutlineComp } from './ButtonOutlineComp';
import { BadgeComp } from './BadgeComp';
import { RateComp } from './RateComp';
import { RateCompNew } from './RateCompNew';
import axios from 'axios';
import { CssSyntaxError } from 'postcss';
import { IMaskInput,IMaskMixin } from 'react-imask';

//<FontAwesomeIcon size="2x" style={{ color: '#229741' }} icon={faHeartbeat} />
//tva_id_tva,tva_valor,tva_max_desconto,tva_version_atual,tva_id_tra,tva_created_at,tva_updated_at,tva_deleted_at

export const ModalTratamentoValor = (props) =>{

   const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
   const { isOpen, close, section, icone, token, dados, saved, showhistorico } = props
   const [titulo,setTitulo] = useState(null)
   const [servico,setServico] = useState(null)
   const [desconto,setDesconto]  = useState(dados.tra_valor)
   const [valor,setValor] = useState(dados.tra_valor)
   const [value, setValue] = useState('');
   const [valorinput,setValorinput] = useState('')
   const [versaoatual,setVersaoatual] = useState(null)
   const [email,setEmail] = useState(null)
   const [sexo,setSexo] = useState(null)
   const [load,setLoad] = useState(false)
   const [show,setShow] = useState(false)
   const [telefone,setTelefone] = useState(null)
   const [validated, setValidated] = useState(false)
   const [iscollapsed, setIscollapsed] = useState(false)
   const [iconecollapse,setIconecollapse]  = useState(faArrowAltCircleDown)
   const styleinput = {width:'100px'}

   const InputMaskDesconto = () => {
       const CFormInputDesconto = IMaskMixin(({ inputRef, ...props }) => (
           <CFormInput {...props} ref={inputRef} />
       ))
       return (
           <CFormInputDesconto
               mask={Number}
               placeholder="00.00"
               scale={2}              // Number of decimal places
               signed={false}         // Allow negative numbers (false/true)
               //thousandsSeparator="," // Grouping separator
               padFractionalZeros={true} // Always show decimal places (e.g., .00)
               normalizeZeros={true}  // Remove leading zeros
               radix="."              // Decimal separator character
               mapToRadix={['.']}
               className="input-text"
               feedbackInvalid="O Desconto deve ser informado"
               onBlur = {(e)=>handleBlur(e,'desconto')}
               onComplete={(completedValue) => setDesconto(completedValue)}
               defaultValue={desconto}
               required
           />
        )
    }

    const InputMaskValor = () => {
       const CFormInputValor = IMaskMixin(({ inputRef, ...props }) => (
           <CFormInput {...props} ref={inputRef} />
       ))
       return (
           <CFormInputValor
               mask={Number}
               placeholder="000.00"
               scale={2}              // Number of decimal places
               signed={false}         // Allow negative numbers (false/true)
               //thousandsSeparator="," // Grouping separator
               padFractionalZeros={true} // Always show decimal places (e.g., .00)
               normalizeZeros={true}  // Remove leading zeros
               radix="."              // Decimal separator character
               mapToRadix={['.']}
               className="input-text"
               feedbackInvalid="O Valor deve ser informado"
               onAccept={(value, mask) => setValue(value)}
               onBlur = {(e)=>handleBlur(e,'valor')}
               required
           />
        )
    }

    const ValorInput = () => {
        const [value, setValue] = useState(valor);
        return (
            <IMaskInput
                className="input-text form-control"
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
                onBlur = {(e)=>handleBlur(e,'valor')}
                defaultValue={value}
                placeholder="0,00"
            />
        );
    };

    const DescontoInput = () => {
        const [value, setValue] = useState(desconto);
        return (
            <IMaskInput
                className="input-text form-control"
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
                onBlur = {(e)=>handleBlur(e,'desconto')}
                defaultValue={value}
                placeholder="0,00"
            />
        );
    };


   const handleBlur = (event,tag) => {
      let val = event.target.value
      console.log(event.target.value)
      if(tag === 'desconto'){
             setDesconto(val)
      }
      if(tag === 'valor'){
          setValor(val)
      }
   }

    useEffect(()=>{

      setValor(dados.tra_valor)
      setDesconto(dados.tra_desconto)
      setIscollapsed(false)
      console.log(dados)
    },[dados])

   const handleSubmit = (event) => {

        //tva_id_tva,tva_valor,tva_max_desconto,tva_version_atual,tva_id_tra,tva_created_at,tva_updated_at,tva_deleted_at
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        event.preventDefault()
        console.log('valor'+valor)
        console.log('desconto'+desconto)
        setValidated(true)
        setLoad(true)
        const formData = new FormData()
        formData.append('tva_id_tra', dados.tra_id_tra)
        formData.append('tva_valor', valor)
        formData.append('tva_max_desconto', desconto)
        formData.append('tva_version_atual', 1)
        axios
            .post(`${endpoint}/tratamentosvalor`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setLoad(false)
                setShow(true)
                saved()
                setTimeout(()=>{
                   setShow(false)
                   handleClose()
                },2500)
            })
   }

   const handleClose = () =>{
      setIconecollapse(faArrowAltCircleDown)
      close()
   }

   const ExibeHistorico = () =>{
    if(iscollapsed){
       setIconecollapse(faArrowAltCircleDown)
    } else {
       setIconecollapse(faArrowAltCircleUp)
    }
    setIscollapsed(!iscollapsed)
   }

   const HistoricoValores = () =>{
      let classe = null
      let centro = {textAlign:'center'}
      let esquerda = {textAlign:'right'}
      let celula = {backgroundColor:'rgb(160, 50, 120)',color:'white',textAlign:'center'}
      let tam = dados.tra_historico.length
      console.log('tamanho:'+tam)
      const ItemsTabela = (props) =>{
         if( props.tamanho > 0 ){
            return(
                <CTableBody>
                    {
                    dados.tra_historico.map((item,index)=>{
                        return(
                            <CTableRow color={classe}>
                                <CTableDataCell style={esquerda}>{item.tva_valor}</CTableDataCell>
                                <CTableDataCell style={esquerda}>{item.tva_max_desconto}</CTableDataCell>
                                <CTableDataCell style={centro}>{item.tva_created_at}</CTableDataCell>
                                <CTableDataCell style={centro}>{item.tva_version_atual == 1 ? <Badge color="success" texto="sim"/> : <Badge color="danger" texto="não"/>}</CTableDataCell>
                            </CTableRow>
                        )
                    })

                    }
               </CTableBody>
            )
         } else {
            return(
                <CTableBody>
                    <CTableRow color={classe}>
                        <CTableDataCell style={{textAlign:'center'}} colspan={9} >Não há dados para pesquisa</CTableDataCell>
                    </CTableRow>
                </CTableBody>
            )
         }
      }
      const Badge = (props) =>{
         return(
            <CBadge color={props.color} shape="rounded-pill">{props.texto}</CBadge>
         )
      }
      return(
        <>
        <div style={{textAlign:'center'}} className='mb-2'>
            Histórico&nbsp;
            <FontAwesomeIcon icon={iconecollapse} style={{cursor:'pointer'}} onClick={ExibeHistorico}/>
        </div>
       <CCollapse visible={iscollapsed}>
        <CTable>
            <CTableHead style={{fontSize:'11px !important'}}>
                    <CTableRow>
                        <CTableHeaderCell style={celula}>Valor</CTableHeaderCell>
                        <CTableHeaderCell style={celula}>Desconto</CTableHeaderCell>
                        <CTableHeaderCell style={celula}>Data Vigor</CTableHeaderCell>
                        <CTableHeaderCell style={celula}>Versão Atual</CTableHeaderCell>
                    </CTableRow>
            </CTableHead>
            <ItemsTabela tamanho={tam}/>
        </CTable>
        </CCollapse>
        </>
      )
   }

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
             <div style={{display:'flex'}}>
             <div class="circlemoney"><FontAwesomeIcon size="1x" icon={icone} style={{cursor:'pointer',color:'white'}}/></div>
             &nbsp;Definir preço do Tratamento
             </div>
          </CModalTitle>
        </CModalHeader>

        <CForm
             className="row g-3 needs-validation" noValidate  id="form-id" onSubmit={handleSubmit} validated={validated}>
        <CModalBody className="pt-5">
            <CAlert dismissible visible={show} color="success" onClose={() => setShow(false)}>Testemunho Enviado Comsucesso</CAlert>
            <CRow>

                    <CCol md={12} xs={12}>
                    {
                    showhistorico ? (<HistoricoValores/>) : (<></>)
                    }
                    </CCol>

            </CRow>
            <CRow>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Serviço</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu titulo"
                            className="input-text"
                            aria-label="Username"
                            //onChange={(e) => setEmail(e.target.value)}
                            value={dados.tra_servico}
                            feedbackInvalid="O Email deve ser informado."
                            aria-describedby="basic-addon1"
                            required
                        />
                    </CInputGroup>
               </CCol>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth has-validation" id="basic-addon1">Tratamento</CInputGroupText>
                        <CFormInput
                            placeholder="Digite seu titulo"
                            className="input-text"
                            aria-label="Username"
                            //onChange={(e) => setTitulo(e.target.value)}
                            value={dados.tra_titulo}
                            feedbackInvalid="O titulo deve ser informado."
                            aria-describedby="basic-addon1"
                            required
                        />
                    </CInputGroup>

               </CCol>
               <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Desconto(%)</CInputGroupText>
                        <DescontoInput/>
                        {/* <InputMaskDesconto /> */}
                    </CInputGroup>
                </CCol>
                <CCol md={12} xs={12}>
                    <CInputGroup size="sm" className="mb-3">
                        <CInputGroupText style={styleinput} className="inputwidth" id="basic-addon1">Valor</CInputGroupText>
                        {/* <InputMaskValor/> */}
                        <ValorInput/>
                    </CInputGroup>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleClose()}>
              Close
          </CButton>
          <CButton type="submit" color="primary">
            Salvar Dados&nbsp;{load ? (<CSpinner size="sm"/>) : (<></>)}
           </CButton>
        </CModalFooter>
        </CForm>
      </CModal>
   )
}
