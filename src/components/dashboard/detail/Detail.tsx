import './Detail.css'

import ConfirmationModal from './modal/ConfirmationModal'
import { fetchWithToken } from '../../../utils/fetch'
import { getRelativeTime } from '../../../utils/relativeTime'
import { useState } from 'react'
import { useAuth } from '@clerk/astro/react'

import type { ConfirmationModalType, UrlData } from '../../../types'

interface DetailPanelProps {
	urlData: UrlData
	onUrlDataChanged: (urlData: UrlData) => void
	onBackClick: () => void
}

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function DetailPanel({ urlData, onUrlDataChanged, onBackClick }: DetailPanelProps) {

	const shortUrl = `${window.location.origin}/${urlData.shortKey}`
	const [modalType, setModalType] = useState<ConfirmationModalType | null>(null)

	const { getToken } = useAuth()

	const toggleEnabled = async () => {
		const token = await getToken()
		const endpoint = `${BACKEND_URL}/${urlData.shortKey}/${urlData.enabled ? 'disable' : 'enable'}`

		fetchWithToken(endpoint, {
			token,
			method: 'PUT'
		})
			.then(res => res.json())
			.then(() => {
				onUrlDataChanged({
					...urlData,
					enabled: !(urlData.enabled)
				})
			})
			.catch((error) => {
				console.error('Error toggling URL enabled status:', error)
			})
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
					<button onClick={() => setModalType('ShortKeyChange')} className="action-button rename-button">
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

			{modalType !== null && (
				<ConfirmationModal
					type={modalType}
					urlData={urlData}
					onClose={() => setModalType(null)}
					onUrlDataChange={onUrlDataChanged}
				/>
			)}

		</div>
	)
}