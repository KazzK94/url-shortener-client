import { useAuth } from '@clerk/astro/react'
import { useEffect, useState } from 'react'

export default function ClerkTest() {

	const { getToken } = useAuth()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchUser = async () => {
			const token = await getToken()
			const user = await fetch('https://url-shortener-yhpv.onrender.com/auth/me', {
				headers: { Authorization: `Bearer ${token}` },
			}).then((res) => res.json())
			setUser(user)
		}
		fetchUser()
	}, [])

	return <p>
		Clerk Testing
	</p>
}
