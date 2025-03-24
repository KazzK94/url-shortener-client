
import { useEffect, useState } from 'react'
import type { UrlData } from '../../../types'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
import { fetchWithToken } from '../../../utils/fetch'
import { useAuth } from '@clerk/astro/react'

interface SidebarProps {
	selectedUrlData: UrlData | null
	onSelectUrl: (urlData: UrlData) => void
}

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function Sidebar({ selectedUrlData, onSelectUrl }: SidebarProps) {

	const [urls, setUrls] = useState<UrlData[]>([])
	const { getToken } = useAuth()
	
	useEffect(() => {
		async function fetchUrls() {
			const token = await getToken()
			// Fetch URLs from the server
			fetchWithToken(`${BACKEND_URL}/info`, { token })
				.then(data => setUrls(data))
		}
		fetchUrls()

	}, [])

	return <div className='sidebar'>
		<h1 className="sidebar-title">Your URLs</h1>
		<div className="sidebar-items">
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
		</div>
	</div>
}
