const { mdLinks } = require('../index.js');

describe('mdLinks', () => {
  const validFilePath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md';
  const validDirPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';
  const invalidPath = 'ruta/invalida';

  it('Debe ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debería rechazar la promesa si se ingresa una ruta inválida', () => {
    return mdLinks(invalidPath).catch(error => {
      expect(error.message).toBe('La ruta ingresada no es válida');
    });
  });

  it('Debería rechazar la promesa si se ingresa una ruta de archivo que no es .md', () => {
    const invalidFilePath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\example.txt';
    return mdLinks(invalidFilePath).catch(error => {
      expect(error.message).toBe('No es un archivo .md');
    });
  });

  it('Debería resolver la promesa con los links encontrados en un archivo .md', () => {
    const expectedLinks = [
      {
        text: "Markdown",
        href: "https://es.wikipedia.org/wiki/Markdown",
        file: validFilePath
      },
      {
        text: "Nodejs",
        href: "https://nodejs.org/en/docs",
        file: validFilePath,
      },
      {
        text: "Doesn't exist",
        href: "https://developer.mozilla/",
        file: validFilePath
      },

    ];
    return mdLinks(validFilePath).then(links => {
      expect(links).toEqual(expectedLinks);
    });
  });

  it('debería resolver la promesa con los links encontrados en todos los archivos .md de un directorio', () => {
    const expectedLinks = [
      {
        text: "Markdown",
        href: "https://es.wikipedia.org/wiki/Markdown",
        file: validFilePath
      },
      {
        text: "Nodejs",
        href: "https://nodejs.org/en/docs",
        file: validFilePath,
      },
      {
        text: "Doesn't exist",
        href: "https://developer.mozilla/",
        file: validFilePath
      },
      {
        text: "Node.js",
        href: "https://nodejs.org/es/",
        file: "C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\README.md",
      },
      {
        text: "motor de JavaScript V8 de Chrome",
        href: "https://developers.google.com/v8/",
        file: "C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\README.md"
      },
      {
        text: "promesas",
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises",
        file: "C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md"
      },
      {
        text: "página web",
        href: "https://angieli13.github.io/DEV003-data-lovers/",
        file: "C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md"
      },
      {
        text: "html",
        href: "https://es.wikipedia.org/wiki/HTML",
        file: "C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md"
      },
      {
        text: "404",
        href: "https://angieli13.github.io/DEV003",
        file: "C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md"
      },
    ];
    return mdLinks(validDirPath).then(links => {
      expect(links).toEqual(expectedLinks);
    });
  });

  
});
