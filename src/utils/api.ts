const COINGECKO_COINS_LIST_API_KEY =
	'https://api.coingecko.com/api/v3/coins/list'

export interface SimpleCoinInfo {
	id: string
	symbol: string
	name: string
}
export type CoinGeckoCoinList = SimpleCoinInfo[]

export async function fetchCoinsList(): Promise<CoinGeckoCoinList> {
	const res = await fetch(COINGECKO_COINS_LIST_API_KEY)

	const data: CoinGeckoCoinList = await res.json()
	return data
}
