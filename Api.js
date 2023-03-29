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

//---------Lee el contenido de un file y lo devuelve como una cadena de texto 
const readMd = (pathMd) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathMd, 'utf-8', (err, data) => {
      if (err) {//Si la variable "err" es distinto de cero, se asume que ha ocurrido un error. 
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


//----------leer el contenido del directorio y devuelve una promesa que se resuelve con un arreglo de los nombres de los archivos y subdirectorios dentro del directorio dirPath.
const readDir = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, 'utf-8', (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};


//----------Función para extraer links de un archivo .md
const extractLinksFileMd = (filePath) => {
  const links = []; // Arreglo vacío que almacenará los enlaces encontrados.
  //Leer el contenido del archivo
  return readMd(filePath)
    .then(mdContent => {//defino la función que se ejecutará cuando se resuelva la promesa devuelta por "readMd(filePath)"
      const regExp = /\[(.+)\]\((http[s]?:\/\/.+)\)/g; // Expresión regular para buscar patrones de enlaces
      let match; // Almacena el resultado de cada búsqueda de coincidencias.
      while ((match = regExp.exec(mdContent)) !== null) {//itera sobre el resultado de la búsqueda, devolviendo un objeto "match" con información sobre cada coincidencia encontrada.
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
  //Arreglo de promesas que se resuelven cuando se leen todos los archivos .md en el directorio y sus subdirectorios. 
  const readAllMdFiles = getMdFiles.map(filePath => readMd(filePath));
  //Método para tomar el anterior arreglo de promesas y devolver una nueva promesa que se resuelve cuando todas las promesas en el arreglo se han resuelto.
  return Promise.all(readAllMdFiles)
    .then(mdContents => {
      for (let i = 0; i < mdContents.length; i++) {
        const mdContent = mdContents[i];
        const regExp = /\[(.+)\]\((http[s]?:\/\/.+)\)/g; // Expresión regular para buscar patrones de enlaces
        let match; // Almacena el resultado de cada búsqueda de coincidencias.
        while ((match = regExp.exec(mdContent)) !== null) {//itera sobre el resultado de la búsqueda, devolviendo un objeto "match" con información sobre cada coincidencia encontrada.
          // Agrega un nuevo objeto al arreglo links, que contiene dos propiedades text y href.
          links.push({
            text: match[1], // contiene el texto del enlace
            href: match[2], // contiene la URL del enlace
            file: convertToAbsolutePath(getMdFiles[i]), // Obtener la ruta absoluta del archivo
          });
        }
      }
      // Obtener todas las subcarpetas del directorio
      return readDir(dirPath)
        .then(subDirs => {
          // Filtrar solo las subcarpetas del directorio
          const subDirPromises = subDirs.filter((name) => fs.statSync(path.join(dirPath, name)).isDirectory())
            .map((subDir) => {
              const subDirPath = path.join(dirPath, subDir);
              return extractLinks(subDirPath); // Llama recursivamente a la función extractLinks y devuelve una promesa
            });
      return Promise.all(subDirPromises)
        .then((subDirLinks) => {
          // Agrega los links encontrados en las subcarpetas al arreglo links
          for (let i = 0; i < subDirLinks.length; i++) {
            const linksInSubDir = subDirLinks[i];
            links.push(...linksInSubDir);//Agrega todos los elementos del arreglo linksInSubDir al final del arreglo links
          }
          return links;
        });
    });
  });
};

extractLinks('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas').then((result) => {
  console.log(result);
})
  .catch((Error) => {
    console.log(Error)
  });

  const validateLinks = (links) => {
    //console.log(links)
    return new Promise((resolve) => {
      let validatedLinks = [];
     // console.log('soy validateLinks')
      for (let i = 0; i < links.length; i++) {
        fetch(links[i].href)
          .then(res => {
            validatedLinks.push({
              href: links[i].href,
              text: links[i].text,
              file: links[i].file,
              status: res.status,
              statusText: res.statusText,
            });
            if (validatedLinks.length === links.length) {
             // console.log(validateLinks)
              resolve(validatedLinks);
            }
          })
          .catch(error => {
            validatedLinks.push({
              href: links[i].href,
              text: links[i].text,
              file: links[i].file,
              status: error.status || 400,
              statusText: "fail",
            });
            if (validatedLinks.length === links.length) {
              resolve(validatedLinks);
            }
          });
      }
    });
  };
  
  /*extractLinks('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas')
  .then(links => validateLinks(links))
  .then(validatedLinks => console.log(validatedLinks))
  .catch(error => console.log(error));*/

  
  /*validateLinks(extractLinks('C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas')).then((result) => {
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
  readDir,
  extractLinks,
  validateLinks
}