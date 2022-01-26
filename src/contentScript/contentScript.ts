import { getStoredCoinList, setStoredCoinIds } from '../utils/storage'
import { SimpleCoinInfo } from '../utils/api'

console.log('CONTENTSCRIPT is running')

window.addEventListener('mouseup', getSelection)

async function getSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!.,:]/g, '')
		.toLowerCase()

	if (selectedTicker === '' || selectedTicker.length > 6) {
		return
	}

	console.log('mouseup eventListener')

	const coinList: SimpleCoinInfo[] = await getStoredCoinList()

	const filteredCoinTickers: SimpleCoinInfo[] = await coinList.filter(
		(coin) => coin.symbol === selectedTicker
	)

	console.log('CS: selectedTicker: ', selectedTicker)
	console.log('CS: filterCoinTickers: ', filteredCoinTickers)

	let coinIds: string[] = []
	filteredCoinTickers.forEach((coin) => {
		coinIds.push(coin.id)
	})
	console.log('CS: coinIds: ', coinIds)

	await setStoredCoinIds(coinIds)
}
