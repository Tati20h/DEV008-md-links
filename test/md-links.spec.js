/* eslint-disable import/extensions */
/* eslint-disable no-undef */
const mdLinks = require('../index');
const validations = require('../utils/validations.js');
const files = require('../utils/files.js');

jest.mock('../utils/validations.js', () => ({
  isAbsolutePathVal: jest.fn(),
  existPathVal: jest.fn(),
}));

jest.mock('../utils/files.js', () => ({
  readFolder: jest.fn(),
  inspectFolder: jest.fn(),
}));

describe('mdLinks', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('verificamos que procese mi url de forma correcta con validate true', async () => {
    const mockURL = 'user/test/path/files';
    const mockOptions = {
      validate: true,
      stats: false,
    };
    const mockFolder = [{ name: 'test.js' }, { name: 'readme.md' }, { name: 'index.js' }];
    const mockReturnForlder = [
      {
        href: 'https://test.com',
        text: 'Test',
        file: 'user/test/path/files/readme.md',
        status: 200,
        ok: 'ok',
      }];
    validations.isAbsolutePathVal.mockReturnValue(mockURL);
    validations.existPathVal.mockReturnValue(true);
    files.readFolder.mockReturnValue(mockFolder);

    files.inspectFolder.mockReturnValue(mockReturnForlder);

    const resolve = await mdLinks(mockURL, mockOptions);
    expect(resolve[0].status).toBe(200);
  });

  it('verificamos que procese mi url de forma correcta con stats en true', async () => {
    const mockURL = 'user/test/path/files';
    const mockOptions = {
      validate: false,
      stats: true,
    };
    const mockFolder = [{ name: 'test.js' }, { name: 'readme.md' }, { name: 'index.js' }];
    const mockReturnForlder = [
      {
        href: 'https://test.com',
        text: 'Test',
        file: 'user/test/path/files/readme.md',
        status: 200,
        ok: 'ok',
      }];
    validations.isAbsolutePathVal.mockReturnValue(mockURL);
    validations.existPathVal.mockReturnValue(true);
    files.readFolder.mockReturnValue(mockFolder);

    files.inspectFolder.mockReturnValue(mockReturnForlder);

    const resolve = await mdLinks(mockURL, mockOptions);
    expect(resolve).toBe('Total: 1 Unique: 1');
  });

  it('verificamos que la url no exista', async () => {
    const mockURL = 'user/test/path/files';
    const mockOptions = {
      validate: true,
      stats: false,
    };
    validations.isAbsolutePathVal.mockReturnValue(mockURL);
    validations.existPathVal.mockReturnValue(false);

    try {
      await mdLinks(mockURL, mockOptions);
    } catch (error) {
      expect(error.message).toBe('Esta ruta no existe');
    }
  });

  it('verificamos que la url este vacia', async () => {
    const mockURL = 'user/test/path/files';
    const mockOptions = {
      validate: true,
      stats: false,
    };
    validations.isAbsolutePathVal.mockReturnValue(mockURL);
    validations.existPathVal.mockReturnValue(true);
    files.readFolder.mockReturnValue([]);

    try {
      await mdLinks(mockURL, mockOptions);
    } catch (error) {
      expect(error.message).toBe('La ruta no contiene archivos ni carpetas');
    }
  });
});
