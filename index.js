const Api = require('./Api.js');

const mdLinks = (path, options) => {
  // console.log(mdLinks(path, options));
    return new Promise((resolve, reject)=>{
        // Verifica si la ruta o camino especificado en "path" es válido o no. 
      if (Api.isPathValid(path)) {
            const checkPath = {
            pathIsAbsolute: Api.isAbsolute(path),
            resolvePathToAbsolute: Api.toAbsolutePath(path),
            informationPath: Api.stats(path),
            pathIsDirectory: Api.isDirectory(path),
            pathIsFile: Api.isFile(path),
            extensionMdFiles:
          }


            Promise.all(promises)
            .then(links => resolve(links.flat())) //Finalmente se resuelve la promesa con el arreglo de links concatenados usando flat()).
            .catch(reject);
        } else if (stats.isFile()) {
          // Identificar si el archivo tiene extensión .md
          if (path.extname(path) === '.md') {
            readLinks(path, options)//si tiene extensión .md se ejecuta readLinks en caso afirmativo.
              .then(links => resolve(links))
              .catch(reject);
          } else {
            resolve([]);//Si no tiene extensión .md, se resuelve la promesa vacía [].
          }
        } else {
          reject(new Error(`La ruta especificada no es un archivo ni un directorio: ${path}`)); //${} es una forma de interpolación de cadenas de texto en JavaScript que permite combinar cadenas de texto con expresiones evaluadas dentro de llaves
        } else {
        reject(new Error(`La ruta especificada no es válida: ${path}`));
      } else {
      reject(new Error('Debe especificar una ruta para buscar los links'));
    }
  });
};

module.exports = { mdLinks };