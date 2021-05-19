import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonDatetime,
  IonSelect, IonSelectOption, IonButton, IonIcon} from '@ionic/react';
import { checkmarkDone } from 'ionicons/icons';

import './Tab1.css';


const Tab1: React.FC = () => {

  const [text, setText] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>('2021-05-17');
  const [ordenar, serOrden] = useState<string>('popularity');
  const [idioma, setIdioma] = useState<string>('es');


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar Noticias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      <div className="container">
          <IonItem>
            <IonLabel position="floating">Palabra Clave</IonLabel>
            <IonInput value={text}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Fecha de Inicio</IonLabel>
            <IonDatetime displayFormat="MM/DD/YYYY" min="2015-01-11" max="2021-05-31" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel>Idioma</IonLabel>
            <IonSelect value={idioma} okText="Aceptar" cancelText="Cancelar" onIonChange={e => setIdioma(e.detail.value)}>
              <IonSelectOption value="en">Inglés</IonSelectOption>
              <IonSelectOption value="es">Español</IonSelectOption>
              <IonSelectOption value="fr">Francés</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Orden</IonLabel>
            <IonSelect value={ordenar} okText="Aceptar" cancelText="Cancelar" onIonChange={e => serOrden(e.detail.value)}>
              <IonSelectOption value="relevancy">Relevancia</IonSelectOption>
              <IonSelectOption value="popularity">Popularidad</IonSelectOption>
              <IonSelectOption value="publishedAt">Publicacion</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonButton color="success" expand="full">
            <IonIcon slot="start" icon={checkmarkDone} />
            Buscar
          </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
