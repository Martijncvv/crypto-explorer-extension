import { getStoredCoinList, setStoredCoins } from '../utils/storage'
import { SimpleCoinInfo } from '../utils/api'

console.log('CONTENTSCRIPT is running')

document.addEventListener('selectionchange', getSelection)

async function getSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!@%^&)*-_=+(.,;:><"']/g, '')
		.toLowerCase()

	if (selectedTicker !== '' && selectedTicker.length < 6) {
		console.log(`Potential ticker selected: ${selectedTicker}`)

		const coinList: SimpleCoinInfo[] = await getStoredCoinList()

		const filteredCoinTickers: SimpleCoinInfo[] = coinList.filter(
			(coin) => coin.symbol === selectedTicker
		)

		let coinIds: SimpleCoinInfo[] = []
		filteredCoinTickers.forEach((coin: SimpleCoinInfo) => {
			coinIds.push({
				id: coin.id,
				symbol: coin.symbol,
				name: coin.name,
			})
		})

		setStoredCoins(coinIds)
	}
}
