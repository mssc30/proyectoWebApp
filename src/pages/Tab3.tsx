import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard, IonImg, IonPage, IonCardContent, IonCardHeader, IonCardTitle, IonIcon 
} from '@ionic/react';
import { telescope } from 'ionicons/icons';
import { Toast } from '@capacitor/toast';
import axios from 'axios';
import React from 'react';

////////////

//const API_KEY = "fb422682c3184afd97bba130cee8d153";
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
    console.log(fFinal);
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

                    <IonCardContent>{a['description']}</IonCardContent>
                    
                    <IonButton href={a['url']} size="small" expand="block" color="secondary">
                    <IonIcon slot="start" icon={telescope} /> Leer</IonButton>
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
