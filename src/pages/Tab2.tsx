import React, { useState } from 'react';
import axios from 'axios';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption,
IonButton, IonIcon, IonList, IonRoute} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { checkmarkDone } from 'ionicons/icons';
import { crearSolicitud } from '../hooks/FormTab2';



const Tab2: React.FC = () => {
  const [country, setCountry] = useState<string>('mx');
  const [category, setCategory] = useState<string>('business');
  const evento = crearSolicitud(country, category);

    const API_KEY = "fb422682c3184afd97bba130cee8d153";
    const URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
  
    const fetchArticles = () => {
      return axios({
        url: URL,
        method: 'get'
      }).then(response => {
        
        return response.data;
      })
    };
  
    const [articles, setArticles] = React.useState([]);
    const items: any[] = [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Obtener Top Noticias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container" id="cont">
          
          <IonItem>
            <IonLabel>Pais</IonLabel>
            <IonSelect value={country} okText="Aceptar" cancelText="Cancelar" onIonChange={e => setCountry(e.detail.value)}>
              <IonSelectOption value="ar">Argentina</IonSelectOption>
              <IonSelectOption value="co">Colombia</IonSelectOption>
              <IonSelectOption value="mx">México</IonSelectOption>
              <IonSelectOption value="ru">Rusia</IonSelectOption>
              <IonSelectOption value="eu">Estados Unidos</IonSelectOption>
            </IonSelect>
          </IonItem>
          
          <IonItem>
            <IonLabel>Categoria</IonLabel>
            <IonSelect value={category} okText="Aceptar" cancelText="Cancelar" onIonChange={e => {setCategory(e.detail.value); } }>
              <IonSelectOption value="business">Negocios</IonSelectOption>
              <IonSelectOption value="entertainment">Entretenimiento</IonSelectOption>
              <IonSelectOption value="general">General</IonSelectOption>
              <IonSelectOption value="health">Salud</IonSelectOption>
              <IonSelectOption value="science">Ciencia</IonSelectOption>
              <IonSelectOption value="sports">Deportes</IonSelectOption>
              <IonSelectOption value="technology">Tecnologia</IonSelectOption>
            </IonSelect>
          </IonItem>


          <IonButton color="success" expand="full" onClick={ () => {
            window.location.href ="Tab3#" + country+"#" + category;
          }           
            /*() => {
              fetchArticles().then(data => setArticles(data.articles));
              //console.log(articles);

              return(
                <IonList>
                  {
                    articles.map(a => {
                        <IonItem>
                          {a['title']}
                          <IonButton href={a['url']} color="primary" slot="end">Read</IonButton>
                        </IonItem>
                        console.log(a);
                    })
                  }
                </IonList>
              );
              
          }*/}>

          <IonIcon slot="start" icon={checkmarkDone} />
            Buscar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default Tab2;