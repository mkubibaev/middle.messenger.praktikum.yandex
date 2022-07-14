export function isObject(arg: unknown): arg is Indexed {
  return typeof arg === 'object'
    && arg !== null
    && arg.constructor === Object
    && Object.prototype.toString.call(arg) === '[object Object]';
}
