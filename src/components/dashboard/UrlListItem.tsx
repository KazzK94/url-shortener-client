
import './UrlListItem.css'

interface UrlListItemProps {
	shortUrl: string,
	longUrl: string,
	onClick?: ({ shortUrl, longUrl }: { shortUrl: string, longUrl: string }) => void
	className?: string
}

export default function UrlListItem({ shortUrl, longUrl, onClick, className }: UrlListItemProps) {
	return (
		<div className={`url-list-item ${className || ''}`} onClick={() => onClick && onClick({ shortUrl, longUrl })}>
			<p className="shortUrl">{shortUrl}</p>
			<p className="longUrl">{longUrl}</p>
		</div>
	)
}