export function isBoolean<T = unknown>(value: T): boolean {
  try {
    const booleanVlues = [true, false];
    const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
    return booleanVlues.includes(parsedValue);
  } catch (error) {
    return false;
  }
}
