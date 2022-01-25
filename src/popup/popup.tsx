import DescriptionField from '../components/DescriptionField'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import InfoField from '../components/InfoField'
import LinksField from '../components/LinksField'
import PriceGraphField from '../components/PriceGraphField'

import './popup.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { getStoredCoinsInfo } from '../utils/storage'

const links: string[] = ['link1', 'link2', 'link3']

const App: React.FC<{}> = () => {
	const [name, setName] = useState<string>('')
	const [icon, setIcon] = useState<string>('')
	const [ticker, setTicker] = useState<string>('')
	const [priceUSD, setPriceUSD] = useState<number>(0)
	const [marketCap, setMarketCap] = useState<number>(0)
	const [marketCapRank, setMarketCapRank] = useState<number>(0)
	const [totalVolumeUSD, setTotalVolumeUSD] = useState<number>(0)

	const [athUSD, setAthUSD] = useState<number>(0)
	const [atlUSD, setAtlUSD] = useState<number>(0)
	const [circSupply, setCircSupply] = useState<number>(0)
	const [totalSupply, setTotalSupply] = useState<number>(0)
	const [description, setDescription] = useState<string>('')

	const [websiteLink, setWebsiteLink] = useState<string>('')
	const [blockExplorerLink, setBlockExplorerLink] = useState<string>('')
	const [coingeckoLink, setCoingeckoLink] = useState<string>('')
	const [twitterLink, setTwitterLink] = useState<string>('')
	const [telegramLink, setTelegramLink] = useState<string>('')

	const [priceBTC, setPriceBTC] = useState<number>(0)
	const [totalVolumeBTC, setTotalVolumeBTC] = useState<number>(0)
	const [athBTC, setAthBTC] = useState<number>(0)
	const [atlBTC, setAtlBTC] = useState<number>(0)

	useEffect(() => {
		getStoredCoinsInfo().then((coinsInfo) => {
			console.log('popupjs', coinsInfo)
		})
	}, [])

	return (
		<>
			<HeaderField coinName={'HEADDERR'} />
			<InfoField attributeName="price" attributeValue={1} />
			<InfoField attributeName="market Cap (rank)" attributeValue={22} />
			<InfoField attributeName="total volume (24h)" attributeValue={22} />
			<InfoField attributeName="all-time high" attributeValue={22} />
			<InfoField attributeName="all-time low" attributeValue={22} />
			<InfoField attributeName="Circ. Supply (total)" attributeValue={22} />

			<LinksField links={links} />
			<DescriptionField
				coinDescription={
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				}
			/>
			<PriceGraphField priceData="pricedata_test" />
			<FooterField />
		</>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
