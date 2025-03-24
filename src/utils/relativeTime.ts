
// Units in seconds
const DATE_UNITS = {
	year: 31536000,
	month: 2592000,
	day: 86400,
	hour: 3600,
	minute: 60,
	second: 1
}

const languageCode = 'en'
const rtf = new Intl.RelativeTimeFormat(
	languageCode,
	{ numeric: 'auto' }
)

export function getRelativeTime(date: Date): string {
	const from = new Date(date).getTime()
	const now = new Date().getTime()

	const elapsed = (now - from) / 1000

	for (const unit in DATE_UNITS) {
		const unitKey = unit as keyof typeof DATE_UNITS
		if (elapsed > DATE_UNITS[unitKey]) {
			const value = Math.floor(elapsed / DATE_UNITS[unitKey]) * -1
			return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
		}
	}

	return 'Just now'
}