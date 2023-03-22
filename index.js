const Api = require('./Api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = Api.convertToAbsolutePath(path);
    if (!Api.isPathValid(absolutePath)) {
      reject(`La ruta especificada no es válida: ${absolutePath}`);
    } else {
      resolve(links);
    }
  });
};



module.exports = { mdLinks };
mdLinks('README.md').then((result) => {
  console.log(result);

})
  .catch((Error) => {
    console.log(Error)
  });