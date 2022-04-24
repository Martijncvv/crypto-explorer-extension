import { getStoredCoinList, setStoredCoins } from '../utils/storage'
import { SimpleCoinInfo } from '../utils/api'

console.log('CONTENTSCRIPT is running')

document.addEventListener('selectionchange', getSelection)

async function getSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!.,:"']/g, '')
		.toLowerCase()

	if (selectedTicker !== '' && selectedTicker.length < 7) {
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

// window.addEventListener('load', main)
// function main() {
// 	let followedBy = document.body.textContent.search('Followed by ')
// 	// let followedBy = window.find('Followed by ')
// 	let followers = document.body.textContent.search('Followers')
// 	// let followers = window.find('Followers')
// 	let following = document.body.textContent.search('Following')
// 	// let following = window.find('Following')

// 	console.log('followedBy', followedBy)
// 	console.log('followers', followers)
// 	console.log('following', following)

// let followedByelement = document.getElementsByClassName(
// 	'css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0'
// )
// console.log("followedByelement", followedByelement)

// let followedByelement = document.getElementsByTagName('div')
// for (let element of followedByelement) {
// 	console.log('element.textContent', element.textContent)
// 	if (element.textContent.includes("Followed by ") {
// 		element.style['background-color'] = '#FF00FF'
// 	}
// 	else (
// 		element.style['background-color'] = '#FFFF00'
// 	)
// }

// let elements = document.querySelectorAll('div')
// for (let element of elements) {
// 	let copy = element
// 	while (copy.firstChild) {
// 		copy.removeChild(copy.lastChild)
// 	}
// 	if (copy.textContent.includes('Followed by ')) {
// 		console.log('element', copy)
// 	}
// 	// console.log('', element)
// }
// }

// let followedByelement = document.getElementsByClassName(
// 	'css-901oao r-14j79pv r-1wbh5a2 r-37j5jr r-n6v787 r-16dba41 r-1cwl3u0 r-19u6a5r r-bcqeeo r-qvutc0'
// )

// let elements = document.querySelectorAll('div')
// // let elements = document.getElementsByTagName('a')
// // let paragraphs = document.querySelectorAll('div.css-901oao')
// // let paragraphs = document.getElementsByTagName('div')
// // let paragraphs = document.getElementsByClassName(
// // 	'css-901oao r-14j79pv r-1wbh5a2 r-37j5jr r-n6v787 r-16dba41'
// // )
// // let elements = document.body.innerHTML
// // let elements = document.getElementsByClassName(
// // 	'css-901oao r-14j79pv r-1wbh5a2 r-37j5jr r-n6v787 r-16dba41 r-1cwl3u0 r-19u6a5r r-bcqeeo r-qvutc0'
// // )

// for (let element of elements) {
// 	console.log(element)
// 	if (element.innerHTML === 'Followed by ') {
// 		element.style['background-color'] = '#FF00FF'
// 	}
// }

// document.body.innerHTML = document.body.innerHTML.replace(
// 	new RegExp('Followed by ', 'g'),
// 	'nobody'
// )
