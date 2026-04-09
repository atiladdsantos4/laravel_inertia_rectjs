import { React,useEffect, useState } from 'react'
import imgStar from '../images/star.png'
import imgStarEmpty from '../images/star_empty.png'

export const RateCompNew = (props) => {

  const {click, valorate, readonly} = props
  const [image1,setimage1] = useState(imgStar)// ref to full star
  const [image2,setimage2] = useState(imgStarEmpty)// ref to full empty star
  const [valueRate,setvalueRate] = useState(null)// ref to full empty star
  const [lista,setLista] = useState([])
  const [estado,setEstado] = useState([])

  const lista_star = [
    {
      id:1,
      image:image1
    },
    {
      id:2,
      image:image1
    },
    {
      id:3,
      image:image1
    },
    {
      id:4,
      image:image1
    },
    {
      id:5,
      image:image1
    },

  ]


   useEffect(() => {
      if ("valorate" in props) {
         lista_star.map((item,index)=>{
            if( item.id > valorate){
                item.image = image2
            }
         })
         setLista(lista_star)
      } else {
         setLista(lista_star)
      }
   },[])


  const alteraTodos = (id) => {
    if ("readonly" in props) {
        return
    }
    let listainterna = lista
    for(let i=0; i < listainterna.length; i++){
       listainterna[i].image = image2
    }
    for(let i=0; i < listainterna.length; i++){
       listainterna[i].image = image1
       if(listainterna[i].id === id){
          break
       }
    }
    if ("click" in props) {
        click(id)
    }
    setvalueRate(id)
    setLista(listainterna)
    setEstado(!estado)
  }

  const ListaImages = (props) =>{
    return(
      props.lista.map((item,index)=>{
        return(
          <li><img key={index} data-id={item.id} className="imgrate" src={item.image} onClick={(e)=>alteraTodos(item.id)}/>&nbsp;</li>
        )
      })
    )
  }

   return(
   <div class="uldiv">
      <ul class="rateimg flex-list">
         <ListaImages lista={lista} estado={estado}/>
      </ul>
  </div>
   )

}
