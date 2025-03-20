
export function buildShortUrl(shortKey: string): string {
	return `${window.location.origin}/${shortKey}`
}