import './MarketcapField.css'
import React, { useState, useEffect } from 'react'
import { getStoredCoinList } from '../../utils/storage'
import { amountFormatter } from '../../utils/amountFormatter'
import { SimpleCoinInfo, fetchCoinInfo } from '../../utils/api'

import CompareIcon from '@mui/icons-material/Compare'
import IconButton from '@mui/material/IconButton'

interface MarketcapFieldProps {
	coinSymbol: string
	coinMarketcap: string
	coinMarketcapRank: string
	coinCircSupply: number
}

const MarketcapField: React.FC<MarketcapFieldProps> = ({
	coinSymbol,
	coinMarketcap,
	coinMarketcapRank,
	coinCircSupply,
}) => {
	const [symbolInput, setSymbolInput] = useState<string>('ETH')
	const [coinOptions, setCoinOptions] = useState<SimpleCoinInfo[]>([
		{ id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
	])
	const [activeCoinSymbol, setActiveCoinSymbol] = useState<string>('ETH')
	const [activeCoinName, setActiveCoinName] = useState<string>('Ethereum')
	const [searchedCoinMarketCap, setSearchedCoinMarketCap] = useState<number>(0)
	const [newCoinPrice, setnewCoinPrice] = useState<string>('')
	const [displayCompareMCField, setDisplayCompareMCField] = useState<boolean>(
		false
	)

	useEffect(() => {
		if (symbolInput.length != 0) {
			getCoinOptions()
		}
	}, [symbolInput])
	useEffect(() => {}, [displayCompareMCField])

	function handleInputKeyDownEvent(event) {
		if (event.key === 'Enter') {
			console.log('ENTER KEYDOWN')
			getCoinOptions()
		}
	}

	async function getCoinOptions() {
		const coinList: SimpleCoinInfo[] = await getStoredCoinList()
		await setCoinOptions(
			coinList.filter(
				(coin) => coin.symbol === symbolInput && !coin.id.includes('wormhole')
			)
		)
	}

	async function handleCoinItemClick(id: string, symbol: string, name: string) {
		await setActiveCoinSymbol(id)

		getCoinData(id)
	}

	function renderCoinOptionItems() {
		if (coinOptions.length > 1) {
			return (
				<div id="options-bar">
					{coinOptions.map((coin, index) => (
						<button
							key={index}
							className={handleOptionItemClasses(activeCoinSymbol, coin, index)}
							onClick={() =>
								handleCoinItemClick(coin.id, coin.symbol, coin.name)
							}
						>
							{coin.name}
						</button>
					))}
				</div>
			)
		} else if (coinOptions.length > 0) {
			getCoinData(coinOptions[0].id)
		}
	}

	async function getCoinData(coinId: string) {
		let coinInfo = await fetchCoinInfo(coinId)
		setActiveCoinName(coinInfo.name)
		setSearchedCoinMarketCap(coinInfo.market_data.market_cap.usd)
		calculatePrice()
	}

	async function calculatePrice() {
		let newPrice = searchedCoinMarketCap / coinCircSupply

		setnewCoinPrice(amountFormatter(newPrice))
	}

	function handleOptionItemClasses(
		activeCoinId: string,
		coin: SimpleCoinInfo,
		index: number
	): string {
		return activeCoinId === coin.id || (!activeCoinId && index === 0)
			? 'options-item active-options-item'
			: 'options-item'
	}

	async function handleDisplayCompareMCFieldButton() {
		setDisplayCompareMCField(!displayCompareMCField)
	}

	return (
		<div>
			<div className="marketcap-field">
				<p className="attribute-name">
					market Cap (rank){' '}
					<IconButton
						aria-label="Compare coin Mcs"
						onClick={() => handleDisplayCompareMCFieldButton()}
						color={displayCompareMCField ? 'warning' : undefined}
						size="small"
					>
						<CompareIcon fontSize="small" />
					</IconButton>
				</p>

				<p className="attribute-value">{`${coinMarketcap} (${coinMarketcapRank})`}</p>
			</div>
			{displayCompareMCField && (
				<>
					<div id="compare-mc-field">
						<div id="compare-mc-info">
							<p>
								<span id="ticker"> {coinSymbol} </span> price with the MC of
							</p>
							<p>
								{activeCoinName} (${amountFormatter(searchedCoinMarketCap)})
							</p>
						</div>

						<div id="compare-mc-value">
							<input
								id="search-mc-input"
								value={symbolInput.toUpperCase()}
								placeholder="Ticker"
								autoComplete="off"
								onKeyDown={(event) => handleInputKeyDownEvent(event)}
								onChange={(event) =>
									setSymbolInput(event.target.value.toLowerCase())
								}
								onClick={() => setSymbolInput('')}
							/>
							<p>${newCoinPrice}</p>
						</div>
					</div>
					<div>{renderCoinOptionItems()}</div>
				</>
			)}
		</div>
	)
}

export default MarketcapField
