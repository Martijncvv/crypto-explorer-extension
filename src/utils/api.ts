import {
	IAdvancedCoinInfo,
	ICoinGeckoCoinList,
	TrendingCoinList,
	IPriceData,
} from '../models/ICoinInfo'
import ITokenEthTxs from '../models/ITokenEthTxs'

const COINGECKO_COINS_LIST_API = 'https://api.coingecko.com/api/v3/coins/list'

export async function fetchCoinsList(): Promise<ICoinGeckoCoinList> {
	const res = await fetch(COINGECKO_COINS_LIST_API)

	const data: ICoinGeckoCoinList = await res.json()
	return data
}

export async function fetchTrendingCoins(): Promise<TrendingCoinList> {
	const res = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
	if (!res.ok) {
		throw new Error(`Fetch error, Hot Coins}`)
	}

	const data = await res.json()
	return data
}

export async function fetchCoinInfo(
	coinId: string
): Promise<IAdvancedCoinInfo> {
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
	quote: string,
	chartRange: string
): Promise<IPriceData> {
	coinId = coinId ? coinId : 'bitcoin'
	quote = quote ? quote : 'usd'

	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${quote}&days=${chartRange}&interval=daily`
	)
	if (!res.ok) {
		throw new Error(`Fetch error, price history data: ${coinId}`)
	}

	const priceData = await res.json()
	return priceData
}

export async function fetchEthContractTxs(
	contractAddress: string
): Promise<ITokenEthTxs> {
	const res = await fetch(
		'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=' +
			contractAddress +
			'&page=1&offset=200&startblock=0&endblock=99999999&sort=desc'
	)
	if (!res.ok) {
		throw new Error(`Fetch error, WOO DeX Trade info}`)
	}

	const data = await res.json()

	return data
}
