/* eslint-disable no-undef */
const fs = require('fs');
const files = require('../utils/files');
const services = require('../utils/service');

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
}));

jest.mock('../utils/service', () => ({
  testUrl: jest.fn(),
}));

describe('readFolder', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof files.readFolder).toBe('function');
  });

  it('lee el folder de manera correcta', () => {
    const mockFiles = ['file1.txt', 'file2.txt'];
    fs.readdirSync.mockReturnValue(mockFiles);
    const res = files.readFolder('path/read/folder');

    expect(res).toBe(mockFiles);
    expect(fs.readdirSync).toHaveBeenCalledWith('path/read/folder');
  });
});

describe('inspectFolder', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof files.inspectFolder).toBe('function');
  });
});

describe('searchUrl', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof files.searchUrl).toBe('function');
  });

  it('verifica que la url sea procesada con validate true', async () => {
    const mockResponseService = { status: 200 };
    services.testUrl.mockReturnValue(mockResponseService);

    const file = '<a href="https://test.com">Test</a>';
    const route = '/path/to/file';
    const valid = true;

    const result = await files.searchUrl(file, route, valid);

    expect(result).toEqual([
      {
        href: 'https://test.com',
        text: 'Test',
        file: route,
        status: 200,
        ok: 'ok',
      },
    ]);
  });

  it('verifica que la url sea procesada con validate false', async () => {
    const file = '<a href="https://test.com">Test</a>';
    const route = '/path/to/file';
    const valid = false;

    const result = await files.searchUrl(file, route, valid);

    expect(result).toEqual([
      {
        href: 'https://test.com',
        text: 'Test',
        file: route,
      },
    ]);
  });
});
