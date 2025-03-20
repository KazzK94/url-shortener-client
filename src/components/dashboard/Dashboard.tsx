import './Dashboard.css'

import { useRef } from 'react'
import UrlListItem from './UrlListItem'

export default function Dashboard() {
	const dashboardContainerRef = useRef<HTMLDivElement>(null)

	const handleSelectUrl = (urlData: { shortUrl: string, longUrl: string }) => {
		console.log('selected url:', urlData)
		dashboardContainerRef.current?.classList.add('open')
	}

	// Add the class 'open' to the <section> to show the url-info
	return <section className='dashboard-container' ref={dashboardContainerRef}>
		<div className='urls-list-container'>
			<h2>
				&nbsp;Your URLs
			</h2>
			<div className='urls-list'>
				<UrlListItem
					shortUrl='https://smol.reibal.dev/asdf123'
					longUrl='https://www.example.com/something/longUrlData/query=user%20%searched%20%this&moreData=long_info258260'
					onClick={handleSelectUrl}
				/>
			</div>
		</div>
		<div className='url-info-container'>
			<h2>
				&nbsp;Information on selected URL
			</h2>
			<br />
			<h3>Shortened URL:</h3>
			<p className='url'>https://smol.reibal.dev/asdf123</p>
			<br />
			<h3>Long Url</h3>
			<p className='url'>https://www.example.com/something/longUrlData/query=user%20%searched%20%this&moreData=long_info258260</p>
		</div>
	</section>
}