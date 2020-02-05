/**
 * @description Takes an object `source` which could be deeply nested, runs through its keys and recursively
 * returns a new object aka `constructedResp` with `dot-separated` keys containing the original values from `source`
 * after all the recursive calls resolve, we then return the full response object.
 *
 * @example
 *  flatten({ foo: { bar: { name: 'some value' } } });
 *    output --> { 'foo.bar.name': 'some value' }
 *
 *  flatten({ foo: null, bar: { prop1: false, prop2: 0, prop3: 1 } });
 *    output --> { 'foo' : null, 'bar.prop1' : false, 'bar.prop2' : 0, 'bar.prop3' : 1 }
 *
 *  flatten({ foo: [{ bar: 1 }, { prop: null }]});
 *    output --> { 'foo.0.bar': 1, foo.1.prop: null }
 *
 * @param {Object} source
 * @param {String} flattenedKeys
 * @param {Object} constructedResp
 * @returns {{}}
 */
const flatten = (source = {}, flattenedKeys = '', constructedResp = {}) => {
  let currentKey = '';
  Object.keys(source).forEach((keyName) => {
    currentKey = (flattenedKeys) ? `${flattenedKeys}.${keyName}` : keyName;
    (source[keyName] && typeof source[keyName] === 'object')
      ? flatten(source[keyName], currentKey, constructedResp)
      : Object.assign(constructedResp, { [currentKey]: source[keyName] })
  });
  return constructedResp;
};

module.exports = flatten;