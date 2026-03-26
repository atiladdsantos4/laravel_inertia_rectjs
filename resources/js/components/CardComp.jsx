import { React,useEffect, useState} from 'react';
import { CContainer, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react';
import imgCheck from '../images/checkbox.png'
import { ButtonPillsComp } from './ButtonPillsComp';
import { BadgeComp } from './BadgeComp';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const CardComp = (props) => {
   const [classe,setClasse]= useState(props.classe && null )
   const [price,setPrice]= useState(props.price && null )
   const [title,setTitle]= useState(props.title && null )
   const [subtitle,setSubtitle]= useState(props.subtitle && null )
   const [buttonlabel,setButtonlabel]= useState(props.buttonlabel && null )
   const [promocard,setPromocard]= useState(false )
   const [cardStyle,setcardStyle]= useState(null)
   const [textcardStyle,settextcardStyle] = useState(null)


   useEffect(() => {
      setTitle(props.title)
      setSubtitle(props.subtitle)
      setClasse(props.classe)
      setPrice(props.price)
      let cardStyle =  props.promocard === true ? 'clcardpromo' : 'clcard'
      setcardStyle(cardStyle)
      let textcardStyle = props.promocard === true ? 'textpromo cardtexto' : 'textcard cardtexto' // Access using props.propName
      settextcardStyle(textcardStyle)
   },[props])



   // Define the event the child can emit
   //const emit = defineEmits(['open','mudamsg'])

   const open = () => {
      //emit('mudamsg');
      //emit('open');
   };


   const buttonTitle = props.buttonlabel; // Access using props.propName




return(
    <div data-aos="fade-right">
        <CCard className={cardStyle}>
            {
                (props.promocard === true ? <BadgeComp customclass="clbadge" label="MOST POPULAR"/> : null)
            }
        <CCardBody>
            <CCardTitle><h1 className={textcardStyle}>{price}</h1></CCardTitle>
            <CCardTitle><h3 className={textcardStyle}>{title}</h3></CCardTitle>
            <CCardSubtitle class="mb-2 text-body-secondary"><h6 className={textcardStyle}>{subtitle}</h6></CCardSubtitle>
            <CCardText></CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/>Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/> Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/> Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/> Lorem Ipsum</CCardText>
            <CCardText className={textcardStyle}><img class="imgcheck" src={imgCheck}/> Lorem Ipsum</CCardText>
            <CCardText></CCardText>
            <CCardText style={{textAlign:'center'}}>
                {/* <ButtonPill @click="open" v-if="promocard == false" :label="buttonlabel" class="btclass" color="secondary" icon="fa-solid fa-cart-shopping"/>
                <ButtonPill @click="open" v-else :label="buttonlabel" class="btpromo" color="secondary" icon="fa-solid fa-cart-shopping"/> */}
            </CCardText>
        </CCardBody>
        </CCard>
    </div>
  )
}
