
import './ChangeShortKeyModal.css'

import { useState, type FormEvent } from 'react'
import type { UrlData } from '../../../../../types'
import { fetchWithToken } from '../../../../../utils/fetch'
import { useAuth } from '@clerk/astro/react'

interface ChangeShortKeyModalProps {
	urlData: UrlData
	onUrlDataChange: (urlData: UrlData) => void
	onClose: () => void
}

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function ChangeShortKeyModal({ urlData, onUrlDataChange, onClose }: ChangeShortKeyModalProps) {

	const { getToken } = useAuth()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget as HTMLFormElement)
		const newShortKey = formData.get('shortKey')
		if (!newShortKey) {
			setErrorMessage('The new Short Key cannot be empty')
			return
		}
		if(urlData.shortKey === newShortKey) {
			onClose()
			return
		}
		const token = await getToken()

		try {
			const res = await fetchWithToken(`${BACKEND_URL}/${urlData.shortKey}/rename`, {
				token,
				method: 'PUT',
				body: JSON.stringify({ shortKey: newShortKey }),
				headers: {
					'Content-Type': 'application/json',
				}
			})
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}
			onUrlDataChange({ ...urlData, shortKey: newShortKey as string })
		} catch (error) {
			console.error('Error:', error)
			const errorString = String(error)
			setErrorMessage(errorString.replace('Error: ', ''))
		}

	}

	const handleClose = () => {
		onClose()
	}

	return (
		<form onSubmit={handleSubmit} className="modal-form">
			<h2>Changing Short Key</h2>
			<p>Current Short Key is: <strong>{urlData.shortKey}</strong></p>

			<div className="form-group">
				<label>New Short Key</label>
				<input type="text" name="shortKey" defaultValue={urlData.shortKey} />
			</div>

			{errorMessage && (<p className='error-message'>{errorMessage}</p>)}

			<div className="action-buttons">
				<button className="close-modal" type="button" onClick={handleClose}>Cancel</button>
				<button type="submit">Submit</button>
			</div>
		</form>
	)
}