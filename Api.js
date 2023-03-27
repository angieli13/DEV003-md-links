//módulos importados de Node.js
const fs = require('fs');
const path = require('path');
const prueba = 'C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md'

//---------- Verifica si la ruta o camino especificado en "path" es válido o no.
const isPathValid = path => fs.existsSync(path)
//console.log('¿Es valido?',isPathValid(prueba));

//---------- Verificar si el path es absoluto o false si es relativo
const isAbsolute = route => path.isAbsolute(route);
//console.log('¿Es absoluto?',isAbsolute('README.md'));

//---------- verifica si la ruta es relativa antes de realizar la conversión y retorna la ruta absoluta
const convertToAbsolutePath = (route) => {
  if (!path.isAbsolute(route)) {//para asegurar que el método path.resolve() solo se utilice para convertir rutas relativas a rutas absolutas.
    route = path.resolve(route);//Resuelve una secuencia de segmentos de ruta en una ruta absoluta.
  }
  return route;
};
//console.log(convertToAbsolutePath('README.md')); 

//----------Verificar si es archivo
const isFile = filePath => fs.statSync(filePath).isFile();
//console.log('¿Es archivo?',isFile("C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links"));

//---------verifico si es un directorio 
const isDirectory = path => fs.statSync(path).isDirectory();
//console.log(isDirectory('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links'))

//---------Identifica si es un archivo .md
const identificaFileMd = pathFile => path.extname(pathFile) === '.md';

//---------Identificar los archivos con extensión .md, los filtro y los retorno en un array
const mdFiles = route => fs.readdirSync(route)//lee el contenido del path y devuelve un array con los nombres de todos los archivos y subdirectorios.
  .filter(file => path.extname(file) === '.md');//crear un nuevo array solo con nombres de los archivos.md, extname para obtener la extensión.
//console.log('MD', mdFiles('prueba'))

//---------Lee el contenido de un path y lo devuelve como una cadena de texto 
const readMd = (pathMd) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathMd, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
//console.log(readMd(prueba))

//----------Función para extraer links de un archivo .md
const extractLinksFileMd = (filePath) => {
  const links = []; // Arreglo vacío que almacenará los enlaces encontrados.
  //Leer el contenido del archivo
  return readMd(filePath)
    .then(mdContent => {
      const regEx = /\[(.+)\]\((http[s]?:\/\/.+)\)/g; // Expresión regular para buscar patrones de enlaces
      let match; // Almacena el resultado de cada búsqueda de coincidencias.
      while ((match = regEx.exec(mdContent)) !== null) {
        // Agrega un nuevo objeto al arreglo links, que contiene dos propiedades text y href.
        links.push({
          text: match[1], // contiene el texto del enlace
          href: match[2], // contiene la URL del enlace
          file: filePath, // Obtener la ruta absoluta del archivo
        });
      }
      return links;
    });
}
/*extractLinksFileMd('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md').then((result) => {
  console.log(result);
})
  .catch((Error) => {
    console.log(Error)
  });*/

//---------Función para extraer los links (http) de los archivos .md que se encuentren en directorios y subdirectorios
const extractLinks = (dirPath) => {
  const links = []; // Arreglo vacío que almacenará los enlaces encontrados.
  // Obtener todos los archivos .md del directorio y subdirectorios
  const getMdFiles = mdFiles(dirPath).map((file) => path.join(dirPath, file));
  //Leer el contenido de todos los archivos .md
  const readAllMdFiles = getMdFiles.map(filePath => readMd(filePath));
  return Promise.all(readAllMdFiles)
    .then(mdContents => {
      for (let i = 0; i < mdContents.length; i++) {
        const mdContent = mdContents[i];
        const regEx = /\[(.+)\]\((http[s]?:\/\/.+)\)/g; // Expresión regular para buscar patrones de enlaces
        let match; // Almacena el resultado de cada búsqueda de coincidencias.
        while ((match = regEx.exec(mdContent)) !== null) {
          // Agrega un nuevo objeto al arreglo links, que contiene dos propiedades text y href.
          links.push({
            text: match[1], // contiene el texto del enlace
            href: match[2], // contiene la URL del enlace
            file: convertToAbsolutePath(getMdFiles[i]), // Obtener la ruta absoluta del archivo
          });
        }
      }
      // Obtener todas las subcarpetas del directorio
      const subDirs = fs
        .readdirSync(dirPath)
        .filter((name) => fs.statSync(path.join(dirPath, name)).isDirectory());
      // Recorre todas las subcarpetas y llama recursivamente a la función extractLinks
      const subDirPromises = subDirs.map((subDir) => {
        const subDirPath = path.join(dirPath, subDir);
        return extractLinks(subDirPath); // Llama recursivamente a la función extractLinks y devuelve una promesa
      });
      return Promise.all(subDirPromises)
        .then((subDirLinks) => {
          // Agrega los links encontrados en las subcarpetas al arreglo links
          for (let i = 0; i < subDirLinks.length; i++) {
            const linksInSubDir = subDirLinks[i];
            links.push(...linksInSubDir);
          }
          return links;
        });
    });
}
/*extractLinks('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas').then((result) => {
  console.log(result);
})
  .catch((Error) => {
    console.log(Error)
  });*/

module.exports = {
  isPathValid,
  isAbsolute,
  convertToAbsolutePath,
  isDirectory,
  isFile,
  identificaFileMd,
  extractLinksFileMd,
  mdFiles,
  readMd,
  extractLinks
}