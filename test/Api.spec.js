const path = require('path');
const Api = require('../Api');

//---------Test de la función que Verifica si la ruta o camino especificado en "path" es válido o no.
describe('isPathValid', () => {
    const pathTrue = 'C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md';
    const pathFalse = './EexampleFile.md';
    it('Debe ser una función', () => {
        expect(typeof Api.isPathValid).toBe('function');//se utiliza la función expect de la librería de testing llamada Jest para verificar que el resultado del operador typeof aplicado es igual a "function"
    });
    it('Deberia retornar verdadero si el path existe', () => {
        expect(Api.isPathValid(pathTrue)).toBe(true);
    });
    it('Deberia retornar falso si el path no existe', () => {
        expect(Api.isPathValid(pathFalse)).toBe(false);
    });
});

//---------- Test de la función que Verifica si el path es absoluto 
describe('isAbsolute', () => {
    const pathAbsolute = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';
    const pathRelative = 'Pruebas';
    it('Debe ser una función', () => {
        expect(typeof Api.isAbsolute).toBe('function');
    });
    it('Deberia retornar verdadero si el path existe', () => {
        expect(Api.isAbsolute(pathAbsolute)).toBe(true);
    });
    it('Deberia retornar falso si el path no existe', () => {
        expect(Api.isAbsolute(pathRelative)).toBe(false);
    });
});

//---------- test de la función que verifica si la ruta es relativa antes de realizar la conversión y retorna la ruta absoluta
describe('convertToAbsolutePath', () => {
    const pathRelative = 'Pruebas';
    const pathAbsolute = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';

    it('debe ser una función', () => {
        expect(typeof Api.convertToAbsolutePath).toBe('function');
    });

    it('debería convertir una ruta relativa a una absoluta', () => {
        const rutaAbsoluta = Api.convertToAbsolutePath(pathRelative);
        expect(rutaAbsoluta).toBe(pathAbsolute);
    });

    it('debería retornar la misma ruta si ya es absoluta', () => {
        const rutaAbsoluta = Api.convertToAbsolutePath(pathAbsolute);
        expect(rutaAbsoluta).toBe(pathAbsolute);
    });
});

//----------Test de la función que Verifica si es archivo
const isFile = filePath => fs.statSync(filePath).isFile();
describe('isFile', () => {
    const pathDirectory = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';
    const pathFile = 'c:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md';
    it('Debe ser una función', () => {
        expect(typeof Api.isFile).toBe('function');
    });
    it('Deberia retornar verdadero si es archibo', () => {
        expect(Api.isFile(pathFile)).toBe(true);
    });
    it('Deberia retornar falso si es directorio', () => {
        expect(Api.isFile(pathDirectory)).toBe(false);
    });
});

//----------Test función que  verifica si es un directorio 
describe('isDirectory', () => {
    const pathDirectory = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';
    const pathFile = 'c:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md';
    it('Debe ser una función', () => {
        expect(typeof Api.isDirectory).toBe('function');
    });
    it('Deberia retornar verdadero si es directorio', () => {
        expect(Api.isDirectory(pathDirectory)).toBe(true);
    });
    it('Deberia retornar falso si es archivo', () => {
        expect(Api.isDirectory(pathFile)).toBe(false);
    });
});

//----------Test para la función que Lee el contenido de un file y lo devuelve como una cadena de texto 
describe('readMd', () => {
    const validFilePath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md';
    const invalidPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida';

    it('Debe ser una función', () => {
        expect(typeof Api.readMd).toBe('function');
    });

    it('Debería rechazar la promesa si se ingresa una ruta inválida', () => {
        return Api.readMd(invalidPath).catch(error => {
            expect(error.message).toBe("ENOENT: no such file or directory, open 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida'");
        });
    });

    it('Debería resolver la promesa con el contenido del archivo .md', () => {
        const expectedContent = "# Creando un archivo .md\n[Markdown](https://es.wikipedia.org/wiki/Markdown),\n[Nodejs](https://nodejs.org/en/docs),\n[Doesn't exist](https://developer.mozilla/)";
        return Api.readMd(validFilePath).then(content => {
            console.log(content)
            console.log(expectedContent)
            expect(content.toString()).toEqual(expectedContent);


        });

    });
});

//----------test para la función que lee el contenido del directorio y devuelve una promesa que se resuelve con un arreglo de los nombres de los archivos y subdirectorios dentro del directorio dirPath.

