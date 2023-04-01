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
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/en/docs',
        text: 'Nodejs',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://developer.mozilla/',
        text: "Doesn't exist",
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md',
        status: 400,
        statusText: 'fail'
      },
    ];
    return mdLinks(validFilePath).then(links => {
      expect(links).toBe(expectedLinks);
    });
  });

  it('debería resolver la promesa con los links encontrados en todos los archivos .md de un directorio', () => {
    const expectedLinks = [
      {
        href: 'https://developer.mozilla/',
        text: "Doesn't exist",
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md',
        status: 400,
        statusText: 'fail'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises',
        text: 'promesas',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/en/docs',
        text: 'Nodejs',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://angieli13.github.io/DEV003',
        text: '404',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md',
        status: 404,
        statusText: 'Not Found'
      },
      {
        href: 'https://angieli13.github.io/DEV003-data-lovers/',
        text: 'página web',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://es.wikipedia.org/wiki/HTML',
        text: 'html',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\README.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\README.md',
        status: 200,
        statusText: 'OK'
      }
    ];
    return mdLinks(validDirPath).then(links => {
      expect(links).toBe(expectedLinks);
    });
  });  
});
