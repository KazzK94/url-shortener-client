
import './SidebarItem.css'

interface SidebarItemProps {
	shortKey: string,
	targetUrl: string,
	onClick?: ({ shortKey, targetUrl }: { shortKey: string, targetUrl: string }) => void
	className?: string
}

export default function SidebarItem({ shortKey, targetUrl, onClick, className }: SidebarItemProps) {

	const shortUrl = `${window.location.origin}/${shortKey}`

	return (
		<div className={`sidebar-item ${className || ''}`} onClick={() => onClick && onClick({ shortKey, targetUrl })}>
			<p className="shortUrl url">{shortUrl}</p>
			<p className="targetUrl url">{targetUrl}</p>
		</div>
	)
}