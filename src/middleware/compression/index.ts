import compression, { CompressionOptions } from 'compression';

// eslint-disable-next-line
export function compressResponses(options?: CompressionOptions) {
  return compression(options);
}
