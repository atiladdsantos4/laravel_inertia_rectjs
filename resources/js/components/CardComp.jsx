   import { React,useEffect, useStatee } from 'react';
   import { CContainer, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react';
   import { defineProps } from 'vue';
   import imgCheck from '../images/checkbox.png'
   import ButtonPill from '@/components/ButtonPill.vue'
   import Badge from '../components/BadgeComp'
   import { ref, computed  } from 'vue';
   import { faHeart } from '@fortawesome/free-solid-svg-icons'
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

   
export const ´CardComp = (props) => {
   const [classe,setClasse]= useState(props.classe && null )
   const [price,setPrice]= useState(props.price && null )
   const [title,setTitle]= useState(props.title && null )
   const [subtitle,setSubtitle]= useState(props.subtitle && null )
   const [buttonlabel,setButtonlabel]= useState(props.buttonlabel && null )
   const [promocard,setPromocard]= useState(props.buttonlabel && false )

//    const props = defineProps({
//      class: { type: String, default: null }, // margin-top or others bootstrap classes
//      price: { type: String, default: "King Hair" },
//      title: { type: String, default: "Card title" },
//      subtitle: { type: String, default: "Card subtitle" },
//      buttonlabel:{ type: String, default: "Button" },
//      promocard:{ type: Boolean, default: false },
//    });

   // Define the event the child can emit
   const emit = defineEmits(['open','mudamsg']);

   const open = () => {
      emit('mudamsg');
      emit('open');
   };


   const buttonTitle = computed(() => {
     return props.buttonlabel; // Access using props.propName
   });

   const cardStyle = computed(() => {
     return props.promocard === true ? 'clcardpromo' : 'clcard' ; // Access using props.propName
   });

   const textcardStyle = computed(() => {
     return props.promocard === true ? 'textpromo' : 'textcard' ; // Access using props.propName
   });
  

return( 
    <div data-aos="fade-right">
        <CCard  :class="cardStyle" style="width: 19rem;">
            <Badge v-if="promocard == true" customclass="clbadge" label="MOST POPULAR"/>
        <CCardBody>
            <CCardTitle><h1 :class="textcardStyle">{{price}}</h1></CCardTitle>
            <CCardTitle><h3 :class="textcardStyle">{{title}}</h3></CCardTitle>
            <CCardSubtitle class="mb-2 text-body-secondary"><h6 :class="textcardStyle">{{subtitle}}</h6></CCardSubtitle>
            <CCardText></CCardText>
            <CCardText :class="textcardStyle"><img class="imgcheck" :src="imgCheck"/> Lorem Ipsum</CCardText>
            <CCardText :class="textcardStyle"><img class="imgcheck" :src="imgCheck"/> Lorem Ipsum</CCardText>
            <CCardText :class="textcardStyle"><img class="imgcheck" :src="imgCheck"/> Lorem Ipsum</CCardText>
            <CCardText :class="textcardStyle"><img class="imgcheck" :src="imgCheck"/> Lorem Ipsum</CCardText>
            <CCardText :class="textcardStyle"><img class="imgcheck" :src="imgCheck"/> Lorem Ipsum</CCardText>
            <CCardText></CCardText>
            <CCardText style="text-align:center;">
                <ButtonPill @click="open" v-if="promocard == false" :label="buttonlabel" class="btclass" color="secondary" icon="fa-solid fa-cart-shopping"/>
                <ButtonPill @click="open" v-else :label="buttonlabel" class="btpromo" color="secondary" icon="fa-solid fa-cart-shopping"/>
            </CCardText>
        </CCardBody>
        </CCard>
    </div>
)
}