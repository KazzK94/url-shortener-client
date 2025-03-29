import './Dashboard.css'

import Sidebar from './sidebar/Sidebar'
import Detail from './detail/Detail'
import { useState } from 'react'

import type { UrlData } from '../../types'

export default function Dashboard() {

	const [selectedUrlData, setSelectedUrlData] = useState<UrlData | null>(null)

	const handleSelectUrl = (data: UrlData) => {
		setSelectedUrlData(data)
	}

	const handleShowList = () => {
		setSelectedUrlData(null)
	}

	// Add/remove the class 'open' to the <section> to show/hide the detail view
	return <section className={`dashboard-container ${selectedUrlData !== null ? 'open' : ''}`}>
		<div className='sidebar-container'>
			<Sidebar
				selectedUrlData={selectedUrlData}
				onSelectUrl={handleSelectUrl}
			/>
		</div>
		<div className='detail-container'>
			{
				selectedUrlData !== null && (
					<Detail
						urlData={selectedUrlData}
						setUrlData={setSelectedUrlData}
						onBackClick={() => handleShowList()}
					/>
				)
			}
		</div>
	</section>
}