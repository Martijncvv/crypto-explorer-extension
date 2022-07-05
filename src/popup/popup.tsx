import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './popup.css'
import DescriptionField from '../components/DescriptionField'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import InfoField from '../components/InfoField'
import InteractionField from '../components/InteractionField'
import LinksField from '../components/LinksField'
import MarketcapField from '../components/MarketcapField'
import PriceGraphField from '../components/PriceGraphField'
import OnchainTxsField from '../components/OnchainTxsField'
import TwitterFeedField from '../components/TwitterFeedField'

import { amountFormatter } from '../utils/amountFormatter'
import { fetchCoinInfo } from '../utils/api'
import { getStoredCoins } from '../utils/storage'
import { IAdvancedCoinInfo } from '../models/ICoinInfo'

interface CoinData {
	name: string
	id: string
	icon: string
	symbol: string
	price: number
	marketCapRank: string
	circSupply: number
	totalSupply: string
	description: string
	assetPlatformId: string
	contractAddress: string

	websiteLink: string
	blockExplorerLink: string
	coingeckoLink: string
	twitterLink: string
	telegramLink: string
}
interface PriceData {
	price: string
	marketCap: string
	totalVolume: string
	ath: string
	atl: string
}

const App: React.FC<{}> = () => {
	const [quote, setQuote] = useState<string>('usd')
	const [apiStatus, setApiStatus] = useState<string>('Search a ticker')

	const [coinData, setCoinData] = useState<CoinData>({
		name: '',
		id: '',
		icon: '',
		symbol: '',
		price: 0,
		marketCapRank: '',
		circSupply: 0,
		totalSupply: '',
		description: '',
		assetPlatformId: '',
		contractAddress: '',
		websiteLink: '',
		blockExplorerLink: '',
		coingeckoLink: '',
		twitterLink: '',
		telegramLink: '',
	})
	const [priceData, setPriceData] = useState<PriceData>({
		price: '',
		marketCap: '',
		totalVolume: '',
		ath: '',
		atl: '',
	})

	useEffect(() => {
		getCoinData()
	}, [quote])

	function searchCallback(): void {
		getCoinData()
	}

	async function getCoinData() {
		let coinIds = await getStoredCoins()

		if (coinIds.length > 0) {
			setApiStatus(`Fetching ${coinIds[0].symbol.toUpperCase()}`)

			let coinInfo: IAdvancedCoinInfo = await fetchCoinInfo(coinIds[0].id)

			if (coinInfo.id != undefined && coinInfo.id != '') {
				console.log(coinInfo)
				setCoinData({
					name: coinInfo.name,
					id: coinInfo.id,
					icon: coinInfo.image.large,
					symbol: coinInfo.symbol,
					price: coinInfo.market_data.current_price.usd,
					marketCapRank: `${coinInfo.market_cap_rank}`,
					circSupply: coinInfo.market_data.circulating_supply,
					totalSupply: amountFormatter(coinInfo.market_data.total_supply),
					description: coinInfo.description.en,
					assetPlatformId: coinInfo.asset_platform_id,
					contractAddress: coinInfo.contract_address,

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
				setApiStatus(`Fetch error`)
			}
		}
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

			{apiStatus !== 'Search a ticker' && (
				<>
					<MarketcapField
						coinSymbol={coinData.symbol}
						coinMarketcap={priceData.marketCap}
						coinMarketcapRank={coinData.marketCapRank}
						coinCircSupply={coinData.circSupply}
					/>

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
						attributeValue={`${amountFormatter(coinData.circSupply)} (${
							coinData.totalSupply
						})`}
					/>
					<DescriptionField coinDescription={coinData.description} />
					<PriceGraphField coinId={coinData.id} quote={quote} />
					{(coinData.assetPlatformId == 'ethereum' ||
						coinData.assetPlatformId == 'binance-smart-chain' ||
						coinData.assetPlatformId == 'polygon-pos' ||
						coinData.assetPlatformId == 'fantom') && (
						<OnchainTxsField
							contractAddress={coinData.contractAddress}
							tokenPrice={coinData.price}
							platformId={coinData.assetPlatformId}
						/>
					)}

					{/* <TwitterFeedField twitterId={coinData.twitterLink} /> */}
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
