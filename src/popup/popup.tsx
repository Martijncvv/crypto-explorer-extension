import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './popup.css'
import DescriptionField from '../components/DescriptionField'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import InfoField from '../components/InfoField'
import LinksField from '../components/LinksField'
import PriceGraphField from '../components/PriceGraphField'
import InteractionField from '../components/InteractionField'
import CompareMcField from '../components/CompareMcField'

import { AdvancedCoinInfo, fetchCoinInfo } from '../utils/api'
import { getStoredCoins } from '../utils/storage'
import { amountFormatter } from '../utils/amountFormatter'

interface CoinData {
	name: string
	id: string
	icon: string
	symbol: string
	marketCapRank: string
	circSupply: string
	totalSupply: string
	description: string

	websiteLink: string
	blockExplorerLink: string
	coingeckoLink: string
	twitterLink: string
	telegramLink: string
}
interface priceData {
	price: string
	marketCap: string
	totalVolume: string
	ath: string
	atl: string
}

const App: React.FC<{}> = () => {
	const [quote, setQuote] = useState<string>('usd')
	const [apiStatus, setApiStatus] = useState<string>('Search ticker')

	const [coinData, setCoinData] = useState<CoinData>({
		name: '',
		id: '',
		icon: '',
		symbol: '',
		marketCapRank: '',
		circSupply: '',
		totalSupply: '',
		description: '',
		websiteLink: '',
		blockExplorerLink: '',
		coingeckoLink: '',
		twitterLink: '',
		telegramLink: '',
	})
	const [priceData, setPriceData] = useState<priceData>({
		price: '',
		marketCap: '',
		totalVolume: '',
		ath: '',
		atl: '',
	})

	// const [name, setName] = useState<string>('')
	// const [id, setId] = useState<string>('')
	// const [icon, setIcon] = useState<string>('')
	// const [symbol, setSymbol] = useState<string>('')
	// const [marketCap, setMarketCap] = useState<string>('')
	// const [marketCapRank, setMarketCapRank] = useState<string>('')
	// const [circSupply, setCircSupply] = useState<string>('')
	// const [totalSupply, setTotalSupply] = useState<string>('')
	// const [description, setDescription] = useState<string>('')

	// const [price, setPrice] = useState<string>('')
	// const [totalVolume, setTotalVolume] = useState<string>('')
	// const [ath, setAth] = useState<string>('')
	// const [atl, setAtl] = useState<string>('')

	// const [websiteLink, setWebsiteLink] = useState<string>('')
	// const [blockExplorerLink, setBlockExplorerLink] = useState<string>('')
	// const [coingeckoLink, setCoingeckoLink] = useState<string>('')
	// const [twitterLink, setTwitterLink] = useState<string>('')
	// const [telegramLink, setTelegramLink] = useState<string>('')

	useEffect(() => {
		getCoinData()
	}, [quote])

	function searchCallback(): void {
		getCoinData()
	}

	async function getCoinData() {
		getStoredCoins().then(async (coinIds) => {
			if (coinIds.length > 0) {
				setApiStatus(`Fetching ${coinIds[0].symbol.toUpperCase()}`)

				await fetchCoinInfo(coinIds[0].id).then(
					(coinInfo: AdvancedCoinInfo) => {
						if (coinInfo.id != undefined && coinInfo.id != '') {
							console.log(coinInfo)
							setCoinData({
								name: coinInfo.name,
								id: coinInfo.id,
								icon: coinInfo.image.large,
								symbol: coinInfo.symbol,
								marketCapRank: amountFormatter(coinInfo.market_cap_rank),
								circSupply: amountFormatter(
									coinInfo.market_data.circulating_supply
								),
								totalSupply: amountFormatter(coinInfo.market_data.total_supply),
								description: coinInfo.description.en,

								websiteLink: coinInfo.links.homepage[0],
								blockExplorerLink: coinInfo.links.blockchain_site[0],
								coingeckoLink: `https://www.coingecko.com/en/coins/${coinInfo.id}`,
								twitterLink: coinInfo.links.twitter_screen_name,
								telegramLink: coinInfo.links.telegram_channel_identifier,
							})

							if (quote === 'usd') {
								setPriceData({
									price: `$${amountFormatter(
										coinInfo.market_data.current_price.usd
									)}`,
									marketCap: `$${amountFormatter(
										coinInfo.market_data.market_cap.usd
									)}`,
									totalVolume: `$${amountFormatter(
										coinInfo.market_data.total_volume.usd
									)}`,
									ath: `$${amountFormatter(coinInfo.market_data.ath.usd)}`,
									atl: `$${amountFormatter(coinInfo.market_data.atl.usd)}`,
								})
							} else {
								setPriceData({
									price: `₿${amountFormatter(
										coinInfo.market_data.current_price.btc
									)}`,
									marketCap: `₿${amountFormatter(
										coinInfo.market_data.market_cap.btc
									)}`,
									totalVolume: `₿${amountFormatter(
										coinInfo.market_data.total_volume.btc
									)}`,
									ath: `₿${amountFormatter(coinInfo.market_data.ath.btc)}`,
									atl: `₿${amountFormatter(coinInfo.market_data.atl.btc)}`,
								})
							}

							setApiStatus(`Fetch success`)
						} else {
							setApiStatus(`Fetch error: ${coinIds[0].symbol.toUpperCase()}`)
						}
					}
				)
			}
		})
	}

	return (
		<>
			<HeaderField coinName={coinData.name} coinIcon={coinData.icon} />
			<InteractionField
				searchCallback={searchCallback}
				activeCoinTicker={coinData.symbol}
				setQuote={setQuote}
			/>
			{apiStatus !== `Fetch success` ? (
				<InfoField attributeName={`${apiStatus}`} attributeValue={' '} />
			) : (
				<InfoField
					attributeName={`${coinData.symbol.toUpperCase()} price`}
					attributeValue={`${priceData.price}`}
				/>
			)}

			{apiStatus !== 'Search ticker' && (
				<>
					<InfoField
						attributeName="market Cap (rank)"
						attributeValue={`${priceData.marketCap} (${coinData.marketCapRank})`}
					/>
					{/* <CompareMcField coinTicker={symbol} /> */}
					<InfoField
						attributeName="total volume (24h)"
						attributeValue={`${priceData.totalVolume}`}
					/>
					<InfoField
						attributeName="all-time high"
						attributeValue={`${priceData.ath}`}
					/>
					<InfoField
						attributeName="all-time low"
						attributeValue={`${priceData.atl}`}
					/>
					<InfoField
						attributeName="Circ. Supply (total)"
						attributeValue={`${coinData.circSupply} (${coinData.totalSupply})`}
					/>
					<DescriptionField coinDescription={coinData.description} />
					<PriceGraphField coinId={coinData.id} quote={quote} />
					<LinksField
						blockExplorerLink={coinData.blockExplorerLink}
						coingeckoLink={coinData.coingeckoLink}
						twitterLink={coinData.twitterLink}
						telegramLink={coinData.telegramLink}
						websiteLink={coinData.websiteLink}
					/>
				</>
			)}

			<FooterField />
		</>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
