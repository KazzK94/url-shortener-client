
import type { UrlData } from '../../../types'
import './Sidebar.css'
import SidebarItem from './SidebarItem'

interface SidebarProps {
	urls: UrlData[]
	selectedUrlData: UrlData | null
	isLoading: boolean
	onSelectUrl: (urlData: UrlData) => void
}

export default function Sidebar({ urls, selectedUrlData, isLoading, onSelectUrl }: SidebarProps) {
	return <div className='sidebar'>
		<h1 className="sidebar-title">Your URLs</h1>
		<div className="sidebar-items">
			{
				isLoading === false && urls.length === 0 && (
					<div className="no-urls-message">
						<p>No URLs found.</p>
					</div>
				)
			}
			{
				urls.map((urlData) => (
					<SidebarItem
						key={urlData._id}
						shortKey={urlData.shortKey}
						targetUrl={urlData.targetUrl}
						onClick={() => onSelectUrl(urlData)}
						className={selectedUrlData?._id === urlData._id ? 'selected' : ''}
					/>
				))
			}
			{
				isLoading === false && (
					<div className="add-url-item">
						<a href="/">Add a new URL</a>
					</div>
				)
			}
		</div>

		{
			isLoading && (
				<div>
					<p>Loading...</p>
				</div>
			)
		}
	</div>
}
