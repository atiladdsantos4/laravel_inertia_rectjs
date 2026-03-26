import { React,useEffect, useState} from 'react';
import { CContainer, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle,CCardImage } from '@coreui/react';
import imgCheck from '../images/checkbox.png'
import { ButtonPillsComp } from './ButtonPillsComp';
import { BadgeComp } from './BadgeComp';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const CardServiceComp = (props) => {
   const [classe,setClasse]= useState(props.classe && null )
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


   useEffect(() => {
      setTitle(props.title)
      setSubtitle(props.subtitle)
      setClasse(props.classe)
      setPrice(props.price)
      setImagem(props.imagem)
      setButtonlabel(props.buttonlabel)
      setParagraph(props.paragraph)
      setcardStyle('clcard-service')
      let btclass = 'btclass rounded-pill' // Access using props.propName
      setButtonclass(btclass)

   },[props])

   // Define the event the child can emit
   //const emit = defineEmits(['open','mudamsg'])

   const open = () => {
      //emit('mudamsg');
      //emit('open');
   };

return(
    <div data-aos="fade-right">
        <CCard className={cardStyle} style={{width: '19rem'}}>
            <CCardBody>
                <p class="text-center"><CCardImage class="img" orientation="top" src={imagem} /></p>
                <CCardTitle><h3>{title}</h3></CCardTitle>
                <CCardText></CCardText>
                <CCardText></CCardText>
                <CCardSubtitle class="mb-2 text-body-secondary"><h6>{paragraph}</h6></CCardSubtitle>
                <CCardText></CCardText>
                <CCardText style={{textAlign:'center'}}>
                    <ButtonPillsComp label={buttonlabel} color="secondary" classe={buttonclass} icon={faShoppingCart}/>
                </CCardText>
            </CCardBody>
        </CCard>
    </div>
  )
}
