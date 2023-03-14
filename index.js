const fs = require('fs');
const path = require('path');

const mdLinks = (path, options) => {
  // console.log(mdLinks(path, options));
    return new Promise((resolve, reject)=>{
    if (path) {
      // Verifica si la ruta o camino especificado en "path" es válido o no. 
      if (Api.isPathValid(path)) {
        // Verifica si la ruta es absoluta y si no, convertirla en absoluta
        if (!path.isAbsolute(path)) {
          path = path.resolve(path);
        }
        // Obtener información sobre la ruta especificada
        const stats = Api.pathFileStat(path);
        // console.log(stats(path));
        // Verificar si es un directorio o archivo
        if (stats.isDirectory()) {
          // Buscar el archivo dentro del directorio
          const files = Api.pathReadDir(path);  //pathReadDir se usa para leer los archivos dentro del directorio 
          const mdFiles = files.filter(file => path.extname(file) === '.md'); //se filtran aquellos que tienen extensión .md, "extname" se utiliza para obtener la extensión del archivo 
          const promises = mdFiles.map(file => { //.map se utiliza para transformar los elementos de un array mediante la aplicación de una función a cada elemento del mismo.
            return readLinks(file, options);
          });
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
        }
      } else {
        reject(new Error(`La ruta especificada no es válida: ${path}`));
      }
    } else {
      reject(new Error('Debe especificar una ruta para buscar los links'));
    }
  });
};

module.exports = { mdLinks };