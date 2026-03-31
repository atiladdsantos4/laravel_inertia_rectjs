import { useState } from "react";
import { ButtonOutlineComp } from "./ButtonOutlineComp";

export const Calendario = (props) => {

  const [listahora,setListahora] = useState([])
  const [estado,setEstado] = useState(false)
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
    let horario = availability.filter((item) => item.date == label );
    console.log('ok')
    console.log(label)
    console.log(horario[0].times)
    setListahora(horario[0].times)
    console.log('ok')
  }

  const handleHora = (event,label) =>{
    setHora(label)
    // let horario = availability.filter((item) => item.date == label );
    // console.log('ok')
    // console.log(label)
    // console.log(horario[0].times)
    // setListahora(horario[0].times)
  }
  /*
  filter(
      (item) => (item.fer_dia == dia) & (item.fer_mes == mes) & (item.fer_ano == ano),
    )
  */

  const ListaDatas = () =>{
     return(
       availability.map((item,index)=>{
          if(item.date === dia){
            return(
                <ButtonOutlineComp id={'id'+index} clickdia={(e)=>handleActive(e,item.date)}  size="sm" color="primary" classe="active btdatas" type="button" label={item.date}/>
            )
          } else {
            return(
                <ButtonOutlineComp id={'id'+index} clickdia={(e)=>handleHora(e,item.date)}  size="sm" color="primary" classe="btdatas" type="button" label={item.date}/>
            )
          }
       })
     )
  }

  const ListaHorarios = (props) =>{
     return(
       props.lista.map((item,index)=>{
          return(
            <ButtonOutlineComp id={'idh'+index} clickhora={(e)=>handleHora(e,item.times)}  size="sm" color="primary" classe="btdatashoras" type="button" label={item}/>
           )
       })
     )
  }


  return(
    <>
      <ListaDatas/><br/>
      <ListaHorarios lista={listahora} est={estado}/>
     </>
  )

}
