import { CoinGeckoCoinList } from './api'

export interface LocalStorage {
	coins?: CoinGeckoCoinList
	ticker?: string
	tickerInfo?: AdvancedCoinInfo
}

export interface AdvancedCoinInfo {
	symbol: string
	name: string
	image: string
	description: string
	currentPriceUSD: number
	totalVolumeUSD: number
	athUSD: number
	atlUSD: number
	marketCapUSD: number
	currentPriceBTC: number
	totalVolumeBTC: number
	athBTC: number
	atlBTC: number
	marketCapBTC: number
	totalSupply: number
	circSupply: number
	website: string
	coingecko: string
	twitter: string
	telegram: string
	blockExplorer: string
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCoins(coins: CoinGeckoCoinList): Promise<void> {
	const vals: LocalStorage = {
		coins,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoins(): Promise<CoinGeckoCoinList> {
	const keys: LocalStorageKeys[] = ['coins']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coins ?? [])
		})
	})
}

export function setStoredTicker(ticker: string): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.set({ ticker: ticker }, function() {
			console.log('Value is set to ' + ticker)
			resolve()
		})
	})
}

export function getStoredTicker(): Promise<string> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['ticker'], function(result) {
			console.log('Value currently is ' + result.ticker)
			resolve(result.ticker ?? '')
		})
	})
}
