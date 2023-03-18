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
const toAbsolutePath = route => path.resolve(route);
//console.log('Ruta relativa convertida',toAbsolutePath(isAbsolute('README.md')));

// Verificar si es archivo
const isFile = filePath => fs.statSync(filePath).isFile();
//console.log('¿Es archivo?',isFile("C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links"));

//verifico si es un directorio 
const isDirectory = (path) => fs.statSync(path).isDirectory();
//console.log(isDirectory('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links'))

//Buscar el archivo dentro del directorio
const searchFiles = filePath => fs.readdirSync(filePath);
//console.log(Searchfiles(isDirectory('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links')))

// Identificar si el archivo tiene extensión .md, los filtro y los retorno en un array
const mdFiles = filePath => fs.readdirSync(filePath)
    .filter (file => path.extname(file) === '.md');
//console.log('MD', mdFiles('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links'))

// Lee el contenido de un path y lo devuelve como una cadena de texto 
const readMd = fileName => fs.readFileSync(fileName, 'utf-8');
//console.log(readMd(mdFiles(prueba)))

//Crear función para extraer los links (http) de los archivos .md tener encuenta si tiene carpetas llamar funcion dentro de la función
const extractLinks = (mdContent) => {
  const regex = /\[(.+)\]\((http[s]?:\/\/.+)\)/g;
  const links = [];

  let match;
  while ((match = regex.exec(mdContent)) !== null) {
    links.push({
      text: match[1],
      href: match[2],
    });
  }

  return links;
};
//console.log(extractLinks(readMd ('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md')))

module.exports = {
  isPathValid,
  isAbsolute,
  toAbsolutePath,
  isDirectory,
  searchFiles,
  isFile,
  mdFiles,
  readMd,
  extractLinks
}