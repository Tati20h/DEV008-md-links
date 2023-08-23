/* eslint-disable no-undef */
const files = require('../utils/files');

describe('readFolder', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof files.readFolder).toBe('function');
  });
});
describe('inspectFolder', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof files.inspectFolder).toBe('function');
  });
});
