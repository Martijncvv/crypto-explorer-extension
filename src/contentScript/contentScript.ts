import { getStoredCoins, setStoredTicker } from '../utils/storage'

console.log('CONTENTSCRIPT is running')

window.addEventListener('mouseup', getSelection)

function getSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.toLowerCase()
	console.log('mouseup eventListener')

	getStoredCoins().then((coinList) => {
		if (coinList.some((coin) => coin.symbol === selectedTicker)) {
			setStoredTicker(selectedTicker)
			console.log(`${selectedTicker} FOUND`)
		} else {
			console.log(`${selectedTicker} NA`)
		}
	})
}
