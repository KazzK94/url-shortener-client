
import type { UrlData } from '../../../types'
import './Sidebar.css'
import SidebarItem from './SidebarItem'

interface SidebarProps {
	selectedUrlData: UrlData | null
	onSelectUrl: (urlData: UrlData) => void
}


const MOCK_URLS = [
	{
		id: 'akjh33sgs213aga421sbnx463khwjt2368odx',
		shortUrl: 'https://smol.reibal.dev/test111',
		longUrl: 'https://www1.example1.com/something/longUrlData/query=user%20%searched%20%this&moreData=long_info258260'
	},
	{
		id: 'xobd384hn38fd3s734a3gsd8f3h7d8fh3f48s',
		shortUrl: 'https://smol.reibal.dev/test222',
		longUrl: 'https://www2.example2.com/something/longUrlData/query=user%20%searched%20%this&moreData=long_info258260'
	},
	{
		id: 'c9h8sdhsdigdigy890235u2j9qqn9hd90a98',
		shortUrl: 'https://smol.reibal.dev/test333',
		longUrl: 'https://www3.example3.com/something/longUrlData/query=user%20%searched%20%this&moreData=long_info258260'
	},
]


export default function Sidebar({ selectedUrlData, onSelectUrl }: SidebarProps) {
	return <div className='sidebar'>
		<h1 className="sidebar-title">Your URLs</h1>
		<div className="sidebar-items">
		{
				MOCK_URLS.map((urlData, index) => (
					<SidebarItem
						key={urlData.id}
						shortUrl={urlData.shortUrl}
						longUrl={urlData.longUrl}
						onClick={() => onSelectUrl(urlData)}
						className={selectedUrlData?.id === urlData.id ? 'selected' : ''}
					/>
				))
			}
		</div>
	</div>
}
