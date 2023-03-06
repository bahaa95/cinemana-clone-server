export function jsonParse<T = any>(data: string | T): T {
  const parsedData = (typeof data === 'string' ? JSON.parse(data) : data) as T;
  return parsedData;
}
