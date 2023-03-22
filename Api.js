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
const getFilesMd = path => fs.readdirSync(path);
//console.log(Searchfiles(isDirectory('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links')))

// Identificar si el archivo tiene extensión .md, los filtro y los retorno en un array
const mdFiles = path => fs.readdirSync(path)
    .filter (file => path.extname(file) === '.md');
//console.log('MD', mdFiles('prueba'))

// Lee el contenido de un path y lo devuelve como una cadena de texto 
const readMd = pathMd => fs.readFileSync(pathMd, 'utf-8');
//console.log(readMd(mdFiles(prueba)))

//Crear función para extraer los links (http) de los archivos .md tener encuenta si tiene carpetas llamar funcion dentro de la función
const extractLinks = (path) => {//Toma como parámetro una cadena de texto en formato Markdown.
  const regEx = /\[(.+)\]\((http[s]?:\/\/.+)\)/g;//Expresión regular para buscar patrones que corresponden a la sintaxis de un enlace en Markdown,(.+) corresponde al texto del enlace y otro grupo de captura que corresponde a la dirección URL del enlace.
  const links = []; //Arreglo vacío que almacenará los enlaces encontrados.
  const mdContent = readMd(path);
  let match;//Almacena el resultado de cada búsqueda de coincidencias.
  while ((match = regEx.exec(mdContent)) !== null) {//Devuelve un arreglo que contiene información sobre la primera coincidencia encontrada en la cadena de texto. Si no se encuentra ninguna coincidencia, el método devuelve null.
    links.push({//Dentro del ciclo while, se agrega un nuevo objeto al arreglo links, que contiene dos propiedades text y href.
      text: match[1], //contiene el texto del enlace
      href: match[2],//contiene la URL del enlace
      file: toAbsolutePath(path),
    });
  }

  return links;
};
//console.log(extractLinks('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md'))

module.exports = {
  isPathValid,
  isAbsolute,
  toAbsolutePath,
  convertToAbsolutePath,
  isDirectory,
  getFilesMd,
  isFile,
  mdFiles,
  readMd,
  extractLinks
}