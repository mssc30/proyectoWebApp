import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
  IonCard, IonImg, IonPage, IonCardContent, IonCardHeader, IonCardTitle, IonIcon , IonItem, IonCardSubtitle
} from '@ionic/react';
import { reader, share, save } from 'ionicons/icons';
import axios from 'axios';
import React from 'react';
import { AbrirURL, guardarNoticia, alerta } from '../hooks/HookCapacitor';

////////////

  let url = window.location.href;
  let split_url = url.split('#');
  
  var URL = "";

  if(split_url.length==3){
    const pais = split_url[1];
    const categoria = split_url[2];
    URL = 'https://newsapi.org/v2/top-headlines?country='+pais+'&category='+categoria+'&apiKey=fb422682c3184afd97bba130cee8d153';
  }else{
    const clave = split_url[1];
    const fInicio = split_url[2];
    const fFinal = split_url[3];
    const idioma = split_url[4];
    const orden = split_url[5];
    URL = 'https://newsapi.org/v2/top-headlines?q='+clave+'&from='+fInicio+'&to='+fFinal+'&language='+idioma+'&sortBy='+orden+'&apiKey=fb422682c3184afd97bba130cee8d153';
  }

const fetchArticles = () => {
  return axios({
    url: URL,
    method: 'get'
  }).then(response => {
    return response.data;
  })
};


const Tab3: React.FC = () => {
  const [articles, setArticles] = React.useState([]);
  const items: any[] = [];

  React.useEffect(() => {
    fetchArticles().then(data => setArticles(data.articles));
  }, []);

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Resultados</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    <IonList>
        {
          articles.map(a => {
                return (
                  <IonCard>
                    <IonImg src={a['urlToImage']}></IonImg>
                    <IonCardHeader>
                      <IonCardTitle>{a['title']}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>{a['content']}</IonCardContent>
                    
                    <IonItem>

                      <IonCardSubtitle>{(a['publishedAt']+"").substring(0, 10)}</IonCardSubtitle>

                      <IonIcon icon={save} size="large" slot = "end" 
                      onClick={()=>{                       
                        const writeFile = guardarNoticia(a['title'], a['description'], a['url']);
                        writeFile();
                      }}></IonIcon>
                      
                      <IonIcon icon={reader} size="large" slot = "end" 
                      onClick={()=>{
                        const abrirUrl = AbrirURL(a['url']);
                        abrirUrl.openCapacitorSite();
                      }}></IonIcon>

                      <IonIcon slot="end" size="large" icon={share}
                      onClick={()=>{
                        const abrirUrl = AbrirURL(a['url']);
                        abrirUrl.compartir();
                      }}></IonIcon>
                    </IonItem>
                  </IonCard>
                );
            })
          }

      </IonList>
    </IonContent>
  </IonPage>
);
};

export default Tab3;
