const COINGECKO_COINS_LIST_API = 'https://api.coingecko.com/api/v3/coins/list'

export interface SimpleCoinInfo {
	id: string
	symbol: string
	name: string
}
export interface AdvancedCoinInfo {
	id: string
	symbol: string
	name: string
	image: size
	coingecko_rank: number
	description: language
	market_data: market_data
	market_cap_rank: number
	links: links
}
export interface market_data {
	market_cap: quote
	current_price: quote
	total_volume: quote
	ath: quote
	atl: quote
	circulating_supply: number
	total_supply: number
}
export interface quote {
	usd: number
	btc: number
}
export interface language {
	en: string
}
export interface size {
	large: string
	small: string
	thumb: string
}
export interface links {
	homepage: string[]
	twitter_screen_name: string
	telegram_channel_identifier: string
	blockchain_site: string[]
}

export type CoinGeckoCoinList = SimpleCoinInfo[]

export async function fetchCoinsList(): Promise<CoinGeckoCoinList> {
	const res = await fetch(COINGECKO_COINS_LIST_API)

	const data: CoinGeckoCoinList = await res.json()
	return data
}

export async function fetchCoinInfo(coinId: string): Promise<AdvancedCoinInfo> {
	coinId = coinId ? coinId : 'bitcoin'
	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
	)
	if (!res.ok) {
		throw new Error(`Fetch error: ${coinId}`)
	}

	const data = await res.json()
	return data
}
// https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
