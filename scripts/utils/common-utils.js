/* eslint-disable import/prefer-default-export */
// Once we have more than one function, we can remove this elint.

/**
 * @param {string} template - Placeholders in the format `{key}`.
 * @param {Object} values - A key-value pairs to replace in the template.
 * @returns {string} - The string with replaced by actual values.
 */
function stringFormat(template, values) {
  return template.replace(/\{(.*?)}/g, (_, key) => values[key] || '');
}

const sortObjectByAttr = (parentObj, attr, order = 'asc', sensitivity = 'base') => {
  // Validate that parentObj is a non-null object
  if (parentObj === null || typeof parentObj !== 'object') {
    console.error('Provided input is not a valid object.');
    return {};
  }

  // Normalize order so that only 'asc' or 'desc' are used
  order = order.toLowerCase() === 'desc' ? 'desc' : 'asc';

  return Object.fromEntries(
    Object.entries(parentObj).sort(([, a], [, b]) => {
      const aVal = a?.[attr] ?? '';
      const bVal = b?.[attr] ?? '';
      //Numbers Comparison
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const bothAreNumbers = !isNaN(aNum) && !isNaN(bNum);
      if (bothAreNumbers) {
        return order === 'asc' ? aNum - bNum : bNum - aNum;
      }

      //String Comparison
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { sensitivity });
      return order === 'asc' ? cmp : -cmp;
    }),
  );
};

export { stringFormat, sortObjectByAttr };
