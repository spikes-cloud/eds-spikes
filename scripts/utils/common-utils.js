function stringFormat(template, values) {
  return template.replace(/\{(.*?)}/g, (_, key) => values[key] || '');
}

function stringFormat2(template, values) {
  return template.replace(/\{(.*?)}/g, (_, key) => values[key] || '');
}
export { stringFormat, stringFormat2 };
