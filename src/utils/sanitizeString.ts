export function sanitizeString(value: string) {
  return value.replace(/(<([^>]+)>)/ig, '').trim();
}
