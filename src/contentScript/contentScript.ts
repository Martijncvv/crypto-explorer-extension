import { getStoredCoins, setStoredCoinsInfo } from '../utils/storage'
import { fetchCoinInfo, AdvancedCoinInfo, SimpleCoinInfo } from '../utils/api'

console.log('CONTENTSCRIPT is running')

window.addEventListener('mouseup', getSelection)

async function getSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!.,:]/g, '')
		.toLowerCase()

	if (selectedTicker === '') {
		return
	}

	console.log('mouseup eventListener')

	const coinList = await getStoredCoins()
	console.log('CoinList: ', coinList)

	const filteredCoins: SimpleCoinInfo[] = await coinList.filter(
		(coin) => coin.symbol === selectedTicker
	)
	console.log('FilteredCoins: ', filteredCoins)
	console.log('selectedTicker: ', selectedTicker)

	let coinsInfo: AdvancedCoinInfo[] = []

	await Promise.all(
		filteredCoins.map(async (coin) => {
			let coinInfo: AdvancedCoinInfo = await fetchCoinInfo(coin.id)
			coinsInfo.push(coinInfo)
		})
	)
	await console.log('coinsInfo1: ', coinsInfo)
	// await coinsInfo.sort((a, b) => {
	// 	if (a.coingecko_rank === 0 || a.coingecko_rank === null) {
	// 		a.coingecko_rank = 9999
	// 	}
	// 	if (b.coingecko_rank === 0 || b.coingecko_rank === null) {
	// 		b.coingecko_rank = 9999
	// 	}

	// 	return a.coingecko_rank - b.coingecko_rank
	// })

	// await console.log('coinsInfo2: ', coinsInfo)
	await setStoredCoinsInfo(coinsInfo)
}
