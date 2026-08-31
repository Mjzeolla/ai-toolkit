export const skillNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const semanticVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
export const markdownLinkPattern =
  /!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
export const skillReferencePattern = /\$([a-z0-9]+(?:-[a-z0-9]+)*)\b/g;

export function containsPlaceholder(value: string): boolean {
  return /\b(?:TODO|TBD|FIXME)\b|replace-with|\[placeholder\]/i.test(value);
}
