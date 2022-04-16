export function uniqueValues<T>(array: T[]): T[] {
	return Array.from(new Set(array));
}
