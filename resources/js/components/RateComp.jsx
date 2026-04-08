import { React,useEffect, useState } from 'react'
import imgStar from '../images/star.png'
import imgStarEmpty from '../images/star_empty.png'

export const RateComp = (props) => {

  const  {click} = props
  const  [image1,setimage1] = useState(imgStar)// ref to full star
  const  [image2,setimage2] = useState(imgStarEmpty)// ref to full empty star
  const  [valueRate,setvalueRate] = useState(null)// ref to full empty star

   useEffect(() => {
      let all = document.querySelectorAll('.imgrate');
      all.forEach((element) =>{
         element.addEventListener('click', clickStar);
      });
      setimage1(imgStar)
      setimage2(imgStarEmpty)
   },[])

   //Set all stars full until current id element
  const clickStar = (event) =>{
     let ele = event.target;
     if(   ele.src === image2 ){
         ele.src=image1;
     } else {
         ele.src=image2;
     }
     changeAllFalse(ele.id);
     setvalueRate(ele.id)
     if ("click" in props) {
         click(ele.id)
     }
  }

  //Fisrt changes all stars to empty and fill again until de elment defined by id param
  const changeAllFalse = (id) =>{
    //get list of images by class
    let all = document.querySelectorAll('.imgrate');

    //Empty all
    all.forEach((element) =>{
      element.src=image2;
    });
    let valor =  null;

    //Fill until param id elemet//
    all.forEach((element) =>{
      valor = element.id
      if( valor <= id){
        element.src=image1;
      }
    });
  }

   return(
   <div class="uldiv">
      <ul class="rateimg flex-list">
        <li><img id="1" className="imgrate" src={image1}/>&nbsp;</li>
        <li><img id="2" className="imgrate" src={image1}/>&nbsp;</li>
        <li><img id="3" className="imgrate" src={image1}/>&nbsp;</li>
        <li><img id="4" className="imgrate" src={image1}/>&nbsp;</li>
        <li><img id="5" className="imgrate" src={image1}/></li>
      </ul>
  </div>
   )

}
