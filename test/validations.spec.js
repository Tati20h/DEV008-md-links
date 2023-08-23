/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const validations = require('../utils/validations');

describe('isAbsolutePathVal', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof validations.isAbsolutePathVal).toBe('function');
  });

  it('retorna ruta normal en caso de ser absoluta', () => {
    const absolutePath = '/absolute/file.txt';
    expect(validations.isAbsolutePathVal(absolutePath)).toBe(absolutePath);
  });

  it('retorna ruta completa en caso de ser relativa', () => {
    const relativePath = '/relative/file.txt';
    const resolvedPath = path.resolve(relativePath);
    expect(validations.isAbsolutePathVal(relativePath)).toBe(resolvedPath);
  });
});

describe('existPathVal', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof validations.existPathVal).toBe('function');
  });

  it('retorna false por ruta inexistente', () => {
    const pathExist = '../exist/file.txt';
    const existPath = fs.existsSync(pathExist);
    expect(validations.existPathVal(pathExist)).toBe(existPath);
  });
});

describe('readMdVal', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof validations.readMdVal).toBe('function');
  });

  it('retorna true si es archivo .md', () => {
    const pathMd = '../md/file.md';
    expect(validations.readMdVal(pathMd)).toBe(true);
  });

  it('retorna false si no es archivo .md', () => {
    const pathMd = '../nomd/file.txt';
    expect(validations.readMdVal(pathMd)).toBe(false);
  });
});
