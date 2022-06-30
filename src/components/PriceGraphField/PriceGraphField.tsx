import './PriceGraphField.css'
import React, { useEffect, useState } from 'react'

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

import { fetchPriceHistoryData } from '../../utils/api'
import { IPriceData } from '../../models/ICoinInfo'

interface PriceGraphFieldProps {
	coinId: string
	quote: string
}

const PriceGraphField: React.FC<PriceGraphFieldProps> = ({ coinId, quote }) => {
	const [chartData, setChartData] = useState<any>([{ date: '', $: '0' }])
	const [chartRange, setChartRange] = useState<string>('30')

	useEffect(() => {
		formatChartData()
	}, [coinId, quote, chartRange])

	async function formatChartData() {
		let priceHistoryData: IPriceData = await fetchPriceHistoryData(
			coinId,
			quote,
			chartRange
		)
		let priceData = [{}]

		priceHistoryData.prices.forEach(async function(UnixPrice) {
			let dateObject = new Date(UnixPrice[0])
			let date =
				dateObject.toLocaleString('en-US', { day: 'numeric' }) +
				' ' +
				dateObject.toLocaleString('en-US', { month: 'long' }).substring(0, 3) +
				' ' +
				dateObject.toLocaleString('en-US', { year: 'numeric' }).substring(2)

			quote === 'usd'
				? priceData.push({
						date,
						$: parseFloat(UnixPrice[1].toPrecision(5)),
				  })
				: priceData.push({
						date,
						'₿': parseFloat(UnixPrice[1].toPrecision(5)),
				  })
		})

		setChartData(priceData)
	}

	return (
		chartData && (
			<div id="price-graph-field">
				<p id="graph-title">
					Past
					<button
						className="graph-range-button"
						style={{
							color: chartRange == '30' ? 'rgba(255, 139, 79, 1)' : undefined,
						}}
						onClick={() => setChartRange('30')}
					>
						30
					</button>
					/
					<button
						className="graph-range-button"
						style={{
							color: chartRange == 'max' ? 'rgba(255, 139, 79, 1)' : undefined,
						}}
						onClick={() => setChartRange('max')}
					>
						max
					</button>
					days
				</p>

				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={chartData}
						margin={{
							top: 5,
							right: 40,
							left: 0,
							bottom: 5,
						}}
					>
						<XAxis
							dataKey="date"
							interval="preserveStartEnd"
							padding={{ right: 10 }}
						/>
						<YAxis
							mirror={true}
							interval="preserveStartEnd"
							type="number"
							domain={[(dataMin) => dataMin * 0.6, 'auto']}
						/>
						<Tooltip />
						{quote === 'usd' ? (
							<Line type="monotone" dataKey="$" stroke="#ff8b4f" dot={false} />
						) : (
							<Line type="monotone" dataKey="₿" stroke="#ff8b4f" dot={false} />
						)}
					</LineChart>
				</ResponsiveContainer>
			</div>
		)
	)
}

export default PriceGraphField
