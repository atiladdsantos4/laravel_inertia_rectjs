import { useState,useEffect } from "react";
import { CButton } from "@coreui/react";

export const Calendario = (props) => {

  const {definehorario,definehoa} = props
  const [listahora,setListahora] = useState([])
  const [est,setEst] = useState(false)
  const [dia,setDia] = useState(null)
  const [idhoa,setIdhoa] = useState(null)
  const [hora,setHora] = useState(null)
  const [availability,setAvailability] = useState([])

  useEffect(()=>{
    setAvailability(props.lista)
    setListahora([])
},[props.lista])

  const availability1 = [
        { date: '2026-03-20', times: ['09:00', '10:30', '14:00'] },
        { date: '2026-03-21', times: ['09:00', '10:30', '14:00','15:00'] },
        { date: '2026-03-22', times: ['09:00', '10:30', '14:00','15:00'] },
        { date: '2026-03-27', times: ['08:00', '16:00'] }
  ]

  const handleActive = (event,label,tipo) =>{

    setDia(label)
    setHora(null)
    var diacal = ''
    var horacal = ''
    definehorario(diacal,horacal)
    let horario = availability.filter((item) => item.date == label );
    setListahora(horario[0].times)
    setEst(!est)
  }

  const handleHora = (event,label,hoa) =>{
    definehoa(hoa)
    setHora(label)
    definehorario(dia,label)
    console.log(hoa)
  }

  const ListaDatas = () =>{
     return(
        availability.map((item,index)=>{
          if(item.date === dia){
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleActive(e,item.date,1)}
                         size="sm"
                         style={{width:'68px'}}
                         color="primary"
                         className="active btdatas"
                         type="button">
                         {item.date}
                </CButton>
            )
          } else {
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleActive(e,item.date,1)}
                         size="sm"
                         color="primary"
                         style={{width:'68px'}}
                         className="btdatas"
                         type="button">
                         {item.date}
                </CButton>
            )
          }
       })
     )
  }

  const ListaHorarios = (props) =>{
     return(
        props.lista.map((item,index)=>{
          if(item.hora === hora){
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleHora(e,item.hora,item.hoa_id_hoa)}
                         size="sm"
                         color="primary"
                         className="active btdatashoras"
                         type="button">
                         {item.hora}
                </CButton>
            )
          } else {
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleHora(e,item.hora,item.hoa_id_hoa)}
                         size="sm"
                         color="primary"
                         className="btdatashoras"
                         type="button">
                         {item.hora}
                </CButton>
            )
          }
       })
     )
  }

  return(
    <>
      <ListaDatas/><br/>
      <ListaHorarios estado={est} lista={listahora}/>
     </>
  )

}
