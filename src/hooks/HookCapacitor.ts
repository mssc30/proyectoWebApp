import {Plugins, FilesystemDirectory, Browser, FilesystemEncoding, ActionSheetOptions} from '@capacitor/core';
  
const { Haptics } = Plugins;
const { Toast } = Plugins;
const { Share } = Plugins;
const { Filesystem } = Plugins;
const { Modals } = Plugins;

export function alerta(){
  const showConfirm = async () => {
    let confirmRet = await Modals.confirm({
      title: 'Confirmacion',
      message: '¿Quieres guardar este archivo?'
    });
    //console.log('Confirm ret', confirmRet); TRUE OR FALSE
  }

  return showConfirm;
}

export function AbrirURL(url:string){
  const openCapacitorSite = async () => {

    let confirmRet = await Modals.confirm({
      title: 'Confirmacion',
      message: '¿Abrir noticia?'
    });
      //console.log('Confirm ret', confirmRet); TRUE OR FALSE
    if(confirmRet.value == true){
      await Browser.open({ url: url });
        Haptics.vibrate();
    }    
  };

  const compartir = async() => {
    await Share.share({
      title: 'Mira esta noticia.',
      text: 'Tienes que conocer sobre esto.',
      url: url,
      dialogTitle: 'Compartir',
    });

    Haptics.vibrate();

  }

  return{ openCapacitorSite, compartir};
}

export function guardarNoticia(titulo:string, cuerpo:string, url:string){
  
  const writeFile = async () => {

    let confirmRet = await Modals.confirm({
      title: 'Confirmacion',
      message: '¿Guardar noticia?'
    });
      //console.log('Confirm ret', confirmRet); TRUE OR FALSE
    if(confirmRet.value == true){
      try {
        const result = await Filesystem.writeFile({
          path: titulo+'.txt',
          data: cuerpo + ". Fuente: " + url,
          directory: FilesystemDirectory.External,
          encoding: FilesystemEncoding.UTF8
        })

        await Toast.show({
          text: 'Noticia guardada'
        });

      } catch(e) {
        await Toast.show({
          text: 'No se pudo guardar el archivo ' + e
        });
      }

      Haptics.vibrate();
    }
  };

  return writeFile;
}