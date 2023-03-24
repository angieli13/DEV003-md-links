const Api = require('./Api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = Api.convertToAbsolutePath(path);
    if (!Api.isPathValid(absolutePath)) {
      reject(new Error('La ruta especificada no es válida'));
    } else if (Api.isFile(absolutePath)) {
      const mdContent = Api.readMd(absolutePath);
      const links = Api.extractLinks(absolutePath, mdContent);
      resolve(links);
    } else if (Api.isDirectory(absolutePath)) {
     
      resolve(allLinks);
    }
  });
};

module.exports = { mdLinks };
/*mdLinks('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas').then((result) => {
  console.log(result);

})
  .catch((Error) => {
    console.log(Error)
  });*/