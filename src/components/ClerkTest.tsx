import { useAuth } from '@clerk/astro/react'
import { useEffect, useState } from 'react'

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function ClerkTest() {
	
	const { getToken } = useAuth()
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		const fetchUser = async () => {
			const token = await getToken()
			const user = await fetch(`${BACKEND_URL}/auth/me`, {
				headers: { Authorization: `Bearer ${token}` },
			}).then((res) => res.json())
			setUser(user)
		}
		fetchUser()
	}, [])

	return <p>
		{JSON.stringify(user, null, 2)}
	</p>
}
