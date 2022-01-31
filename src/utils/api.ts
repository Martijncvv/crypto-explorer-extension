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
	image: Size
	coingecko_rank: number
	description: Language
	market_data: Market_data
	market_cap_rank: number
	links: Links
}
interface Market_data {
	market_cap: Quote
	current_price: Quote
	total_volume: Quote
	ath: Quote
	atl: Quote
	circulating_supply: number
	total_supply: number
}
interface Quote {
	usd: number
	btc: number
}
interface Language {
	en: string
}
interface Size {
	large: string
	small: string
	thumb: string
}
interface Links {
	homepage: string[]
	twitter_screen_name: string
	telegram_channel_identifier: string
	blockchain_site: string[]
}
export interface PriceData {
	prices: UnixPriceArray[]
	market_caps: UnixPriceArray[]
	total_volumes: UnixPriceArray[]
}
interface UnixPriceArray {
	UnixPrice: UnixPrice[]
}
interface UnixPrice {
	value: number
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
		throw new Error(`Fetch error, coin info data: ${coinId}`)
	}

	const data = await res.json()
	return data
}

export async function fetchPriceHistoryData(
	coinId: string,
	quote: string
): Promise<PriceData> {
	coinId = coinId ? coinId : 'bitcoin'
	quote = quote ? quote : 'usd'

	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${quote}&days=30&interval=daily`
	)
	if (!res.ok) {
		throw new Error(`Fetch error, price history data: ${coinId}`)
	}

	const priceData = await res.json()
	return priceData
}
