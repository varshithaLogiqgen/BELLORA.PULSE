export function matchesSearch(query: string, values: string[]) {
  const haystack = values.join(' ').toLocaleLowerCase();
  return query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

export function initialLetter(name: string) {
  const first = name.trim().charAt(0).toUpperCase();
  return /^[A-Z]$/.test(first) ? first : '#';
}

export function parseSavedIds(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(value)
      ? [
          ...new Set(
            value.filter(
              (id): id is string => typeof id === 'string' && id.length > 0,
            ),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}
