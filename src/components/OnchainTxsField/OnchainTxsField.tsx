import './OnchainTxsField.css'
import React, { useState, useEffect, PureComponent } from 'react'
import {
	fetchEthContractTxs,
	fetchBscContractTxs,
	fetchPolyContractTxs,
	fetchFtmContractTxs,
	fetchCroContractTxs,
	fetchAvaxContractTxs,
} from '../../utils/api'
import ITokenTxs from '../../models/ITokenTxs'

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ReferenceLine,
	Brush,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

interface OnchainTxsFieldProps {
	contractAddress: string
	tokenPrice: number
	platformId: string
}

interface ITokenTxCleaned {
	from: string
	to: string
	age: string
	colour: string
	txHash: string
	value: number
	amount: number
	date: string
}

const OnchainTxsField: React.FC<OnchainTxsFieldProps> = ({
	contractAddress,
	tokenPrice,
	platformId,
}) => {
	const [chartData, setChartData] = useState<any>([{}])
	const [platformTicker, setPlatformTicker] = useState<string>('(Eth)')
	const [platformExplorerUrl, setPlatformExplorerUrl] = useState<string>(
		'https://etherscan.io/tx/'
	)

	useEffect(() => {
		getTxData()
	}, [contractAddress, platformId])

	async function getTxData() {
		setPlatformTicker('Loading..')

		let priceData = [{}]
		let tokenTxData: ITokenTxs

		switch (platformId) {
			case 'ethereum':
				setPlatformExplorerUrl('https://etherscan.io/tx/')
				tokenTxData = await fetchEthContractTxs(contractAddress)
				setPlatformTicker('(Eth)')
				break
			case 'binance-smart-chain':
				setPlatformExplorerUrl('https://bscscan.com/tx/')
				tokenTxData = await fetchBscContractTxs(contractAddress)
				setPlatformTicker('(Bsc)')
				break
			case 'polygon-pos':
				setPlatformExplorerUrl('https://polygonscan.com/tx/')
				tokenTxData = await fetchPolyContractTxs(contractAddress)
				setPlatformTicker('(Poly)')
				break
			case 'fantom':
				setPlatformExplorerUrl('https://ftmscan.com/tx/')
				tokenTxData = await fetchFtmContractTxs(contractAddress)
				setPlatformTicker('(Ftm)')
				break
			case 'cronos':
				setPlatformExplorerUrl('https://cronoscan.com/tx/')
				tokenTxData = await fetchCroContractTxs(contractAddress)
				setPlatformTicker('(Cro)')
				break
			case 'avalanche':
				setPlatformExplorerUrl('https://snowtrace.io/tx/')
				tokenTxData = await fetchAvaxContractTxs(contractAddress)
				setPlatformTicker('(Avax)')
				break
		}

		tokenTxData.result.forEach((tx) => {
			priceData.unshift({
				date: dateFormat(tx.timeStamp),
				$: parseFloat(
					(
						(parseInt(tx.value) / 10 ** parseInt(tx.tokenDecimal)) *
						tokenPrice
					).toPrecision(3)
				),
				hash: tx.hash,
			})
		})

		setChartData(priceData)
	}

	const dateFormat = (unixTimestamp) => {
		let dateObject = new Date(unixTimestamp * 1000)
		let hours = dateObject.getHours()
		let minutes = '0' + dateObject.getMinutes()
		let day = dateObject.toLocaleString('en-US', { day: 'numeric' })
		let month = dateObject
			.toLocaleString('en-US', { month: 'long' })
			.substring(0, 3)
		// let seconds = '0' + dateObject.getSeconds()

		return `${hours}:${minutes.substr(-2)}`
	}

	const handleClick = (data) => {
		chrome.tabs.create({
			url: platformExplorerUrl + data.hash,
			selected: false,
		})
	}

	return (
		<div id="onchain-txs-field">
			{chartData.length > 0 && (
				<>
					<div id="onchain-txs-field-subtitle">
						Past 200 txs in $ {platformTicker}
					</div>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							width={500}
							height={300}
							data={chartData}
							margin={{
								top: 5,
								right: 40,
								left: 0,
								bottom: 16,
							}}
							style={{ cursor: 'pointer' }}
						>
							<XAxis
								dataKey="date"
								interval="preserveStartEnd"
								padding={{ right: 10 }}
							/>
							<YAxis
								scale="linear"
								mirror={true}
								interval="preserveStartEnd"
								type="number"
								domain={['auto', (dataMax) => Math.round(dataMax * 1.1)]}
							/>
							<Tooltip />

							<Bar
								dataKey="$"
								fill="#ff8b4f"
								onClick={(event) => handleClick(event)}
							/>

							<ReferenceLine y={0} stroke="#000" />
							<Brush dataKey="date" height={6} stroke="#ff8b4f" />
						</BarChart>
					</ResponsiveContainer>
				</>
			)}
		</div>
	)
}

export default OnchainTxsField
