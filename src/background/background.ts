import { fetchCoinsList } from '../utils/api'
import { setStoredCoinList, setStoredCoins } from '../utils/storage'

console.log('BACKGROUND script is running')

fetchCoinsList().then((data) => {
	setStoredCoinList(data)
	console.log('Coins fetched')
})

setStoredCoins([{ id: 'bitcoin', symbol: 'btc', name: 'bitcoin' }])
