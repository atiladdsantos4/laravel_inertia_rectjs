import { React,useEffect, useState} from 'react';
import { CContainer, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react';
import imgCheck from '../images/checkbox.png'
import { ButtonPillsComp } from './ButtonPillsComp';
import { BadgeComp } from './BadgeComp';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const CardComp = (props) => {

   const {openModal, setModal} = props
   const [classe,setClasse]= useState(props.classe && null )
   const [price,setPrice]= useState(props.price && null )
   const [title,setTitle]= useState(props.title && null )
   const [subtitle,setSubtitle]= useState(props.subtitle && null )
   const [buttonlabel,setButtonlabel]= useState(props.buttonlabel && null )
   const [buttonclass,setButtonclass]= useState(null)
   const [promocard,setPromocard]= useState(false )
   const [cardStyle,setcardStyle]= useState(null)
   const [textcardStyle,settextcardStyle] = useState(null)


   useEffect(() => {
      setTitle(props.title)
      setSubtitle(props.subtitle)
      setClasse(props.classe)
      setPrice(props.price)
      setButtonlabel(props.buttonlabel)
      let cardStyle =  props.promocard === true ? 'clcardpromo' : 'clcard'
      setcardStyle(cardStyle)
      let textcardStyle = props.promocard === true ? 'textpromo cardtexto' : 'textcard cardtexto' // Access using props.propName
      settextcardStyle(textcardStyle)
      let btclass = props.promocard === true ? 'btpromo rounded-pill' : 'btclass rounded-pill' // Access using props.propName
      setButtonclass(btclass)
   },[props])

   // Define the event the child can emit
   //const emit = defineEmits(['open','mudamsg'])

   const open = () => {
      setModal()
      openModal()
   };

return(
    <div data-aos="fade-right">
        <CCard className={cardStyle}>
            {
                (props.promocard === true ? <BadgeComp classe="clbadge" label="MOST POPULAR"/> : null)
            }
        <CCardBody>
            <CCardTitle><h1 className={textcardStyle}>{price}</h1></CCardTitle>
            <CCardTitle><h3 className={textcardStyle}>{title}</h3></CCardTitle>
            <CCardSubtitle class="mb-2 text-body-secondary"><h6 className={textcardStyle}>{subtitle}</h6></CCardSubtitle>
            <CCardText></CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/>&nbsp;Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/>&nbsp;Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/>&nbsp;Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/>&nbsp;Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/>&nbsp;Lorem Ipsum</CCardText>
            <CCardText></CCardText>
            <CCardText style={{textAlign:'center'}}>
                <ButtonPillsComp label={buttonlabel} color="secondary" classe={buttonclass} icon={faShoppingCart} click={open}/>
            </CCardText>
        </CCardBody>
        </CCard>
    </div>
  )
}
