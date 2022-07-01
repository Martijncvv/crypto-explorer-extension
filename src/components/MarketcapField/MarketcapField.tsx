import './MarketcapField.css'
import React, { useState, useEffect } from 'react'
import { getStoredCoinList } from '../../utils/storage'
import { amountFormatter } from '../../utils/amountFormatter'
import { fetchCoinInfo } from '../../utils/api'

import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import IconButton from '@mui/material/IconButton'
import { ISimpleCoinInfo } from '../../models/ICoinInfo'

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
	const [coinOptions, setCoinOptions] = useState<ISimpleCoinInfo[]>([
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
		setDisplayCompareMCField(false)
	}, [coinSymbol])

	useEffect(() => {
		if (symbolInput.length != 0) {
			getCoinOptions()
		}
	}, [symbolInput])

	useEffect(() => {
		getCoinData('ethereum')
	}, [displayCompareMCField])

	async function handleInputKeyDownEvent(event) {
		if (event.key === 'Enter') {
			await getCoinOptions()
			getCoinData(coinOptions[0].id)
		}
	}

	async function getCoinOptions() {
		const coinList: ISimpleCoinInfo[] = await getStoredCoinList()
		await setCoinOptions(
			coinList.filter(
				(coin) => coin.symbol === symbolInput && !coin.id.includes('wormhole')
			)
		)
		return true
	}

	async function handleCoinItemClick(id: string, symbol: string, name: string) {
		await setActiveCoinSymbol(id)

		getCoinData(id)
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

	function renderCoinOptionItems() {
		if (coinOptions.length > 1) {
			return (
				<div id="coin-options-bar">
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

	function handleOptionItemClasses(
		activeCoinId: string,
		coin: ISimpleCoinInfo,
		index: number
	): string {
		return activeCoinId === coin.id || (!activeCoinId && index === 0)
			? 'coin-options-item active-coin-options-item'
			: 'coin-options-item'
	}

	async function handleDisplayCompareMCFieldButton() {
		setDisplayCompareMCField(!displayCompareMCField)
	}

	return (
		<div>
			<div className="marketcap-field">
				<p className="marketcap-field-name">
					market Cap (rank){' '}
					<IconButton
						aria-label="Compare coin Mcs"
						onClick={() => handleDisplayCompareMCFieldButton()}
						color={displayCompareMCField ? 'warning' : undefined}
						size="small"
					>
						<CompareArrowsIcon fontSize="small" />
					</IconButton>
				</p>

				<p className="marketcap-field-value">{`${coinMarketcap} (#${coinMarketcapRank})`}</p>
			</div>
			{displayCompareMCField && (
				<>
					<div id="compare-mc-field">
						<div id="compare-mc-info">
							<p>
								<span id="ticker"> {coinSymbol} </span> price with the MC of
							</p>
							<p>
								<span id="active-coin-name"> {activeCoinName} </span> ($
								{amountFormatter(searchedCoinMarketCap)})
							</p>
						</div>

						<div id="compare-mc-value">
							<input
								id="compare-mc-input"
								value={symbolInput.toUpperCase()}
								placeholder="Ticker"
								autoFocus={true}
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
