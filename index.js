const Api = require('./Api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!Api.isPathValid(path)) {
      reject(new Error('La ruta ingresada no es válida'));
    }
    const absolutePath = Api.convertToAbsolutePath(path);
    let result
    if (Api.isFile(absolutePath)) {
      if (!Api.identificaFileMd(absolutePath)) {
        reject(new Error('No es un archivo .md'));
      }
      const linksMdFile = Api.extractLinksFileMd(absolutePath);
      result = linksMdFile;
    } else if (Api.isDirectory(absolutePath)) {
      const linksMdFiles = Api.extractLinks(absolutePath);
      result = linksMdFiles;//se convierte en promesa
    } else {
      reject(new Error('La ruta ingresada no es un archivo .md ni un directorio'));
    }
    if (!options.validate){
      resolve(result)
    }
  result.then((res) =>{
    Api.validateLinks(res).then((res1) =>{//res resultado de la promesa
     // console.log('res', res)
      resolve(res1)
    }) 
  })
  
   
  });
};


module.exports = { mdLinks};
/*mdLinks('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas', {validate:true}).then((result) => {
  console.log('mdLinks', result);

})
  .catch((Error) => {
    console.log(Error)
  });*/