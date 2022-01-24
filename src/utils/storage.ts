import { CoinGeckoCoinList } from './api'

export interface LocalStorage {
	coins?: CoinGeckoCoinList
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
