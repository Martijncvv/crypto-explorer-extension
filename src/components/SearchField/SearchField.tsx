import './SearchField.css'
import React, { useState, useEffect } from 'react'

import Switch from '@mui/material/Switch'

import { getStoredCoinList, setStoredCoins } from '../../utils/storage'
import { SimpleCoinInfo } from '../../utils/api'

interface SearchFieldProps {
	searchCallback: Function
	setQuote: Function
	activeCoinTicker: string
}

const SearchField: React.FC<SearchFieldProps> = ({
	searchCallback,
	setQuote,
	activeCoinTicker,
}) => {
	const [searchInput, setSearchInput] = useState<string>('')
	const [searchInputAvailable, setSearchInputAvailable] = useState<boolean>(
		false
	)
	const [activeCoinId, setActiveCoinId] = useState<string>('')
	const [checked, setChecked] = React.useState(false)
	let [coinSuggestions, setCoinSuggestions] = useState<SimpleCoinInfo[]>([])

	useEffect(() => {
		setSearchInput(activeCoinTicker)
	}, [activeCoinTicker])

	useEffect(() => {
		getSearchData()
	}, [searchInput])

	async function getSearchData() {
		const coinList: SimpleCoinInfo[] = await getStoredCoinList()

		if (searchInput.length != 0) {
			await setCoinSuggestions(
				coinList.filter((coin) => coin.symbol === searchInput)
			)
			if (coinSuggestions.length > 0) {
				console.log('found')
				setSearchInputAvailable(true)
			} else {
				console.log('not found')
				setSearchInputAvailable(false)
			}
		}
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

	async function handleKeyDown(event) {
		if (event.key === 'Enter') {
			await getSearchData()
			await setStoredCoins(coinSuggestions)
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
		<div id="search-field">
			<div id="input-field">
				<input
					id="search-input"
					placeholder="Search ticker"
					value={searchInput}
					onKeyDown={(event) => handleKeyDown(event)}
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
			{coinSuggestions.length > 1 && (
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

export default SearchField
