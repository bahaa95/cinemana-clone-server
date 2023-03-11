export function isArray<T = unknown>(arg: T): boolean {
  try {
    let value = typeof arg === 'string' ? JSON.parse(arg) : arg;

    if (Array.isArray(value)) return true;

    return false;
  } catch (error) {
    return false;
  }
}
