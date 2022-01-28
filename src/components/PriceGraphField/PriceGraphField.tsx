import './PriceGraphField'
import React, { useEffect } from 'react'
import { PriceData, fetchPriceHistoryData } from '../../utils/api'
import { Chart } from 'react-google-charts'

interface PriceGraphFieldProps {
	coinId: string
	quote: string
}

export const options = {
	title: 'Company Performance',
	curveType: 'function',
	legend: { position: 'bottom' },
}

export const chartData = []

export const data = [
	['Year', 'Sales', 'Expenses'],
	['2004', 1000, 400],
	['2005', 1170, 460],
	['2006', 660, 1120],
	['2007', 1030, 540],
]

const PriceGraphField: React.FC<PriceGraphFieldProps> = ({ coinId, quote }) => {
	useEffect(() => {
		formatChartData()
	}, [coinId])

	async function formatChartData() {
		await fetchPriceHistoryData(coinId, quote).then((priceData: PriceData) => {
			console.log(priceData)
			// creates an empty array to store pricedata in right format
			chartData.push(['Date', quote])
			let min_tick = 0
			let max_tick = 0

			priceData.prices.forEach(async function(UnixPrice) {
				// stores min and max price value, (used for y-axis of graph)
				if (min_tick > UnixPrice[1]) {
					min_tick = UnixPrice[1].toPrecision(3)
				}
				if (max_tick < UnixPrice[1]) {
					max_tick = UnixPrice[1].toPrecision(3)
				}

				let dateObject = new Date(UnixPrice[0])
				let date =
					dateObject.toLocaleString('en-US', { day: 'numeric' }) +
					' ' +
					dateObject.toLocaleString('en-US', { month: 'long' }).substring(0, 3)

				let dataPair = [date, UnixPrice[1]]
				chartData.push(dataPair)
			})
		})
	}

	return (
		<div id="price-graph-field">
			<Chart
				chartType="LineChart"
				width="100%"
				height="400px"
				data={data}
				options={options}
			/>
		</div>
	)
}

export default PriceGraphField
