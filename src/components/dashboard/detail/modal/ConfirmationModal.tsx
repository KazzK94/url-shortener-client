import './ConfirmationModal.css'

import type { ConfirmationModalType, UrlData } from '../../../../types'
import ChangeShortKeyModal from './instances/ChangeShortKeyModal'
import DeleteShortKeyModal from './instances/DeleteShortKeyModal'

interface ConfirmationModalProps {
	type: ConfirmationModalType
	urlData: UrlData | null
	onUrlDataChange?: (urlData: UrlData) => void
	onUrlDataDelete?: (urlData: UrlData) => void
	onClose: () => void
}


export default function ConfirmationModal({ type, urlData, onUrlDataChange, onUrlDataDelete, onClose }: ConfirmationModalProps) {

	if (type === null || urlData === null) return null

	const handleUrlDataChange = (newUrlData: UrlData) => {
		if (onUrlDataChange) {
			onUrlDataChange(newUrlData)
		}
		onClose()
	}

	const handleUrlDataDelete = (deletedUrlData: UrlData) => {
		if(onUrlDataDelete) {
			onUrlDataDelete(deletedUrlData)
		}
		onClose()
	}

	const handleClose = () => {
		if (onClose) {
			onClose()
		}
	}

	return (<div className="confirmation-modal-backdrop">
		<div className="confirmation-modal">
			{type === 'ShortKeyChange' && (
				<ChangeShortKeyModal
					urlData={urlData}
					onUrlDataChange={handleUrlDataChange}
					onClose={handleClose}
				/>
			)}
			{type === 'Delete' && (
				<DeleteShortKeyModal
					urlData={urlData}
					onUrlDataDelete={handleUrlDataDelete}
					onClose={handleClose}
				/>
			)}
		</div>
	</div>)
}