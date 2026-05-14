import { React,useEffect, useState} from 'react';
import { CContainer, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle,CCardImage, CBadge,CSpinner } from '@coreui/react';
import imgCheck from '../images/checkbox.png'
import imgSelo from '../images/selo_preco.png'
import { ButtonPillsComp } from './ButtonPillsComp';
import { BadgeComp } from './BadgeComp';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const CardServiceComp = (props) => {

   const {openModal, setModal} = props
   const [classe,setClasse]= useState(props.classe && null )
   const [service,setService]= useState(props.title && null )
   const [price,setPrice]= useState(props.price && null )
   const [title,setTitle]= useState(props.title && null )
   const [subtitle,setSubtitle] = useState(props.subtitle && null )
   const [paragraph,setParagraph] = useState(null )
   const [imagem,setImagem]= useState(false )
   const [buttonlabel,setButtonlabel]= useState(props.buttonlabel && null )
   const [buttonclass,setButtonclass]= useState(null)
   const [promocard,setPromocard]= useState(false )
   const [cardStyle,setcardStyle]= useState(null)
   const [textcardStyle,settextcardStyle] = useState(null)
   const [idspinner,setIdspinner] = useState(null)


   useEffect(() => {
      setService(props.service)
      setTitle(props.title)
      setSubtitle(props.subtitle)
      setClasse(props.classe)
      setPrice(props.price)
      setImagem(props.imagem)
      setButtonlabel(props.buttonlabel)
      setParagraph(props.paragraph)
      setIdspinner(props.idspinner)
      setcardStyle('clcard-service')
      let btclass = 'btclass rounded-pill' // Access using props.propName
      setButtonclass(btclass)

   },[props])

   // Define the event the child can emit
   //const emit = defineEmits(['open','mudamsg'])

   const open = () => {
      setModal()
      openModal()
   };

   const Selo = (props) =>{
      return(
        <>
          <div class="text-center" style={{position:'relative',top:'20px',left:'116px',zIndex:'11',fontSize:'13px',fontWeight:'bold',color:'blue'}}>{props.valor}</div>
          <div class="text-center" style={{position:'relative',top:'-20px',left:'115px',zIndex:'10'}}><CCardImage class="img" style={{width:'20%'}} orientation="top" src={imgSelo} /></div>
        </>
      )
   }

return(
    <div data-aos="fade-right">
            <CCard className={cardStyle} style={{width: '19rem',minHeight:'435px'}}>
                <Selo valor={price}/>
                <CCardBody>
                    <p class="text-center"><CCardImage class="img" orientation="top" src={imagem} /></p>
                    <div style={{display:'flex',justifyContent:'center'}}><CBadge className='btpromo'>{service}</CBadge></div>
                    <CCardTitle><span className='header_card'>{title}</span></CCardTitle>
                    <CCardText></CCardText>
                    <CCardText></CCardText>
                    <CCardSubtitle class="mb-2 text-body-secondary"><h6>{paragraph}</h6></CCardSubtitle>
                    <CCardText></CCardText>
                    <CCardText style={{textAlign:'center'}}>
                        <ButtonPillsComp label={buttonlabel} color="secondary" classe={buttonclass} icon={faShoppingCart} click={open}/>
                        &nbsp;<CSpinner id={idspinner} size="sm" style={{visibility:'hidden'}}></CSpinner>
                    </CCardText>
                </CCardBody>
            </CCard>
    </div>
  )
}
