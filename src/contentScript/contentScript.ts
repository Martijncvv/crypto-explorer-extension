import { getStoredCoinList, setStoredCoins } from '../utils/storage'
import { SimpleCoinInfo } from '../utils/api'

console.log('CONTENTSCRIPT is running')

window.addEventListener('mouseup', getSelection)

async function getSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!.,:"']/g, '')
		.toLowerCase()

	if (selectedTicker !== '' && selectedTicker.length < 6) {
		console.log('mouseup eventListener')

		const coinList: SimpleCoinInfo[] = await getStoredCoinList()

		const filteredCoinTickers: SimpleCoinInfo[] = coinList.filter(
			(coin) => coin.symbol === selectedTicker
		)

		console.log('CS: selectedTicker: ', selectedTicker)
		console.log('CS: filterCoinTickers: ', filteredCoinTickers)

		let coinIds: SimpleCoinInfo[] = []
		filteredCoinTickers.forEach((coin: SimpleCoinInfo) => {
			coinIds.push({
				id: coin.id,
				symbol: coin.symbol,
				name: coin.name,
			})
		})
		console.log('CS: coinIds: ', coinIds)

		setStoredCoins(coinIds)
	}
}
