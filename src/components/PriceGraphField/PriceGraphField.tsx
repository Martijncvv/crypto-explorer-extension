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

import { PriceData, fetchPriceHistoryData } from '../../utils/api'

interface PriceGraphFieldProps {
	coinId: string
	quote: string
}

const PriceGraphField: React.FC<PriceGraphFieldProps> = ({ coinId, quote }) => {
	const [chartData, setChartData] = useState<any>([])

	useEffect(() => {
		setChartData([])
		formatChartData()
	}, [coinId, quote])

	async function formatChartData() {
		await fetchPriceHistoryData(coinId, quote).then((priceData: PriceData) => {
			priceData.prices.forEach(async function(UnixPrice) {
				let dateObject = new Date(UnixPrice[0])
				let date =
					dateObject
						.toLocaleString('en-US', { month: 'long' })
						.substring(0, 3) +
					' ' +
					dateObject.toLocaleString('en-US', { day: 'numeric' })

				quote === 'usd'
					? setChartData((chartData) => [
							...chartData,
							{
								date,
								$: UnixPrice[1].toPrecision(5),
							},
					  ])
					: setChartData((chartData) => [
							...chartData,
							{
								date,
								'₿': UnixPrice[1].toPrecision(5),
							},
					  ])
			})
		})
	}

	return (
		chartData && (
			<div id="price-graph-field">
				<p id="graph-title">Passed 30 days</p>
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
						<XAxis dataKey="date" interval="preserveStartEnd" />
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
