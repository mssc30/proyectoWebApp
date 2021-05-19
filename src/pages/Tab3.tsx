import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard, IonImg, IonPage, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel
} from '@ionic/react';

import { telescope } from 'ionicons/icons';

import axios from 'axios';
import React from 'react';

////////////

//const API_KEY = "fb422682c3184afd97bba130cee8d153";
  let url = window.location.href;
  let split_url = url.split('#');
  const pais = split_url[1];
  const categoria = split_url[2];

const fetchArticles = () => {
  return axios({
    url: 'https://newsapi.org/v2/top-headlines?country='+pais+'&category='+categoria+'&apiKey=fb422682c3184afd97bba130cee8d153',
    method: 'get'
  }).then(response => {
    console.log(response);
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
