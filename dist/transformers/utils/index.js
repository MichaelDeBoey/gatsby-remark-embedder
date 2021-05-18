"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.includesSomeOfArray = exports.getTrimmedPathName = exports.fetchOEmbedData = void 0;

var _fetchRetry = _interopRequireDefault(require("fetch-retry"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

const fetchWithRetries = (0, _fetchRetry.default)(_nodeFetch.default);

const fetchOEmbedData = url => fetchWithRetries(url, {
  retries: 3,
  retryDelay: attempt => 2 ** attempt * 1000
}).then(response => {
  if (!response.ok) {
    throw new Error(`Request to ${url} returned non-OK status (${response.status})`);
  }

  return response;
}).then(data => data.json());

exports.fetchOEmbedData = fetchOEmbedData;

const getTrimmedPathName = pathname => // Trim leading and trailing slashes
pathname.replace(/^\/|\/+$/g, '');

exports.getTrimmedPathName = getTrimmedPathName;

const includesSomeOfArray = (string, array) => array.some(item => string.includes(item));

exports.includesSomeOfArray = includesSomeOfArray;