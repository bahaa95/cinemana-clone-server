import compressionMiddleware, { CompressionOptions } from 'compression';

export function compression(options?: CompressionOptions) {
  return compressionMiddleware(options);
}
