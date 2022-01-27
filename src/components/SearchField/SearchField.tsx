import './SearchField.css'
import React, { useState, useEffect } from 'react'

import { getStoredCoinList, setStoredCoins } from '../../utils/storage'
import { SimpleCoinInfo } from '../../utils/api'

interface SearchFieldProps {
	searchCallback: Function
	setQuote: Function
	activeCoin: string
}

const SearchField: React.FC<SearchFieldProps> = ({
	searchCallback,
	setQuote,
	activeCoin,
}) => {
	const [searchInput, setSearchInput] = useState<string>('')
	const [checked, setChecked] = React.useState(true)
	let [coinSuggestions, setCoinSuggestions] = useState<SimpleCoinInfo[]>([])

	useEffect(() => {
		getSearchData()
	}, [searchInput])

	async function getSearchData() {
		const coinList: SimpleCoinInfo[] = await getStoredCoinList()

		if (searchInput.length != 0) {
			setCoinSuggestions(coinList.filter((coin) => coin.symbol === searchInput))
		}
	}

	const handleChange = () => {
		if (!checked) {
			setQuote('usd')
		} else {
			setQuote('btc')
		}
		setChecked(!checked)
	}

	async function handleCoinButtonClick(
		id: string,
		symbol: string,
		name: string
	) {
		console.log('handleCoinButtonClick: ', { id, symbol, name })
		await setStoredCoins([{ id, symbol, name }])
		await searchCallback()
	}

	return (
		<div>
			<div id="navbar">
				{coinSuggestions.map(
					(coin, index) =>
						activeCoin != coin.id && (
							<button
								className="navItem"
								key={index}
								onClick={() =>
									handleCoinButtonClick(coin.id, coin.symbol, coin.name)
								}
							>
								{coin.name}
							</button>
						)
				)}
			</div>

			<input
				type="text"
				id="searchInput"
				placeholder="Search Ticker"
				onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
			></input>

			<input type="checkbox" checked={checked} onChange={handleChange} />
		</div>
	)
}

export default SearchField
