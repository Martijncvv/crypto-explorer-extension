import './SearchField.css'
import React, { useState, useEffect } from 'react'

import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

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
			setCoinSuggestions(coinList.filter((coin) => coin.symbol === searchInput))
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

	const handleQuoteChange = () => {
		if (!checked) {
			setQuote('btc')
		} else {
			setQuote('usd')
		}
		setChecked(!checked)
	}
	const label = { inputProps: { 'aria-label': 'Switch demo' } }

	return (
		<div id="search-field">
			<div id="input-field">
				<input
					id="search-input"
					placeholder="Search ticker"
					value={searchInput}
					onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
				/>

				<div id="quote-switch">
					$
					<Switch
						color="warning"
						checked={checked}
						onChange={handleQuoteChange}
						size="small"
					/>
					₿
				</div>
			</div>

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
		</div>
	)
}

export default SearchField
