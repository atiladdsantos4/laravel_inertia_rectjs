import { React,useEffect, useState, useStatee } from 'react';
import { CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCode } from '@fortawesome/free-solid-svg-icons';
//<FontAwesomeIcon size="2x" style={{ color: '#229741' }} icon={faHeartbeat} />



export const ButtonPreview = (props) =>{
  const fonte = props.fonte ? props.fonte : '10px'
  const largura = props.fonte ? '110px' : ''
  const [link,setLink] = useState(null)

  /*
  const BtPreview = (props) =>{
        const fonte = props.fonte ? props.fonte : '10px'
        const largura = props.fonte ? '110px' : ''
        return(
          <CButton  href="salao" target="_blank" size="sm" className="btexpandir" style={{width:'100px'}}>
              Preview&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faFileCode}/>
          </CButton>
        )
    }
  */

  useEffect(() => {
     setLink(props.link)
  },[props]);

  return(
     <CButton  href={link} target="_blank" size="sm" className="btexpandir" style={{width:'100px'}}>
           Preview&nbsp;<FontAwesomeIcon size="sm" style={{color:'white'}} icon={faFileCode}/>
     </CButton>

  )

}
