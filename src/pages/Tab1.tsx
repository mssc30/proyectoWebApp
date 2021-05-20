import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonDatetime,
  IonSelect, IonSelectOption, IonButton, IonIcon, useIonAlert } from '@ionic/react';
import { checkmarkDone} from 'ionicons/icons';
import './Tab1.css';
import {
  Plugins
} from '@capacitor/core';

const { Haptics } = Plugins;

const Tab1: React.FC = () => {
  const [text, setText] = useState<string>();
  const [oldestDate, setOldestDate] = useState<string>('');
  const [newestDate, setNewestDate] = useState<string>('');
  const [ordenar, serOrden] = useState<string>('popularity');
  const [idioma, setIdioma] = useState<string>('es');
  const [present] = useIonAlert();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color = "tertiary">
          <IonTitle>Buscar Noticias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      <div className="container">
          <IonItem>
            <IonLabel position="stacked">Palabra Clave</IonLabel>
            <IonInput value={text} onIonChange={e => setText(e.detail.value!)} ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Fecha de Inicio</IonLabel>
            <IonDatetime displayFormat="MM/DD/YYYY" min="2021-04-20" max="2021-05-30" value={oldestDate} onIonChange={e => setOldestDate(e.detail.value!)}></IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Fecha Final</IonLabel>
            <IonDatetime displayFormat="MM/DD/YYYY" min="2021-04-21" max="2021-05-31" value={newestDate} onIonChange={e => setNewestDate(e.detail.value!)}></IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel>Idioma</IonLabel>
            <IonSelect value={idioma} okText="Aceptar" cancelText="Cancelar" onIonChange={e => setIdioma(e.detail.value)}>
              <IonSelectOption value="">Todos</IonSelectOption>
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

          <IonButton color="primary" expand="block" onClick={() => {
            present({
              cssClass: 'my-css',
              header: 'Revisa los datos',
              message: 'Clave: ' + text + '. Fecha Inicio: '+oldestDate.substring(0, 10) + '. Fecha Fin: ' + newestDate.substring(0, 10),
              buttons: [
                'Cancel',
                { text: 'Ok', handler: (d) => {
                  Haptics.vibrate();
                  window.location.href ="Tab3#" + text+"#" +  oldestDate.substring(0, 10) + "#" +  newestDate.substring(0, 10) + "#"+idioma + "#" + ordenar;
                } },
              ],
              onDidDismiss: (e) => {},
            });
              //console.log("Q: " + text + " Fecha inicio: " + oldestDate.substring(0, 10) + " Fecha fin: " + newestDate.substring(0, 10) + " Idioma: " + idioma + " Orden: " + ordenar );
            }}>       
          <IonIcon slot="start" icon={checkmarkDone} />
            Buscar
          </IonButton>

          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
