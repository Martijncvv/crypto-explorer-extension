import './OnchainTxsField.css'
import React, { useState, useEffect, PureComponent } from 'react'
import { fetchTokenTxs } from '../../utils/api'
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
	const [domainName, setDomainName] = useState<string>('etherscan.io')
	const [txsAmount, setTxsAmount] = useState<number>(200)

	useEffect(() => {
		getTxData()
	}, [contractAddress, platformId])

	async function getTxData() {
		let domain: string = 'etherscan.io'
		setPlatformTicker('Loading..')

		let priceData = [{}]
		let tokenTxData: ITokenTxs
		console.log('yes')
		switch (platformId) {
			case 'ethereum':
				setDomainName(domain)
				tokenTxData = await fetchTokenTxs(domain, contractAddress, txsAmount)
				setPlatformTicker('(Eth)')
				break
			case 'binance-smart-chain':
				domain = 'bscscan.com'
				setDomainName(domain)
				tokenTxData = await fetchTokenTxs(domain, contractAddress, txsAmount)
				setPlatformTicker('(Bsc)')
				break
			case 'polygon-pos':
				domain = 'polygonscan.com'
				setDomainName(domain)
				tokenTxData = await fetchTokenTxs(domain, contractAddress, txsAmount)
				setPlatformTicker('(Poly)')
				break
			case 'fantom':
				domain = 'ftmscan.com'
				setDomainName(domain)
				tokenTxData = await fetchTokenTxs(domain, contractAddress, txsAmount)
				setPlatformTicker('(Ftm)')
				break
			case 'cronos':
				domain = 'cronoscan.com'
				setDomainName(domain)
				tokenTxData = await fetchTokenTxs(domain, contractAddress, txsAmount)
				setPlatformTicker('(Cro)')
				break
			case 'avalanche':
				domain = 'snowtrace.io'
				setDomainName(domain)
				tokenTxData = await fetchTokenTxs(domain, contractAddress, txsAmount)
				setPlatformTicker('(Avax)')
				break
			case 'celo':
				domain = 'celoscan.io'
				setDomainName(domain)
				tokenTxData = await fetchTokenTxs(domain, contractAddress, txsAmount)
				setPlatformTicker('(Celo)')
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
			url: 'https://' + domainName + '/tx/' + data.hash,
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
