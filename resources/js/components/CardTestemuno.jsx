import { React,useEffect, useState} from 'react';
import { CContainer, CBadge, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle, CCardHeader } from '@coreui/react';
import imgCheck from '../images/checkbox.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img01 from '../images/avatar/avatar_homem.png'
import imghomem from '../images/avatar/avatar_homem.png'
import imgmulher from '../images/avatar/avatar_mulher.png'
import { RateCompNew } from './RateCompNew';


export const CardTestemunho = (props) => {

   const {openModal, setModal} = props
   const [classe,setClasse] = useState(props.classe && null )
   const [nome,setNome] = useState(null )
   const [comentario,setComentario] = useState(null )


   useEffect(() => {
    //   setTitle(props.title)
    //   setSubtitle(props.subtitle)
    //   setClasse(props.classe)
    //   setPrice(props.price)
    //   setButtonlabel(props.buttonlabel)
    //   setListaopcao(props.listaopcao)
    //   let cardStyle =  props.promocard === true ? 'clcardpromo' : 'clcard'
    //   setcardStyle(cardStyle)
    //   let textcardStyle = props.promocard === true ? 'textpromo cardtexto' : 'textcard cardtexto' // Access using props.propName
    //   settextcardStyle(textcardStyle)
    //   let btclass = props.promocard === true ? 'btpromo rounded-pill' : 'btclass rounded-pill' // Access using props.propName
    //   setButtonclass(btclass)
    //   console.log(props.listaopcao)
   },[props])


return(
    <div data-aos="fade-right">
        <CCard style={{width:'280px'}}>
            <CCardHeader style={{display:'flex',justifyContent:'center'}}>
                    {
                      props.tes_sexo === 'M' ? (
                         <div className="clavatar" style={{backgroundPosition:'center',backgroundSize:'cover',backgroundImage:`url(${imghomem})`}}></div>
                      ) : (
                         <div className="clavatar" style={{backgroundPosition:'center',backgroundSize:'cover',backgroundImage:`url(${imgmulher})`}}></div>
                      )
                    }
                    <div style={{position:'relative',top:'20px',left:'10px'}}><RateCompNew readonly={true} valorate={props.tes_valor_rate}/></div>
                    <div style={{position:'relative',top:'50px',left:'-45px'}}>
                        <CBadge color="primary" shape="rounded-pill">{props.tes_valor_rate}</CBadge>
                    </div>
            </CCardHeader>
            <CCardBody className="mb-1">
                    <div style={{position:'relative',top:'-4px',left:'0px',fontStyle:'bold',color:'rgb(160, 50, 120)'}}>{props.tes_nome}</div>
                     <u>Comentario:</u>
                     <p className="mt-2" style={{fontStyle:'italic',fontSize:'12px'}}>{'"'+props.tes_comentario+'"'}</p>
            </CCardBody>
        </CCard>
    </div>
  )
}
