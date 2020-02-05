/**
 * @description Takes in an object `source` which has a key with '.' in it which means it's been previously flattened
 * runs through each key and creates a deeply nested object.
 *
 * @example
 *  unFlatten({ 'a.b.c': 1 });
 *    output --> { a: { b: { c: 1 } } }
 *
 *  unFlatten({ 'a.b': null });
 *    output --> { a: { b: null } }
 *
 * @param {Object} source
 * @returns {{}}
 */
const unFlatten = (source = {}) => {
  return Object.entries(source).reduce((result, [key, val]) => {
    key.split('.').reduce((constructedObj, key, keyIndex, keyArray) => {
      (keyIndex === keyArray.length - 1)
        ? constructedObj[key] = (val && typeof val === 'object') ? unFlatten(val) : val
        : constructedObj[key] = constructedObj[key] || {};
      return constructedObj[key];
    }, result);
    return result;
  }, {});
};

module.exports = unFlatten;