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

import { AdvancedCoinInfo, fetchCoinInfo } from '../utils/api'
import { getStoredCoins } from '../utils/storage'
import { amountFormatter } from '../utils/amountFormatter'

const App: React.FC<{}> = () => {
	const [quote, setQuote] = useState<string>('usd')
	const [apiStatus, setApiStatus] = useState<string>('Search ticker')

	const [name, setName] = useState<string>('')
	const [id, setId] = useState<string>('')
	const [icon, setIcon] = useState<string>('')
	const [symbol, setSymbol] = useState<string>('')
	const [marketCap, setMarketCap] = useState<string>('')
	const [marketCapRank, setMarketCapRank] = useState<string>('')
	const [circSupply, setCircSupply] = useState<string>('')
	const [totalSupply, setTotalSupply] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const [price, setPrice] = useState<string>('')
	const [totalVolume, setTotalVolume] = useState<string>('')
	const [ath, setAth] = useState<string>('')
	const [atl, setAtl] = useState<string>('')

	const [websiteLink, setWebsiteLink] = useState<string>('')
	const [blockExplorerLink, setBlockExplorerLink] = useState<string>('')
	const [coingeckoLink, setCoingeckoLink] = useState<string>('')
	const [twitterLink, setTwitterLink] = useState<string>('')
	const [telegramLink, setTelegramLink] = useState<string>('')

	useEffect(() => {
		setCoinData()
	}, [quote])

	function searchCallback(): void {
		setCoinData()
	}

	async function setCoinData() {
		getStoredCoins().then(async (coinIds) => {
			if (coinIds.length > 0) {
				setApiStatus(`Fetching ${coinIds[0].symbol.toUpperCase()}`)

				await fetchCoinInfo(coinIds[0].id).then(
					(coinInfo: AdvancedCoinInfo) => {
						if (coinInfo.id != undefined && coinInfo.id != '') {
							console.log(coinInfo)

							setId(coinInfo.id)
							setName(coinInfo.name)
							setIcon(coinInfo.image.large)
							setSymbol(coinInfo.symbol)
							setDescription(coinInfo.description.en)

							setMarketCapRank(amountFormatter(coinInfo.market_cap_rank))
							setCircSupply(
								amountFormatter(coinInfo.market_data.circulating_supply)
							)
							setTotalSupply(amountFormatter(coinInfo.market_data.total_supply))

							if (quote === 'usd') {
								setPrice(
									`$${amountFormatter(coinInfo.market_data.current_price.usd)}`
								)
								setMarketCap(
									`$${amountFormatter(coinInfo.market_data.market_cap.usd)}`
								)
								setTotalVolume(
									`$${amountFormatter(coinInfo.market_data.total_volume.usd)}`
								)
								setAth(`$${amountFormatter(coinInfo.market_data.ath.usd)}`)
								setAtl(`$${amountFormatter(coinInfo.market_data.atl.usd)}`)
							} else {
								setPrice(
									`₿${amountFormatter(coinInfo.market_data.current_price.btc)}`
								)
								setMarketCap(
									`₿${amountFormatter(coinInfo.market_data.market_cap.btc)}`
								)
								setTotalVolume(
									`₿${amountFormatter(coinInfo.market_data.total_volume.btc)}`
								)
								setAth(`₿${amountFormatter(coinInfo.market_data.ath.btc)}`)
								setAtl(`₿${amountFormatter(coinInfo.market_data.atl.btc)}`)
							}

							setWebsiteLink(coinInfo.links.homepage[0])
							setBlockExplorerLink(coinInfo.links.blockchain_site[0])
							setCoingeckoLink(
								`https://www.coingecko.com/en/coins/${coinInfo.id}`
							)
							setTwitterLink(coinInfo.links.twitter_screen_name)
							setTelegramLink(coinInfo.links.telegram_channel_identifier)

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
			<HeaderField coinName={name} coinIcon={icon} />
			<InteractionField
				searchCallback={searchCallback}
				activeCoinTicker={symbol}
				setQuote={setQuote}
			/>
			{apiStatus !== `Fetch success` ? (
				<InfoField attributeName={`${apiStatus}`} attributeValue={' '} />
			) : (
				<InfoField
					attributeName={`${symbol.toUpperCase()} price`}
					attributeValue={`${price}`}
				/>
			)}

			{apiStatus !== 'Search ticker' && (
				<>
					<InfoField
						attributeName="market Cap (rank)"
						attributeValue={`${marketCap} (${marketCapRank})`}
					/>
					<InfoField
						attributeName="total volume (24h)"
						attributeValue={`${totalVolume}`}
					/>
					<InfoField attributeName="all-time high" attributeValue={`${ath}`} />
					<InfoField attributeName="all-time low" attributeValue={`${atl}`} />
					<InfoField
						attributeName="Circ. Supply (total)"
						attributeValue={`${circSupply} (${totalSupply})`}
					/>
					<DescriptionField coinDescription={description} />
					<PriceGraphField coinId={id} quote={quote} />
					<LinksField
						blockExplorerLink={blockExplorerLink}
						coingeckoLink={coingeckoLink}
						twitterLink={twitterLink}
						telegramLink={telegramLink}
						websiteLink={websiteLink}
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
