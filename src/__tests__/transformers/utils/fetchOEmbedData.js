import fetch from 'node-fetch';

import { fetchOEmbedData } from '../../../transformers/utils';

const { Response } = jest.requireActual('node-fetch');
jest.mock(`node-fetch`);
// make timeouts quicker
global.setTimeout = jest.fn((cb) => setImmediate(cb));

describe(`fetchOEmbedData`, () => {
  const URL = 'https://google.com';
  const MockedResponseResult = { data: '12345' };

  beforeEach(() => {
    fetch.mockReset();
    setTimeout.mockClear();
  });

  test(`returns promise resolving to object`, () => {
    // make sure we make our result assertion
    expect.assertions(4);

    fetch.mockResolvedValue(new Response(JSON.stringify(MockedResponseResult)));

    return fetchOEmbedData(URL).then((res) => {
      // assert some internal logic (that fetch was actually called)
      expect(fetch).toBeCalledTimes(1);
      expect(fetch).nthCalledWith(1, URL, expect.anything());

      // we didn't hit retry mechanism
      expect(setTimeout).not.toBeCalled();
      // assert actual result
      expect(res).toEqual(MockedResponseResult);
    });
  });

  test(`throws on non-ok status`, () => {
    // make sure we make our result assertion
    expect.assertions(1);

    fetch.mockResolvedValue(
      new Response(JSON.stringify(MockedResponseResult), {
        // non-ok status is one outside of 200-299 range
        // ( https://developer.mozilla.org/en-US/docs/Web/API/Response/ok )
        status: 403,
      })
    );

    return fetchOEmbedData(URL).catch((err) => {
      expect(err).toMatchInlineSnapshot(
        `[Error: Request to https://google.com returned non-OK status (403)]`
      );
    });
  });

  describe(`network resilience`, () => {
    test(`retries requests if there was network error`, () => {
      // make sure we make our result assertion
      expect.assertions(8);

      // make first two calls throw an error and third call resolve
      const socketError = new Error('socket hang up');
      fetch
        .mockRejectedValueOnce(socketError)
        .mockRejectedValueOnce(socketError)
        .mockResolvedValueOnce(
          new Response(JSON.stringify(MockedResponseResult))
        );

      return fetchOEmbedData(URL).then(async (res) => {
        // assert some internal logic (that fetch was actually called 3 times)
        expect(fetch).toBeCalledTimes(3);
        expect(fetch).nthCalledWith(1, URL, expect.anything());
        expect(fetch).nthCalledWith(2, URL, expect.anything());
        expect(fetch).nthCalledWith(3, URL, expect.anything());

        // 2 retries
        expect(setTimeout).toBeCalledTimes(2);

        // make sure first two calls to real fetch did throw
        await expect(fetch.mock.results[0].value).rejects.toEqual(socketError);
        await expect(fetch.mock.results[1].value).rejects.toEqual(socketError);

        expect(res).toEqual(MockedResponseResult);
      });
    });

    test(`doesn't retry indefinitely`, () => {
      // make sure we make our result assertion
      expect.assertions(3);

      const socketError = new Error('socket hang up');
      fetch.mockRejectedValue(socketError);

      return fetchOEmbedData(URL).catch((error) => {
        // original request + 3 retries
        expect(fetch).toBeCalledTimes(4);

        // 3 retries
        expect(setTimeout).toBeCalledTimes(3);

        expect(error).toEqual(socketError);
      });
    });
  });
});
