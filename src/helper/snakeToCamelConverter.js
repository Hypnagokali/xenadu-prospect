/*
 Weil es schnell gehen musste, habe ich den Code fast vollständig von
    https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
 übernommen. Bei Gelegenheit mal analysieren :)
*/

const toCamel = (s) => s.replace(/([_][a-z])/ig,
  ($1) => $1.toUpperCase().replace('_', ''));

const isArray = (a) => Array.isArray(a);

// is an pure object, without beeing an array or a function?
const isObject = (o) => o === Object(o) && !isArray(o) && typeof o !== 'function';

const convertKeysToCamelCase = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = convertKeysToCamelCase(o[k]);
      });

    return n;
  }
  if (isArray(o)) {
    return o.map((i) => convertKeysToCamelCase(i));
  }
  return o;
};

export default convertKeysToCamelCase;
