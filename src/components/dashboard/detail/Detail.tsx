import { useAuth } from '@clerk/astro/react'
import type { UrlData } from '../../../types'
import { fetchWithToken } from '../../../utils/fetch'
import { getRelativeTime } from '../../../utils/relativeTime'
import './Detail.css'

interface DetailPanelProps {
	urlData: UrlData
	setUrlData: React.Dispatch<React.SetStateAction<UrlData | null>>
	onBackClick: () => void
}

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function DetailPanel({ urlData, setUrlData, onBackClick }: DetailPanelProps) {

	const shortUrl = `${window.location.origin}/${urlData.shortKey}`

	const { getToken } = useAuth()

	const toggleEnabled = async () => {
		const token = await getToken()
		const endpoint = `${BACKEND_URL}/${urlData.shortKey}/${urlData.enabled ? 'disable' : 'enable'}`

		try {
			fetchWithToken(endpoint, {
				token,
				method: 'PUT'
			})
				.then(() => {
					setUrlData((prev) => {
						if (prev === null) return null
						return { ...prev, enabled: !prev.enabled }
					})
				})
		} catch (error) {
			console.error('Could not change URL state. | ERROR:', error)
		}
	}

	return (
		<div className="detail-panel">
			<button className="back-button" onClick={onBackClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m12 19-7-7 7-7" />
					<path d="M19 12H5" />
				</svg>
				Go back to the list
			</button>

			<div className="detail-content">
				<div className="detail-header">
					<h2 className="detail-title url">{shortUrl}</h2>
					<p className="detail-subtitle url">{urlData.targetUrl}</p>
				</div>

				<div className="stats-grid">
					<div className="stat-card">
						<h4 className="stat-title">Total Visits</h4>
						<p className="stat-value">{urlData.visits.total}</p>
					</div>

					<div className="stat-card">
						<h4 className="stat-title">Status</h4>
						<div className="status-indicator">
							<div className={`status-dot ${urlData.enabled ? 'enabled' : 'disabled'}`}></div>
							<span>{urlData.enabled ? 'Enabled' : 'Disabled'}</span>
						</div>
					</div>

					<div className="stat-card">
						<h4 className="stat-title">Last visit</h4>
						<p className="stat-value">{urlData.lastVisitAt === null ? 'No visits' : getRelativeTime(urlData.lastVisitAt)}</p>
					</div>
				</div>

				<div className="actions">
					<button onClick={() => alert('Not Implemented Yet')} className="action-button rename-button">
						Change SMOL URL
					</button>
					<button onClick={toggleEnabled} className={`action-button ${urlData.enabled ? 'disable-button' : 'enable-button'}`}>
						{urlData.enabled ? 'Disable' : 'Enable'} SMOL URL
					</button>
					<button onClick={() => alert('Not Implemented Yet')} className="action-button delete-button">
						Delete SMOL URL
					</button>
				</div>
			</div>
		</div>
	)
}