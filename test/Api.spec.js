const path = require('path');
const Api = require('../Api');

//Test función que Verifica si la ruta o camino especificado en "path" es válido o no.
describe('isPathValid', () => {
    const pathTrue = 'C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md';
    const pathFalse = './thisPath/doesNotExist';
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
