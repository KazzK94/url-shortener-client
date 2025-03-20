
import './SidebarItem.css'

interface SidebarItemProps {
	shortUrl: string,
	longUrl: string,
	onClick?: ({ shortUrl, longUrl }: { shortUrl: string, longUrl: string }) => void
	className?: string
}

export default function SidebarItem({ shortUrl, longUrl, onClick, className }: SidebarItemProps) {
	return (
		<div className={`sidebar-item ${className || ''}`} onClick={() => onClick && onClick({ shortUrl, longUrl })}>
			<p className="shortUrl url">{shortUrl}</p>
			<p className="longUrl url">{longUrl}</p>
		</div>
	)
}