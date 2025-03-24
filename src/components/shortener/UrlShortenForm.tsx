import './UrlShortenForm.css'

import { useRef, useState, type FormEvent } from 'react'

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL

export default function UrlShortenForm() {

	const [url, setUrl] = useState('')
	const [modalData, setModalData] = useState({ shortUrl: '' })
	const modalRef = useRef<HTMLDialogElement>(null)

	async function shortenUrl(url: string): Promise<{ shortUrl: string }> {
		return await fetch(`${BACKEND_URL}/shorten`, {
			method: "POST",
			body: JSON.stringify({ url: url }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Response:", data)
				if (data.error) {
					console.error(`Error: ${data.error}`)
					throw new Error(data.error)
				} else {
					console.log(`${window.location.origin}/${data.shortKey}`)
					return { shortUrl: `${window.location.origin}/${data.shortKey}` }
				}
			})
	}

	const handleSubmit = (event: FormEvent) => {
		console.log('form submission triggered', event)
		event.preventDefault()
		if (!url) return
		setModalData({ shortUrl: '' })
		shortenUrl(url).then((result) => {
			setModalData({
				shortUrl: result.shortUrl,
			})
			modalRef?.current?.showModal()
		})
	}

	const closeModal = () => {
		modalRef?.current?.close()
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='shorten-form'>
				<input
					id="url-input"
					name="url"
					type="text"
					placeholder="Enter your URL here"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<button type='submit' className="shorten-submit-button">Shorten URL</button>
			</form>

			<dialog ref={modalRef} data-closedby="any" className='success-modal'>
				{
					modalData.shortUrl && (<>
						<h3>Success!!</h3>
						<p>Your new SMOL url is available now at:</p>
						<p>
							<a id="short-url" href={modalData.shortUrl} target='_blank'>{modalData.shortUrl}</a>
						</p>

						<img
							className="qr-code"
							src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${modalData.shortUrl}`}
							alt="QR Code for the Generated URL"
						/>
					</>)
				}

				<button onClick={closeModal} className="modal-close">Close</button>
			</dialog>
		</>
	)
}
