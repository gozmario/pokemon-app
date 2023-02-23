export function generateQueryKey(baseKey: string, id: string): string[] {
  return [`${baseKey}-${id}`];
}
