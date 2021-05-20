import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption,
IonButton, IonIcon} from '@ionic/react';
import './Tab2.css';
import { checkmarkDone } from 'ionicons/icons';
import {
  Plugins
} from '@capacitor/core';

const { Haptics } = Plugins;

const Tab2: React.FC = () => {
  const [country, setCountry] = useState<string>('mx');
  const [category, setCategory] = useState<string>('business');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color = "tertiary">
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


          <IonButton color="primary" expand="block" onClick={ () => {
            Haptics.vibrate();
            window.location.href ="Tab3#" + country+"#" + category;
          }}>
          <IonIcon slot="start" icon={checkmarkDone} />
            Buscar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default Tab2;