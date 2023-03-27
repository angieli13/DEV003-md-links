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

//----------Test para la función readMd
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
        const expectedContent = [  
            {
              text: "# Creando un archivo .md"
            },
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
        return Api.readMd(validFilePath).then(content => {
            expect(content).toEqual(expectedContent);
        });
    });
});






