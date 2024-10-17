export function fromPublic(src: string): string {
  return `${process.env.PUBLIC_URL}/${src}`;
}
