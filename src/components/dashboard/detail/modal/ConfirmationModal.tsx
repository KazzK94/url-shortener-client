import './ConfirmationModal.css'

import type { ConfirmationModalType, UrlData } from '../../../../types'
import { ChangeShortKeyModal } from './instances/ChangeShortKeyModal'

interface ConfirmationModalProps {
	type: ConfirmationModalType
	urlData: UrlData | null
	onUrlDataChange?: (urlData: UrlData) => void
	onClose: () => void
}


export default function ConfirmationModal({ type, urlData, onUrlDataChange, onClose }: ConfirmationModalProps) {

	if (type === null || urlData === null) return null

	const handleUrlDataChange = (newUrlData: UrlData) => {
		if (onUrlDataChange) {
			onUrlDataChange(newUrlData)
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
		</div>
	</div>)
}