import './SearchField.css'
import React, { useState, useEffect } from 'react'

import { getStoredCoinList, setStoredCoinIds } from '../../utils/storage'
import { SimpleCoinInfo } from '../../utils/api'

interface SearchFieldProps {
	parentCallback: any
}

const SearchField: React.FC<SearchFieldProps> = ({ parentCallback }) => {
	const [searchInput, setSearchInput] = useState<string>('')
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

	async function handleCoinButtonClick(coinId: string) {
		console.log('handleCoinButtonClick: ', coinId)
		await setStoredCoinIds([coinId])
		await parentCallback()
	}

	return (
		<div>
			<div>
				<input
					type="text"
					id="searchInput"
					placeholder="Search Ticker"
					onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
				></input>

				<div>
					{coinSuggestions.map((coin, index) => (
						<div key={index}>
							<button onClick={() => handleCoinButtonClick(`${coin.id}`)}>
								{coin.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default SearchField
