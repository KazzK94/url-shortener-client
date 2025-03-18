import { useAuth } from '@clerk/astro/react'
import { useEffect } from 'react'

export default function ClerkTest() {

	const { getToken } = useAuth()

	useEffect(() => {
		const fetchUser = async () => {
			const token = await getToken()
			console.log({token})
			const user = await fetch('https://url-shortener-yhpv.onrender.com/auth/me', {
				headers: { Authorization: `Bearer ${token}` },
			}).then((res) => res.json())
			console.log({ user })
		}
		fetchUser()
	}, [])

	return <p>
		Clerk Testing
	</p>
}
