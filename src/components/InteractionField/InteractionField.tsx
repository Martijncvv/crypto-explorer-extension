import './InteractionField.css'
import React, { useState, useEffect } from 'react'

import Switch from '@mui/material/Switch'

import { getStoredCoinList, setStoredCoins } from '../../utils/storage'
import { SimpleCoinInfo } from '../../utils/api'

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

	useEffect(() => {
		setSearchInput(activeCoinTicker)
	}, [activeCoinTicker])

	useEffect(() => {
		if (searchInput.length != 0) {
			getSearchData()
		}
	}, [searchInput])

	async function getSearchData() {
		const coinList: SimpleCoinInfo[] = await getStoredCoinList()
		await setCoinSuggestions(
			coinList.filter(
				(coin) =>
					(coin.symbol === searchInput && !coin.id.includes('wormhole')) ||
					coin.name.toLowerCase() === searchInput
			)
		)
	}

	async function handleCoinButtonClick(
		id: string,
		symbol: string,
		name: string
	) {
		setActiveCoinId(id)
		await setStoredCoins([{ id, symbol, name }])
		await searchCallback()
	}

	async function handleSearchEnterKeyDown(event) {
		if (event.key === 'Enter') {
			await getSearchData()
			await setStoredCoins(coinSuggestions)
			console.log(coinSuggestions)
			coinSuggestions.length && setActiveCoinId(coinSuggestions[0].id)
			searchCallback()
		}
	}

	const handleQuoteChange = () => {
		if (!checked) {
			setQuote('btc')
		} else {
			setQuote('usd')
		}
		setChecked(!checked)
	}

	return (
		<div id="interaction-field">
			<div id="input-field">
				<input
					id="search-input"
					placeholder="Search ticker"
					value={searchInput}
					onKeyDown={(event) => handleSearchEnterKeyDown(event)}
					onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
					onClick={() => setSearchInput('')}
				/>

				<div id="quote-switch">
					$
					<Switch
						color="warning"
						checked={checked}
						onChange={handleQuoteChange}
					/>
					₿
				</div>
			</div>

			{/* USER FEEDBACK; TICKER NOT AVAILABLE */}
			<div id="nav-bar">
				<button className="nav-item">
					{coinSuggestions.length === 0 &&
						searchInput != '' &&
						(searchInput.length <= 6 ? (
							<>Ticker not Available</>
						) : (
							/* USER FEEDBACK; SEARCH SUGGESTION */
							<>Try searching a ticker, e.g. ETH</>
						))}
				</button>
			</div>

			{/* SEARCH RESULTS; NAVBAR ITEMS */}
			{(coinSuggestions.length > 1 ||
				(coinSuggestions.length > 0 &&
					coinSuggestions[0].symbol != activeCoinTicker)) && (
				<div id="nav-bar">
					{coinSuggestions.map((coin, index) => (
						<button
							className={
								activeCoinId === coin.id || (!activeCoinId && index == 0)
									? 'nav-item active-nav-item'
									: 'nav-item'
							}
							key={index}
							onClick={() =>
								handleCoinButtonClick(coin.id, coin.symbol, coin.name)
							}
						>
							{coin.name}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default InteractionField
