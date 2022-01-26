import { CoinGeckoCoinList, AdvancedCoinInfo } from './api'

export interface LocalStorage {
	coins?: CoinGeckoCoinList
	coinIds?: string[]
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

export function setStoredCoinIds(coinIds: string[]): Promise<void> {
	const vals: LocalStorage = {
		coinIds,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoinIds(): Promise<string[]> {
	const keys: LocalStorageKeys[] = ['coinIds']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coinIds ?? [])
		})
	})
}
