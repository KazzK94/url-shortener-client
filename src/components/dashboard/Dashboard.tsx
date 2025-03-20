import './Dashboard.css'

import { useAuth } from '@clerk/astro/react'
import { useEffect, useState } from 'react'
import { fetchWithToken } from '../../utils/fetch'

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function Dashboard() {
	const { getToken } = useAuth()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const handleFetch = async () => {
			const token = await getToken()
			try {
				console.log('fetchin')
				const user = await fetchWithToken(`${BACKEND_URL}/auth/me`, { token })
				setUser(user)
				console.log('fetched user', user)
			} catch (error) {
				console.error('Error fetching user:', error)
			}
		}
		handleFetch()
	}, [])

	// Add the class 'open' to the <section> to show the url-info
	return <section className='dashboard-container'>
		<div className='urls-list'>
			<h2>
				List of URLs goes here
			</h2>
		</div>
		<div className='url-info'>
			<h2>
				Information on selected URL goes here
			</h2>

			<h3>User Data:</h3>
			<pre>
				{JSON.stringify(user, null, 2)}
			</pre>
		</div>
	</section>
}