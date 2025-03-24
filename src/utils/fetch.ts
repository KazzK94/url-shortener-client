
/** 
 * Executes a fetch() requiring a mandatory token that should be obtained from the session. 
 * 
 * To obtain the token from a React Component, follow these indications:
 * 1) Import Clerk's useAuth: `import { useAuth } from '@clerk/astro/react'`
 * 2) Call useAuth() to get the getToken() function: `const { getToken } = useAuth()`
 * 3) Call (and await) getToken() to get the token: `const token = await getToken()`
 * 
 * @param query The URL to fetch data from.
 * @param token The token to be used in the Authorization header.
 * @returns The JSON response from the fetch() call (no need to do response.json()).
 * */
export async function fetchWithToken(query: string, { token }: { token: string | null }) {
	if (!token) throw new Error('Token is required to fetch data.')
	const response = await fetch(query, {
		headers: { Authorization: `Bearer ${token}` },
	})
	return response.json()
}