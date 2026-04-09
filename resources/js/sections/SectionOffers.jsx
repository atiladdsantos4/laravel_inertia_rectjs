import { React, useEffect, useState, Suspense } from 'react';
import { CContainer, CRow, CCol, CImage, CPlaceholder} from '@coreui/react';
import "@fontsource/poppins";
import { CardComp } from '../components/CardComp';
import { useStore } from '../store/useStore';


export const SectionOffers = (props) => {
   const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
   const imgpath = import.meta.env.VITE_APP_ENDPOINT_IMG

   //global variable shared between
   const { offerstore } = useStore();

   const {setModal, openModal, dados, token} = props
   const id = "section-price"
   const [load, setLoad] = useState(false)
   const [title, setTitle] = useState(props.title)
   const [subtitle,setSubTitle] = useState(props.subtitle)
   const [listacard,setListacard] = useState([])
   const [classe,setClasse] = useState(props.classe)
   const [titulo, setTitulo] = useState(null)
   const [subtitulo, setSubtitulo] = useState(null)
   const [textosection, setTextosection] = useState(null)

   useEffect(()=>{
     if( offerstore == 0 ){
        let string =  null
        dados.map((item,index)=>{
            switch(item.sei_nome){
                case "titulo":
                    setTitulo(item.sei_valor)
                    break
                case "sub-titulo":
                    setSubtitulo(item.sei_valor)
                    break
                case "textosection":
                    setTextosection(item.sei_valor)
                    break
                case "cardsection":
                    string =  JSON.parse(item.sei_json)
                    console.log(string)
                    setListacard(string.meta)
                    //let img1 = imgpath + string.meta[0].path + item.sei_valor
                    //setImgabout1(img1)
                    break
            }
        })
     } else {
        axios
            .get(`${endpoint}/section/2?section_man=S`, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                let string =  null
                result.data.data.sec_itens.map((item, index) => {
                    switch(item.sei_nome){
                        case "titulo":
                            setTitulo(item.sei_valor)
                          break
                        case "sub-titulo":
                            setSubtitulo(item.sei_valor)
                          break
                        case "textosection":
                            setTextosection(item.sei_valor)
                          break
                        case "cardsection":
                            string =  JSON.parse(item.sei_json)
                            console.log(string)
                            setListacard(string.meta)
                          break
                    }
                })
            })
     }

   },[props,offerstore])


   const changeCard = (event,nome,valor,texto,detalhe,tela) =>{
      setModal(nome, valor, texto, detalhe, tela)
   }



   return(
    <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
        <section id={id} className={classe}>
            <CContainer className="ms-4">
                <h4>{titulo}</h4>
                <h1>{subtitulo}</h1>
            </CContainer>
            <CContainer className="ms-2">
            <CRow>
                <CCol md={12} xs={12} className="pb-4">
                    <p>{textosection}</p>
                </CCol>
            </CRow>
            </CContainer>
            <CContainer>
            <CRow>
                {
                  listacard.map((item,index)=>{
                     return(
                       <CCol key={index} md={3} xs={12} className="pb-4">
                            <CardComp
                                key={index}
                                price={item.preco}
                                title={item.servico}
                                subtitle={item.destaque}
                                buttonlabel={item.textobotao}
                                promocard={item.promocao}
                                openModal={openModal}
                                listaopcao={item.listaopcao}
                                setModal={ (e) => changeCard(e,item.servico,item.preco,item.destaque,item.textobotao,'offers')}
                            />
                       </CCol>
                     )
                  })
                }

                {/* <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$30"
                        title="Hauis Basic"
                        subtitle="Includes the following services:"
                        buttonlabel="Book Basic"
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis Basic','$30','Includes the following services','Book Basic','offers')}
                    />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$40"
                        title="Hauis Insider"
                        subtitle="Includes all the services for the previous tier +"
                        buttonlabel="Book Insider"
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis Insider','$40','Includes all the services for the previous tier +','Book Insider','offers')}
                        />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$70"
                        title="Hauis Influencer"
                        subtitle="Includes all the services for the 2 previous tiers +"
                        buttonlabel="Book Influencer"
                        promocard={true}
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis Influencer','$70','Includes all the services for the 2 previous tiers +','Book Influencer','offers')}
                        />
                </CCol>
                <CCol md={3} xs={12} className="pb-4">
                    <CardComp
                        price="$100"
                        title="Hauis VIP"
                        subtitle="Includes all the services for the 3 previous tiers +"
                        buttonlabel="Book VIP"
                        openModal={openModal}
                        setModal={ (e) => changeCard(e,'Hauis VIP','$100','Includes all the services for the 3 previous tiers +','Book VIP','offers')}
                        />
                </CCol> */}
            </CRow>
            </CContainer>
        </section>
    </div>
   )
}
