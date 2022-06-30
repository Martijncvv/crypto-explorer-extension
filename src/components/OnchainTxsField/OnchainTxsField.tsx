import './OnchainTxsField.css'
import React, { useState, useEffect } from 'react'
import { fetchEthContractTxs } from '../../utils/api'
import ITokenEthTxs, { ITokenEthTxInfo } from '../../models/ITokenEthTxs'
import { amountFormatter } from '../../utils/amountFormatter'

interface OnchainTxsFieldProps {
	contractAddress: string
	tokenPrice: number
}

interface EthTokenTxCleaned {
	from: string
	to: string
	age: string
	colour: string
	txHash: string
	value: number
	amount: number
}

const OnchainTxsField: React.FC<OnchainTxsFieldProps> = ({
	contractAddress,
	tokenPrice,
}) => {
	const [tokenTxData, setTokenTxData] = useState<EthTokenTxCleaned[]>()

	console.log('contractAddress')
	console.log(contractAddress)
	useEffect(() => {
		getTxData()
	}, [contractAddress])

	async function getTxData() {
		const tokenTxData: ITokenEthTxs = await fetchEthContractTxs(contractAddress)
		const cleanedTxsInfo: EthTokenTxCleaned[] = []

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
			})
		})

		setTokenTxData(cleanedTxsInfo)

		console.log('tokenTxData')
		console.log(tokenTxData)
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

	return (
		<div id="onchain-txs-field">
			<div className="dex-trades-values">
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
						<div>{txData.to}</div>
						<div>{amountFormatter(txData.amount)}</div>
						<div>{`$${amountFormatter(txData.value)}`}</div>
						<div>{txData.age}</div>
					</div>
				))}
		</div>
	)
}

export default OnchainTxsField
