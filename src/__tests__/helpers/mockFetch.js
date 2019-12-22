import fetchMock from 'node-fetch';

export const mockFetch = html => {
  const mockedHtml = fetchMock.mockResolvedValue({
    json: () => Promise.resolve({ html }),
  });
  fetchMock.mockClear();
  return mockedHtml;
};
