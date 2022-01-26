import DescriptionField from '../components/DescriptionField'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import SearchField from '../components/SearchField'
import InfoField from '../components/InfoField'
import LinksField from '../components/LinksField'
import PriceGraphField from '../components/PriceGraphField'

import './popup.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { AdvancedCoinInfo, fetchCoinInfo, apiStatus } from '../utils/api'
import { getStoredCoinIds, setStoredCoinIds } from '../utils/storage'

const App: React.FC<{}> = () => {
	const [quote, setQuote] = useState<string>('usd')
	const [apiStatus, setApiStatus] = useState<apiStatus>('idle')

	const [name, setName] = useState<string>('')
	const [icon, setIcon] = useState<string>('')
	const [ticker, setTicker] = useState<string>('')
	const [marketCap, setMarketCap] = useState<number>(0)
	const [marketCapRank, setMarketCapRank] = useState<number>(0)
	const [circSupply, setCircSupply] = useState<number>(0)
	const [totalSupply, setTotalSupply] = useState<number>(0)
	const [description, setDescription] = useState<string>('')

	const [websiteLink, setWebsiteLink] = useState<string>('')
	const [blockExplorerLink, setBlockExplorerLink] = useState<string>('')
	const [coingeckoLink, setCoingeckoLink] = useState<string>('')
	const [twitterLink, setTwitterLink] = useState<string>('')
	const [telegramLink, setTelegramLink] = useState<string>('')

	const [price, setPrice] = useState<number>(0)
	const [totalVolume, setTotalVolume] = useState<number>(0)
	const [ath, setAth] = useState<number>(0)
	const [atl, setAtl] = useState<number>(0)

	useEffect(() => {
		displayCoinData()
	}, [])

	function searchFieldCallback(): void {
		displayCoinData()
	}

	async function displayCoinData() {
		getStoredCoinIds().then((coinIds) => {
			setApiStatus('fetching')
			fetchCoinInfo(coinIds[0]).then((coinInfo: AdvancedCoinInfo) => {
				setApiStatus('finished')

				console.log('PU: coinIds: ', coinIds)
				console.log('PU: coininfo: ', coinInfo)

				if (coinInfo != undefined) {
					setName(coinInfo.name)
					setIcon(coinInfo.image.large)
					setTicker(coinInfo.symbol)
					setDescription(coinInfo.description.en)
					setMarketCap(coinInfo.market_data.market_cap.usd)
					setMarketCapRank(coinInfo.market_cap_rank)
					setCircSupply(coinInfo.market_data.circulating_supply)
					setTotalSupply(coinInfo.market_data.total_supply)

					setWebsiteLink(coinInfo.links.homepage[0])
					setBlockExplorerLink(coinInfo.links.blockchain_site[0])
					setCoingeckoLink(`https://www.coingecko.com/en/coins/${coinInfo.id}`)
					setTwitterLink(coinInfo.links.twitter_screen_name)
					setTelegramLink(coinInfo.links.telegram_channel_identifier)

					setPrice(coinInfo.market_data.current_price.usd)
					setTotalVolume(coinInfo.market_data.total_volume.usd)
					setAth(coinInfo.market_data.ath.usd)
					setAtl(coinInfo.market_data.atl.usd)
				}
			})
		})
	}

	return (
		<>
			<HeaderField coinName={name} coinIcon={icon} />
			<SearchField parentCallback={searchFieldCallback} />
			<InfoField attributeName="API Status" attributeValue={`${apiStatus}`} />
			<InfoField
				attributeName={`${ticker} price`}
				attributeValue={`$${price}`}
			/>
			<InfoField
				attributeName="market Cap (rank)"
				attributeValue={`$${marketCap} (${marketCapRank})`}
			/>
			<InfoField
				attributeName="total volume (24h)"
				attributeValue={`$${totalVolume}`}
			/>
			<InfoField attributeName="all-time high" attributeValue={`$${ath}`} />
			<InfoField attributeName="all-time low" attributeValue={`$${atl}`} />
			<InfoField
				attributeName="Circ. Supply (total)"
				attributeValue={`${circSupply} (${totalSupply})`}
			/>

			<LinksField
				links={[
					blockExplorerLink,
					coingeckoLink,
					twitterLink,
					telegramLink,
					websiteLink,
				]}
			/>
			<DescriptionField coinDescription={description} />
			<PriceGraphField priceData="pricedata_test" />
			<FooterField />
		</>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
