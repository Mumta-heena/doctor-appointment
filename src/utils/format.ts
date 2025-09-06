// utils/format.ts
export function formatDate(i: string) {
  const d = new Date(i);
  return d.toLocaleString();
}
