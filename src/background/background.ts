import { fetchCoinsList } from '../utils/api'
import { setStoredCoins } from '../utils/storage'

console.log('BACKGROUND CONSOLE LOG')

chrome.runtime.onInstalled.addListener(() => {
	fetchCoinsList().then((data) => {
		setStoredCoins(data)
		console.log('Coins fetched')
		console.log(data)
	})
})
