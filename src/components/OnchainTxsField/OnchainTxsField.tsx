import './OnchainTxsField.css'
import React, { useState, useEffect, PureComponent } from 'react'
import { fetchEthContractTxs } from '../../utils/api'
import ITokenEthTxs, { ITokenEthTxInfo } from '../../models/ITokenEthTxs'
import { amountFormatter } from '../../utils/amountFormatter'

import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	ReferenceLine,
	Brush,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'

interface OnchainTxsFieldProps {
	contractAddress: string
	tokenPrice: number
}

interface IEthTokenTxCleaned {
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
}) => {
	const [tokenTxData, setTokenTxData] = useState<IEthTokenTxCleaned[]>()
	const [chartData, setChartData] = useState<any>([{}])
	const [firstTimestamp, setFirstTimestamp] = useState<string>()
	const [finalTimestamp, setFinalTimestamp] = useState<string>()

	console.log('contractAddress')
	console.log(contractAddress)
	useEffect(() => {
		getTxData()
	}, [contractAddress])

	async function getTxData() {
		const tokenTxData: ITokenEthTxs = await fetchEthContractTxs(contractAddress)
		const cleanedTxsInfo: IEthTokenTxCleaned[] = []

		let priceData = [{}]

		tokenTxData.result.forEach((tx) => {
			cleanedTxsInfo.push({
				amount: parseInt(tx.value) / 10 ** parseInt(tx.tokenDecimal),
				value:
					(parseInt(tx.value) / 10 ** parseInt(tx.tokenDecimal)) * tokenPrice,
				age: getAgeFormat(tx.timeStamp),
				txHash: tx.hash,
				from: tx.from.slice(2, 6),
				to: tx.to.slice(2, 6),
				colour: `#${tx.from.slice(2, 8)}`,
				date: dateFormat(tx.timeStamp),
			})

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

		setTokenTxData(cleanedTxsInfo)
		console.log('cleanedTxsInfo')
		console.log(cleanedTxsInfo)
	}

	const getAgeFormat = (unixTimestamp) => {
		const hoursPassed = Math.floor(
			(Date.now() / 1000 - parseInt(unixTimestamp)) / 3600
		)
		const minutesPassed = Math.floor(
			(Date.now() / 1000 - parseInt(unixTimestamp) - hoursPassed * 3600) / 60
		)

		switch (true) {
			case unixTimestamp === null ||
				unixTimestamp == NaN ||
				unixTimestamp === undefined:
				return 'error'

			case hoursPassed > 1:
				return `${hoursPassed} hrs ${minutesPassed} mins`
			case hoursPassed == 1:
				return `${hoursPassed} hr ${minutesPassed} mins`

			case minutesPassed > 1:
				return `${minutesPassed} mins`
			case minutesPassed == 1:
				return `${minutesPassed} min`
			case minutesPassed == 0:
				return `<1 min`
		}
	}

	const dateFormat = (unixTimestamp) => {
		let dateObject = new Date(unixTimestamp * 1000)
		let hours = dateObject.getHours()
		let minutes = '0' + dateObject.getMinutes()
		// let seconds = '0' + dateObject.getSeconds()

		return hours + ':' + minutes.substr(-2)
	}

	const handleClick = (data) => {
		console.log(data)
		chrome.tabs.create({
			url: `https://etherscan.io/tx/${data.hash}`,
			selected: false,
		})
	}

	return (
		<div id="onchain-txs-field">
			<div id="onchain-txs-field-subtitle">Past 200 txs in $ (Eth)</div>
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
					{/* <Bar dataKey="value" stroke="#ff8b4f" /> */}
					<ReferenceLine y={0} stroke="#000" />
					<Brush dataKey="date" height={6} stroke="#ff8b4f" />
				</BarChart>
			</ResponsiveContainer>

			{/* <div className="dex-trades-values">
				<div>From</div>
				<div>To</div>
				<div>Amount</div>
				<div>Value</div>
				<div>Age</div>
			</div>

			{tokenTxData?.length > 0 &&
				tokenTxData.map((txData, index) => (
					<div className="dex-trades-values" key={index}>
						<div>{txData.from}</div>
						<div>{amountFormatter(txData.amount)}</div>
						<div>{`$${amountFormatter(txData.value)}`}</div>
						<div>{txData.age}</div>
					</div>
				))} */}
		</div>
	)
}

export default OnchainTxsField
