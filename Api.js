//módulos importados de Node.js
const fs = require('fs');
const path = require('path');
const prueba = 'C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md'

// Verifica si la ruta o camino especificado en "path" es válido o no.
const isPathValid = path => fs.existsSync(path)
//console.log('¿Es valido?',isPathValid(prueba));

//Verificar si el path es absoluto o false si es relativo
const isAbsolute = route => path.isAbsolute(route);
//console.log('¿Es absoluto?',isAbsolute('README.md'));

//Convertir el path en Absoluto 
const toAbsolutePath = absolutePath => path.resolve(absolutePath);
//console.log('Ruta relativa convertida',toAbsolutePath('README.md'));

//verifica si la ruta es relativa antes de realizar la conversión y retorna la ruta absoluta
const convertToAbsolutePath = (route) => {
  if (!path.isAbsolute(route)) {
    route = path.resolve(route);
  }
  return route;
};
//console.log(convertToAbsolutePath('README.md')); 


// Verificar si es archivo
const isFile = filePath => fs.statSync(filePath).isFile();
//console.log('¿Es archivo?',isFile("C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links"));

//verifico si es un directorio 
const isDirectory = path => fs.statSync(path).isDirectory();
//console.log(isDirectory('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links'))

//Buscar el archivo dentro del directorio
const getMdFiles = path => fs.readdirSync(path);
//console.log(Searchfiles(isDirectory('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links')))

// Identificar los archivos con extensión .md, los filtro y los retorno en un array
const mdFiles = path => fs.readdirSync(path)
    .filter (file => path.extname(file) === '.md');
//console.log('MD', mdFiles('prueba'))

// Lee el contenido de un path y lo devuelve como una cadena de texto 
const readMd = pathMd => fs.readFileSync(pathMd, 'utf-8');
//console.log(readMd(mdFiles(prueba)))


//Función para extraer los links (http) de los archivos .md que se encuentren en directorios y subdirectorios
const extractLinks = (path) => {
  const links = [];//Arreglo vacío que almacenará los enlaces encontrados.
  const files = mdFiles(path); // Obtener todos los archivos .md del directorio y subdirectorios
  for (let i = 0; i < files.length; i++) {
    const file = files[i]; 
    const filePath = path.join(path, file); //join une la ruta del directorio con el nombre del archivo en cada iteración del ciclo for.
    const mdContent = readMd(filePath); // Leer el contenido del archivo
    const regEx = /\[(.+)\]\((http[s]?:\/\/.+)\)/g; // Expresión regular para buscar patrones de enlaces
    let match;//Almacena el resultado de cada búsqueda de coincidencias.
    while ((match = regEx.exec(mdContent)) !== null) {//Devuelve un arreglo que contiene información sobre la primera coincidencia encontrada en la cadena de texto. Si no se encuentra ninguna coincidencia, el método devuelve null.
      links.push({//Dentro del ciclo while, se agrega un nuevo objeto al arreglo links, que contiene dos propiedades text y href.
        text: match[1],//contiene el texto del enlace
        href: match[2],//contiene la URL del enlace
        file: convertToAbsolutePath(filePath), // Obtener la ruta absoluta del archivo
      });
    }
  }
  return links;
}
//console.log(extractLinks('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md'))


module.exports = {
  isPathValid,
  isAbsolute,
  toAbsolutePath,
  convertToAbsolutePath,
  isDirectory,
  getFilesMd,
  getMdFiles,
  isFile,
  mdFiles,
  readMd,
  extractLinks
}