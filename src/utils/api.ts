const COINGECKO_COINS_LIST_API = 'https://api.coingecko.com/api/v3/coins/list'

export interface SimpleCoinInfo {
	id: string
	symbol: string
	name: string
}
export interface AdvancedCoinInfo {
	symbol: string
	name: string
	image: string
	coingecko_rank: number
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

export type CoinGeckoCoinList = SimpleCoinInfo[]

export async function fetchCoinsList(): Promise<CoinGeckoCoinList> {
	const res = await fetch(COINGECKO_COINS_LIST_API)

	const data: CoinGeckoCoinList = await res.json()
	return data
}
export async function fetchCoinInfo(coinId: string): Promise<AdvancedCoinInfo> {
	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
	)

	const data = await res.json()
	return data
}
// https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
