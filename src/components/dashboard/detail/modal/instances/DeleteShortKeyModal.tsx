
import './DeleteShortKeyModal.css'

import { useState, type FormEvent } from 'react'
import type { UrlData } from '../../../../../types'
import { fetchWithToken } from '../../../../../utils/fetch'
import { useAuth } from '@clerk/astro/react'

interface DeleteShortKeyModalProps {
	urlData: UrlData
	onUrlDataDelete: (urlData: UrlData) => void
	onClose: () => void
}

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function DeleteShortKeyModal({ urlData, onUrlDataDelete: onUrlDataDeleted, onClose }: DeleteShortKeyModalProps) {

	const { getToken } = useAuth()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const handleDelete = async () => {
		const token = await getToken()

		try {
			const res = await fetchWithToken(`${BACKEND_URL}/${urlData.shortKey}`, {
				token,
				method: 'DELETE'
			})
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}
			onUrlDataDeleted(urlData)
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
		<div className="modal-form">
			<h2>Delete Short Key?</h2>
			<div>
				<p>The Short Key <strong>{urlData.shortKey}</strong> will be permanently removed.</p>
				<p><em>THIS ACTION IS IRREVERSIBLE.</em></p>
			</div>

			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<div className="action-buttons">
				<button className="close-modal" onClick={handleClose}>Cancel</button>
				<button className='delete-url' onClick={handleDelete}>Delete Permanently</button>
			</div>
		</div>
	)
}