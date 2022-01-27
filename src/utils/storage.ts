import { CoinGeckoCoinList, SimpleCoinInfo } from './api'

export interface LocalStorage {
	coins?: CoinGeckoCoinList
	coinIds?: SimpleCoinInfo[]
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCoinList(coins: CoinGeckoCoinList): Promise<void> {
	const vals: LocalStorage = {
		coins,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoinList(): Promise<CoinGeckoCoinList> {
	const keys: LocalStorageKeys[] = ['coins']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coins ?? [])
		})
	})
}

export function setStoredCoins(coinIds: SimpleCoinInfo[]): Promise<void> {
	const vals: LocalStorage = {
		coinIds,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoins(): Promise<SimpleCoinInfo[]> {
	const keys: LocalStorageKeys[] = ['coinIds']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coinIds ?? [])
		})
	})
}
