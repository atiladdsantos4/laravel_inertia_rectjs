import { React,useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage, CCollapse, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { SectionAbout } from './SectionAbout';
import { CardTestemunho } from '../components/CardTestemuno';
import Avatar2 from '../images/Ellipse21.png'
import Avatar3 from '../images/Ellipse3.png'
import Avatar4 from '../images/Ellipse4.png'
import Avatar5 from '../images/Ellipse5.png'
import Avatar6 from '../images/Ellipse6.png'
import Avatar7 from '../images/avatar/avatar_homem.png'
import { RateComp } from '../components/RateComp';
import { useStore } from '../store/useStore';
import axios from 'axios';
export const SectionTestimonial = (props) => {
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const { testemunhostore } = useStore();

  const {token, dados, testemunhos} = props
  const id = "section-testemonial"
  const [title, setTitulo] = useState(props.title)
  const [subtitle,setSubtitulo] = useState(props.subtitle)
  const [listacard,setListacard] = useState([])
  const [listatest,setListates] = useState(testemunhos)
  const [classe,setClasse] = useState(null)
  const [paragraph,setParagraph] = useState(null)
  const [author,setAuthor ] = useState(null)

//   useEffect(()=>{
//     setClasse(props.classe)
//     setParagraph(props.paragraph)
//     setAuthor(props.author)
//   },[])

useEffect(()=>{
    // socket.on('changeState', (newData) => {
    //   setData(newData); // Updates UI
    // });
    // socket.off('changeState');
    setClasse(props.classe)
     if( testemunhostore == 0 ){
        let string =  null
        setListates(testemunhos)
        dados.map((item,index)=>{
            switch(item.sei_nome){
                case "titulo":
                    setTitulo(item.sei_valor)
                    break
                case "sub-titulo":
                    setSubtitulo(item.sei_valor)
                    break
                case "paragraph":
                    setParagraph(item.sei_valor)
                    break
                case "cardsection":
                    string =  JSON.parse(item.sei_json)
                    console.log(string)
                    setListacard(string.meta)
                    break
            }
        })
     } else {
        axios
            .get(`${endpoint}/section/6?section_man=S`, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                let string =  null
                setListates(result.data.data.sec_testemunhos)
                result.data.data.sec_itens.map((item, index) => {
                    switch(item.sei_nome){
                        case "titulo":
                            setTitulo(item.sei_valor)
                          break
                        case "sub-titulo":
                            setSubtitulo(item.sei_valor)
                          break
                        case "paragraph":
                          setParagraph(item.sei_valor)
                          break
                    }
                })
            })
     }
   },[props,testemunhostore])


  return(
     <div class="aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
        <section id={id} className={classe}>
            {/* <span>{'testemunho:'+testemunhostore}</span> */}
            <CContainer class="ms-4 pb-5 pt-2">
                <h4>{title}</h4>
                <h1>{subtitle}</h1>
                     <CRow >
                        {
                         listatest.map((item,index)=>{
                            if(item.tes_exibir == 1){
                                return (
                                    <CCol key={index} md={3} xs="12" className="mb-3">
                                        <CardTestemunho {...item}/>
                                    </CCol>
                                )
                            }
                         })

                        }
                     </CRow>
            </CContainer>
        <CContainer class="d-flex justify-content-center align-items-center">
            <CRow>
                <CCol md={2} xs="2"></CCol>
                <CCol md={8} xs={8}>
                    <p>"{paragraph}"</p>
                    <p class="pauthor">{author}</p>
                </CCol>
                <CCol md={2} xs={2}></CCol>
            </CRow>
        </CContainer>
        {/* <CContainer class="d-flex justify-content-center align-items-center pt-5 pb-5">
        <CRow>
           <CCol md={1} xs={12}></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar2}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar3}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar4}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar5}/></CCol>
           <CCol md={2} xs={4} className="imgavatar"><img src={Avatar6}/></CCol>
           <CCol md={1} xs={12}></CCol>
        </CRow>
        <cRow>
             <CCol md={12} xs="12">
                <div className="clavatar" style={{backgroundPosition:'center',backgroundSize:'cover',backgroundImage:`url(${Avatar7})`}}></div>
             </CCol>
        </cRow>
        </CContainer> */}
        </section>
     </div>
  )
}

