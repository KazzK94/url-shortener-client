import './Dashboard.css'

import Sidebar from './sidebar/Sidebar'
import Detail from './detail/Detail'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/astro/react'
import { fetchWithToken } from '../../utils/fetch'

import type { UrlData } from '../../types'

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function Dashboard() {

	const [urls, setUrls] = useState<UrlData[]>([])
	const [selectedUrlData, setSelectedUrlData] = useState<UrlData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const { getToken } = useAuth()

	const handleSelectUrl = (data: UrlData) => {
		setSelectedUrlData(data)
	}

	const handleShowList = () => {
		setSelectedUrlData(null)
	}

	const handleUrlChange = (changedUrlData: UrlData) => {
		setUrls(urls.map(urlData => {
			return (urlData._id === changedUrlData._id)
				? changedUrlData
				: urlData
		}))
		setSelectedUrlData(changedUrlData)
	}

	const handleUrlDelete = (deletedUrlData: UrlData) => {
		console.log('DELETING', JSON.stringify(deletedUrlData, null, 2))
		setUrls(urls.filter(urlData => urlData._id !== deletedUrlData._id))
		setSelectedUrlData(null)
	}

	useEffect(() => {
		async function fetchUrls() {
			const token = await getToken()
			// Fetch URLs from the server
			fetchWithToken(`${BACKEND_URL}/data`, { token })
				.then(res => res.json())
				.then(data => {
					if (data) {
						setUrls(data)
					}
					setIsLoading(false)
				})
		}
		fetchUrls()

	}, [])

	// Add/remove the class 'open' to the <section> to show/hide the detail view
	return <section className={`dashboard-container ${selectedUrlData !== null ? 'open' : ''}`}>
		<div className='sidebar-container'>
			<Sidebar
				urls={urls}
				selectedUrlData={selectedUrlData}
				isLoading={isLoading}
				onSelectUrl={handleSelectUrl}
			/>
		</div>
		<div className='detail-container'>
			{
				selectedUrlData !== null && (
					<Detail
						urlData={selectedUrlData}
						onUrlDataChange={handleUrlChange}
						onUrlDataDelete={handleUrlDelete}
						onBackClick={() => handleShowList()}
					/>
				)
			}
		</div>
	</section>
}