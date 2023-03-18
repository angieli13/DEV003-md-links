const Api = require('./Api.js');

const mdLinks = (path, options) => {
  // console.log(mdLinks(path, options));
  return new Promise((resolve, reject) => {
    if (!Api.isPathValid(path) ) {
      reject(`La ruta especificada no es valida: ${path}`);
    };
    if (Api.isAbsolute(path)){
      reject(`La ruta especificada no es absoluta ${path}`);
    }
    
    resolve('Resultado')

  )}
  
}






module.exports = { mdLinks };
mdLinks('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md').then((result) => {
  console.log(result);

})
  .catch((Error) => {
    console.log(Error)
  });