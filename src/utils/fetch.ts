
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

/** 
 * Executes a fetch() requiring a mandatory token that should be obtained from the session. 
 * 
 * To obtain the token, follow these indications:
 * 1) Import Clerk's useAuth: `import { useAuth } from '@clerk/astro/react'`
 * 2) Call useAuth() to get the getToken() function: `const { getToken } = useAuth()`
 * 3) Call (and await) getToken() to get the token: `const token = await getToken()`
 * */
export async function fetchWithToken(query: string, { token }: { token: string | null }) {
	if (!token) throw new Error('Token is required to fetch data.')
	const response = await fetch(query, {
		headers: { Authorization: `Bearer ${token}` },
	})
	return response.json()
}