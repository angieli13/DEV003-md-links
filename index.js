const Api = require('./Api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!Api.isPathValid(path)) {
      reject(new Error('La ruta ingresada no es válida'));
    }
    const absolutePath = Api.convertToAbsolutePath(path);
    if (Api.isFile(absolutePath)) {
      if (!Api.identificaFileMd(absolutePath)) {
        reject(new Error('No es un archivo .md'));
      }
      const linksMdFile = Api.extractLinksFileMd(absolutePath);
      resolve(linksMdFile);
    } else if (Api.isDirectory(absolutePath)) {
      const linksMdFiles = Api.extractLinks(absolutePath);
      resolve(linksMdFiles);
    } else {
      reject(new Error('La ruta ingresada no es un archivo .md ni un directorio'));
    }
  });
};


module.exports = { mdLinks };
mdLinks('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas').then((result) => {
  console.log(result);

})
  .catch((Error) => {
    console.log(Error)
  });