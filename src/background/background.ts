import { fetchCoinsList } from '../utils/api'
import { setStoredCoinList } from '../utils/storage'

console.log('BACKGROUND script is running')

chrome.runtime.onInstalled.addListener(async () => {
	for (const cs of chrome.runtime.getManifest().content_scripts) {
		for (const tab of await chrome.tabs.query({ url: cs.matches })) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: cs.js,
			})
		}
	}
	// setStoredCoinIds(['bitcoin'])
})

fetchCoinsList().then((data) => {
	setStoredCoinList(data)
	console.log('Coins fetched')
})
