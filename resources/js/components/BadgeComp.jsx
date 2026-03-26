import { React,useEffect, useState } from 'react';
import { CBadge } from '@coreui/react';

//    const props = defineProps({
//      color: { type: String, default: 'primary' }, // margin-top or others bootstrap classes
//      label: { type: String, default: "Badge" },
//      customclass: { type: String, default: "clbadge" },
//    });

export const BadgeComp = (props) => {

   const [color,setColor] = useState(props.color ?? 'primary')
   const [label,setLabel] = useState(props.color ?? 'Badge')
   const [customclass,setCustomclass] = useState(props.color ?? 'clbadge')

   useEffect(()=>{
      setLabel(props.label)
   },[props])

 return(
    <CBadge color="primary" shape="rounded-pill" className={customclass}>{label}</CBadge>
 )
}
