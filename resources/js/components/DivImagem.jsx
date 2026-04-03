import React from 'react'
import slide5 from '../images/carrosel05.jpg';

export const DivImagem = (props) =>{
  return(
    <>
    {props.texto ? (
      <div style={{position:'absolute',left:'5px',top:'610px',width:'500px',fontSize:'72px',color:'white',fontWeight:'700px'}}>HAUS SALON</div>
      ) : (<></>)}
      <img src={props.imagem} class="img-fluid" loading="lazy"/>
    </>
  )
}

