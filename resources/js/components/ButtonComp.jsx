import { React,useEffect, useState, useStatee } from 'react';
import { CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//<FontAwesomeIcon size="2x" style={{ color: '#229741' }} icon={faHeartbeat} />



export const ButtonComp = (props) =>{
  /*
   label: { type: String, default: null }, // button label's name
     color: { type: String, default: 'primary' }, // 'primary', 'secondary', 'ghost', etc.
     type: { type: String, default: 'button' },
     loading: { type: Boolean, default: false },
     disabled: { type: Boolean, default: false },
     icon:{ type: String, default: '' },
     customClass: { type: String, default: '' }
  */
  const [label,setLabel] = useState(props.label ?? null)
  const [type,setType] = useState(props.type ?? null)
  const [color,setColor] = useState(props.color ?? 'primary')
  const [loading,setLoading] = useState(props.loading ?? null)
  const [disabled,setDisabled] = useState(false)
  const [icon,setIcon] = useState(props.icon)
  const [classe,setClasse] = useState(props.classe ?? null)

  useEffect(() => {
     console.log('props.icon:'+props.icon)
     setLabel(props.label)
     setColor(props.color)
     setClasse(props.classe)
     setDisabled(props.disabled)
  },[props]);

  return(
        <CButton
        type={type}
        color={color}
        disabled={disabled}
        className={classe}
        >
        {label}&nbsp;
        {
           props.icon !== undefined ? <FontAwesomeIcon icon={icon} /> : null
        }
        </CButton>
  )

}
