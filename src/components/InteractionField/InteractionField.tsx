import './InteractionField.css'
import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import WhatshotIcon from '@mui/icons-material/Whatshot'

import { getStoredCoinList, setStoredCoins } from '../../utils/storage'
import {
	fetchTrendingCoins,
	SimpleCoinInfo,
	TrendingCoinList,
} from '../../utils/api'

interface InteractionFieldProps {
	searchCallback: Function
	setQuote: Function
	activeCoinTicker: string
}

const InteractionField: React.FC<InteractionFieldProps> = ({
	searchCallback,
	setQuote,
	activeCoinTicker,
}) => {
	const [searchInput, setSearchInput] = useState<string>('')
	const [activeCoinId, setActiveCoinId] = useState<string>('')
	const [checked, setChecked] = React.useState(false)
	const [coinSuggestions, setCoinSuggestions] = useState<SimpleCoinInfo[]>([])
	const [trendingCoinButtonChecked, setTrendingCoinButtonChecked] = useState<
		boolean
	>(false)

	useEffect(() => {
		setSearchInput(activeCoinTicker)
	}, [activeCoinTicker])

	useEffect(() => {
		if (searchInput.length != 0) {
			getSearchData()
		}
	}, [searchInput])

	async function getSearchData() {
		if (!trendingCoinButtonChecked) {
			const coinList: SimpleCoinInfo[] = await getStoredCoinList()
			await setCoinSuggestions(
				coinList.filter(
					(coin) =>
						(coin.symbol === searchInput && !coin.id.includes('wormhole')) ||
						coin.name.toLowerCase() === searchInput
				)
			)
		}
	}

	async function handleNavbarItemClick(
		id: string,
		symbol: string,
		name: string
	) {
		setActiveCoinId(id)
		await setStoredCoins([{ id, symbol, name }])
		await searchCallback()
	}

	async function handleSearchInputKeyDownEvent(event) {
		setTrendingCoinButtonChecked(false)
		console.log(trendingCoinButtonChecked)
		if (event.key === 'Enter') {
			await getSearchData()
			await setStoredCoins(coinSuggestions)
			console.log(coinSuggestions)
			coinSuggestions.length && setActiveCoinId(coinSuggestions[0].id)
			searchCallback()
		}
	}

	const handleQuoteChange = () => {
		checked ? setQuote('usd') : setQuote('btc')
		setChecked(!checked)
	}

	function handleNavbarItemClasses(
		activeCoinId: string,
		coin: SimpleCoinInfo,
		index: number
	): string {
		return activeCoinId === coin.id || (!activeCoinId && index === 0)
			? 'nav-item active-nav-item'
			: 'nav-item'
	}

	function renderNavbarItems() {
		if (
			coinSuggestions.length > 1 ||
			(coinSuggestions.length === 1 &&
				coinSuggestions[0].symbol !== activeCoinTicker)
		)
			return (
				<div id="nav-bar">
					{coinSuggestions.map((coin, index) => (
						<button
							key={index}
							className={handleNavbarItemClasses(activeCoinId, coin, index)}
							onClick={() =>
								handleNavbarItemClick(coin.id, coin.symbol, coin.name)
							}
						>
							{coin.name}
						</button>
					))}
				</div>
			)
	}

	async function renderTrendingCoins() {
		if (!trendingCoinButtonChecked) {
			await getTrendingCoins()
		}
		setTrendingCoinButtonChecked(!trendingCoinButtonChecked)
	}

	async function getTrendingCoins() {
		const trendingCoins: TrendingCoinList = await fetchTrendingCoins()

		let trendingCoinInfo = []
		await trendingCoins.coins.forEach((coin) => {
			trendingCoinInfo.push({
				id: coin.item.id,
				symbol: coin.item.symbol,
				name: coin.item.name,
			})
		})
		setCoinSuggestions(trendingCoinInfo)
		console.log(coinSuggestions)
	}

	function renderNavbarFeedback() {
		/* TICKER NOT AVAILABLE */
		if (coinSuggestions.length === 0 && searchInput != '') {
			if (searchInput.length <= 6) {
				return (
					<div id="nav-bar">
						<button className="nav-item">Ticker not Available</button>
					</div>
				)
			} else
			/* SEARCH SUGGESTION */
				return (
					<div id="nav-bar">
						<button className="nav-item">
							Try searching a ticker, e.g. ETH
						</button>
					</div>
				)
		}
	}

	return (
		<div id="interaction-field">
			<div id="input-field">
				<div id="left-input-field">
					<input
						id="search-input"
						placeholder="Search ticker"
						autoFocus={true}
						value={searchInput}
						onKeyDown={(event) => handleSearchInputKeyDownEvent(event)}
						onChange={(event) =>
							setSearchInput(event.target.value.toLowerCase())
						}
						onClick={() => setSearchInput('')}
					/>
				</div>
				<div id="quote-switch-box">
					$
					<Switch
						color="warning"
						checked={checked}
						onChange={handleQuoteChange}
					/>
					₿
				</div>
				<div id="trending-coins-button">
					<IconButton
						aria-label="Search hot coins"
						onClick={() => renderTrendingCoins()}
						color={trendingCoinButtonChecked ? 'warning' : undefined}
					>
						{/* <WhatshotOutlinedIcon /> */}
						<WhatshotIcon />
					</IconButton>
				</div>
			</div>

			{renderNavbarFeedback()}

			{renderNavbarItems()}
		</div>
	)
}

export default InteractionField