describe('readDir', () => {
    const validDirPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';
    const invalidDirPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida';

    it('Debe ser una función', () => {
        expect(typeof Api.readDir).toBe('function');
    });

    it('Debería rechazar la promesa si se ingresa una ruta de directorio inválida', () => {
        return Api.readDir(invalidDirPath).catch(error => {
            expect(error.message).toBe("ENOENT: no such file or directory, scandir 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida'"
            );
        });
    });

    it('devuelve una promesa que se rechaza si el directorio no existe', () => {
        const expectedContent = ["directory", "example.txt", "exampleFile.md", "README.md"];
        return Api.readDir(validDirPath).then(content => {
            expect(content).toEqual(expectedContent);


        });

    });
});

//---------Test para Función que extrae los links (http) de los archivos .md que se encuentren en directorios y subdirectorios

describe('extractLinksFileMd', () => {
    const validFilePath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md';
    const invalidFilePath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida.md';

    it('Debería ser una función', () => {
        expect(typeof Api.extractLinksFileMd).toBe('function');
    });

    it('Debería rechazar la promesa si se ingresa una ruta de archivo inválida', () => {
        return Api.extractLinksFileMd(invalidFilePath).catch(error => {
            expect(error.message).toBe("ENOENT: no such file or directory, open 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida.md'");
        });
    });

    it('Debería extraer los enlaces de un archivo .md y devolver una promesa con un arreglo de objetos con las propiedades text, href y file', () => {
        const expectedLinks = [
            {
                text: 'Markdown',
                href: 'https://es.wikipedia.org/wiki/Markdown',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md'
            },
            {
                text: 'Nodejs',
                href: 'https://nodejs.org/en/docs',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md'
            },
            {
                text: "Doesn't exist",
                href: 'https://developer.mozilla/',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md'
            }
        ]
        return Api.extractLinksFileMd(validFilePath).then(links => {
            expect(links).toEqual(expectedLinks);
        });
    });
});

//---------test de la Función para extraer los links (http) de los archivos .md que se encuentren en directorios y subdirectorios
describe('extractLinks', () => {
    const validDirPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';
    const invalidDirPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida';

    it('Debería ser una función', () => {
        expect(typeof Api.extractLinks).toBe('function');
    });
   
    it('Debería extraer todos los enlaces http de los archivos .md en un directorio y sus subdirectorios, devolviendo una promesa con un arreglo de objetos con las propiedades text, href y file', () => {
        const expectedLinks = [
            {
                text: 'Markdown',
                href: 'https://es.wikipedia.org/wiki/Markdown',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md'
            },
            {
                text: 'Nodejs',
                href: 'https://nodejs.org/en/docs',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md'
            },
            {
                text: "Doesn't exist",
                href: 'https://developer.mozilla/',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\exampleFile.md'
            },
            {
                text: 'Node.js',
                href: 'https://nodejs.org/es/',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\README.md'
            },
            {
                text: 'motor de JavaScript V8 de Chrome',
                href: 'https://developers.google.com/v8/',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\README.md'
            },
            {
                text: 'promesas',
                href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md'
            },
            {
                text: 'página web',
                href: 'https://angieli13.github.io/DEV003-data-lovers/',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md'
            },
            {
                text: 'html',
                href: 'https://es.wikipedia.org/wiki/HTML',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md'
            },
            {
                text: '404',
                href: 'https://angieli13.github.io/DEV003',
                file: 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas\\directory\\archivoDirectorio.md'
            }
        ]
        return Api.extractLinks(validDirPath).then(links => {
            expect(links).toEqual(expectedLinks);
        });
    });
});

//----------Función que valida los links encontrados

describe('validateLinks', () => {
    const validDirPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\Pruebas';
    const invalidDirPath = 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida';

    it('Debería ser una función', () => {
        expect(typeof Api.validateLinks).toBe('function');
    });

    it('Debería rechazar la promesa si se ingresa una ruta de directorio inválida', () => {
        return Api.validateLinks(invalidDirPath).catch(error => {
            expect(error.message).toBe(" ENOENT: no such file or directory, scandir 'C:\\Users\\yilib\\Documents\\ProyectosLAB\\DEV003-md-links\\ruta\\invalida'");
        });
    });

    it('Debería extraer todos los enlaces http de los archivos .md en un directorio y sus subdirectorios, devolviendo una promesa con un arreglo de objetos con las propiedades text, href y file', () => {
        const expectedLinks = [
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          },
          {
            href: undefined,
            text: undefined,
            file: undefined,
            status: 400,
            statusText: 'fail'
          }
        ]      
        return Api.validateLinks(validDirPath).then(links => {
            expect(links).toEqual(expectedLinks);
        });
    });
});