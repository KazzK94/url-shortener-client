
export interface UrlData {
	_id: string
	shortKey: string
	targetUrl: string
	visits: {
		total: number
	}
	enabled: boolean
	lastVisitAt: Date | null
}