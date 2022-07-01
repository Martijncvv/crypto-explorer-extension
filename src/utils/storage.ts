import { ICoinGeckoCoinList, ISimpleCoinInfo } from '../models/ICoinInfo'

export interface LocalStorage {
	coins?: ICoinGeckoCoinList
	coinIds?: ISimpleCoinInfo[]
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCoinList(coins: ICoinGeckoCoinList): Promise<void> {
	const vals: LocalStorage = {
		coins,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoinList(): Promise<ICoinGeckoCoinList> {
	const keys: LocalStorageKeys[] = ['coins']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coins ?? [])
		})
	})
}

export function setStoredCoins(coinIds: ISimpleCoinInfo[]): Promise<void> {
	const vals: LocalStorage = {
		coinIds,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoins(): Promise<ISimpleCoinInfo[]> {
	const keys: LocalStorageKeys[] = ['coinIds']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coinIds ?? [])
		})
	})
}
