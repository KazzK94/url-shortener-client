import './Detail.css'

interface DetailPanelProps {
	urlData: {
		id: string
		shortUrl: string
		longUrl: string
	}
	onBackClick: () => void
}

export default function DetailPanel({ urlData, onBackClick }: DetailPanelProps) {
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
					<h2 className="detail-title url">{urlData.shortUrl}</h2>
					<p className="detail-subtitle url">{urlData.longUrl}</p>
				</div>

				<div className="stats-grid">
					<div className="stat-card">
						<h4 className="stat-title">Total Visits</h4>
						<p className="stat-value">137</p>
					</div>

					<div className="stat-card">
						<h4 className="stat-title">Status</h4>
						<div className="status-indicator">
							<div className="status-dot enabled"></div>
							<span>Enabled</span>
						</div>
					</div>

					<div className="stat-card">
						<h4 className="stat-title">Last visit</h4>
						<p className="stat-value">{(new Date()).toLocaleDateString()}</p>
					</div>
				</div>

				<div className="actions">
					<button className="action-button rename-button">
						Change SMOL URL
					</button>
					<button className="action-button disable-button">
						Disable SMOL URL
					</button>
					<button className="action-button delete-button">
						Delete SMOL URL
					</button>
				</div>
			</div>
		</div>
	)
}