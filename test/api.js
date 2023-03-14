//módulos importados de Node.js
const fs = require('fs');
const path = require('path');
const receivedPath = require('path');



// Verifica si la ruta o camino especificado en "path" es válido o no.
const isPathValid = (path) => {
    if (fs.existsSync(path)) {
      return true;
    }else {
    return false;
  }
};

//Verificar si el path es absoluto o false ya que sería relativo
const isAbsolute = (path) => {
    return receivedPath.isAbsolute(path);
  };

 //Convertir el path en Absoluto
const toAbsolutePath = (path) => {
    return receivedPath.resolve(path);
  };
  
 // Obtener información sobre la ruta especificada
const stats = (path) => {
    return fs.statSync(path); //La función fs.statSync() devuelve un objeto fs.Stats que contiene la información
  };
  
// Verificar si es un directorio
const isDirectory = (path) => {
    return stats(path).isDirectory();
  };

 //Buscar el archivo dentro del directorio
 const files = (path) => {
    return fs.readdirSync(path);
  }
 // Identificar si el archivo tiene extensión .md
 const mdFiles = (fileName) => {
    const extname = path.extname(fileName);
    return extname === '.md';
  }

  module.exports = {
    isPathValid,
    isAbsolute,
    toAbsolutePath,
    stats,
    isDirectory,
    files,
    mdFiles
  }