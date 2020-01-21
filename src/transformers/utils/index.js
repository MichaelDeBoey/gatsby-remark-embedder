export const getTrimmedPathName = pathname =>
  // Trim leading and trailing slashes
  pathname.replace(/^\/|\/+$/g, '');

export const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));
