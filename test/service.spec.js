/* eslint-disable no-undef */
const service = require('../utils/service');

global.fetch = jest.fn();

describe('testUrl', () => {
  it('verificamos que sea funcion', () => {
    expect(typeof service.testUrl).toBe('function');
  });

  it('verificamos que devuelva 200', async () => {
    const mockResponse = { status: 200, json: jest.fn(() => 'mock data') };
    fetch.mockResolvedValue(mockResponse);

    const result = await service.testUrl('https://example.com');

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('https://example.com');
  });

  it('verificamos que devuelva error', async () => {
    const mockError = new Error('Network error');
    fetch.mockRejectedValue(mockError);

    await expect(service.testUrl('https://example.com')).rejects.toThrow(mockError);
    expect(fetch).toHaveBeenCalledWith('https://example.com');
  });
});
