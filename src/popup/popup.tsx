import DescriptionField from '../components/DescriptionField'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import InfoField from '../components/InfoField'
import LinksField from '../components/LinksField'
import PriceGraphField from '../components/PriceGraphField'
import SearchField from '../components/SearchField'

import './popup.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { SimpleCoinInfo, AdvancedCoinInfo, fetchCoinInfo } from '../utils/api'
import { getStoredCoins } from '../utils/storage'
import { amountFormatter } from '../utils/amountFormatter'

const App: React.FC<{}> = () => {
	const [quote, setQuote] = useState<string>('usd')
	const [apiStatus, setApiStatus] = useState<string>('active')
	const [coin, setCoin] = useState<string>('')

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
		setCoinData()
	}, [])

	function searchCallback(): void {
		setCoinData()
	}

	async function setCoinData() {
		getStoredCoins().then((coinIds) => {
			setApiStatus(`Fetching: ${coinIds[0].id}`)
			setCoin(coinIds[0].id)

			fetchCoinInfo(coinIds[0].id).then((coinInfo: AdvancedCoinInfo) => {
				setApiStatus('Fetch finished')

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

					if (quote === 'usd') {
						setPrice(coinInfo.market_data.current_price.usd)
						setTotalVolume(coinInfo.market_data.total_volume.usd)
						setAth(coinInfo.market_data.ath.usd)
						setAtl(coinInfo.market_data.atl.usd)
					} else {
						setPrice(coinInfo.market_data.current_price.btc)
						setTotalVolume(coinInfo.market_data.total_volume.btc)
						setAth(coinInfo.market_data.ath.btc)
						setAtl(coinInfo.market_data.atl.btc)
					}
				} else {
					setApiStatus('Fetch error')
				}
			})
		})
	}

	console.log('Quote: ', quote)

	return (
		<>
			<HeaderField coinName={name} coinIcon={icon} />

			<SearchField
				searchCallback={searchCallback}
				activeCoin={coin}
				setQuote={setQuote}
			/>

			<InfoField
				attributeName={`${ticker.toUpperCase()} price`}
				attributeValue={`${amountFormatter(price)}`}
			/>

			<InfoField
				attributeName="market Cap (rank)"
				attributeValue={`${amountFormatter(marketCap)} (${marketCapRank})`}
			/>
			<InfoField
				attributeName="total( volume (24h)"
				attributeValue={`${amountFormatter(totalVolume)}`}
			/>
			<InfoField
				attributeName="all-time high"
				attributeValue={`${amountFormatter(ath)}`}
			/>
			<InfoField
				attributeName="all-time low"
				attributeValue={`${amountFormatter(atl)}`}
			/>
			<InfoField
				attributeName="Circ. Supply (total)"
				attributeValue={`${amountFormatter(circSupply)} (${amountFormatter(
					totalSupply
				)})`}
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
