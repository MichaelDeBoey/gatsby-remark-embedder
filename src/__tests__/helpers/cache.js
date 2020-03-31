export const cache = {
  get: jest.fn(),
  set: jest.fn(),
};

export const mockCache = (mockedCache) =>
  cache.get.mockImplementation((urlString) => mockedCache[urlString]);
