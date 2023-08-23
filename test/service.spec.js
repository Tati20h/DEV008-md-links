/* eslint-disable no-undef */
const service = require('../utils/service');

describe('testUrl', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof service.testUrl).toBe('function');
  });
});
