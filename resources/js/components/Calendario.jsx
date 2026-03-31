import { useState,useEffect } from "react";
import { CButton } from "@coreui/react";

export const Calendario = (props) => {

  const {definehorario} = props
  const [listahora,setListahora] = useState([])
  //const [estado,setEstado] = useState(false)
  const [dia,setDia] = useState(null)
  const [hora,setHora] = useState(null)


  const availability = [
        { date: '2026-03-20', times: ['09:00', '10:30', '14:00'] },
        { date: '2026-03-21', times: ['09:00', '10:30', '14:00','15:00'] },
        { date: '2026-03-22', times: ['09:00', '10:30', '14:00','15:00'] },
        { date: '2026-03-27', times: ['08:00', '16:00'] }
  ]

  const handleActive = (event,label) =>{

    setDia(label)
    setHora(null)
    var diacal = ''
    var horacal = ''
    definehorario(diacal,horacal)
    let horario = availability.filter((item) => item.date == label );
    setListahora(horario[0].times)
  }

  const handleHora = (event,label) =>{
    setHora(label)
    definehorario(dia,label)
  }

  const ListaDatas = () =>{
     return(
        availability.map((item,index)=>{
          if(item.date === dia){
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleActive(e,item.date)}
                         size="sm"
                         color="primary"
                         className="active btdatas"
                         type="button">
                         {item.date}
                </CButton>
            )
          } else {
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleActive(e,item.date)}
                         size="sm"
                         color="primary"
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
          if(item === hora){
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleHora(e,item)}
                         size="sm"
                         color="primary"
                         className="active btdatashoras"
                         type="button">
                         {item}
                </CButton>
            )
          } else {
            return(
                <CButton id={'id'+index}
                         onClick={(e)=>handleHora(e,item)}
                         size="sm"
                         color="primary"
                         className="btdatashoras"
                         type="button">
                         {item}
                </CButton>
            )
          }
       })
     )
  }

  return(
    <>
      <ListaDatas/><br/>
      <ListaHorarios lista={listahora}/>
     </>
  )

}
