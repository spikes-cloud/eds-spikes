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

export { stringFormat };
