import { fetchCoinsList } from '../utils/api'
import { setStoredCoins } from '../utils/storage'

console.log('BACKGROUND script is running')

chrome.runtime.onStartup.addListener(() => {
	fetchCoinsList().then((data) => {
		setStoredCoins(data)
		console.log('Coins fetched')
		console.log(data)
	})
})
