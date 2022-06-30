export interface ITokenEthTxInfo {
	blockHash: string
	blockNumber: string
	confirmations: string
	contractAddress: string
	cumulativeGasUsed: string
	from: string
	gas: string
	gasPrice: string
	gasUsed: string
	hash: string
	input: string
	nonce: string
	timeStamp: string
	to: string
	tokenDecimal: string
	tokenName: string
	tokenSymbol: string
	transactionIndex: string
	value: string
}

export default interface ITokenEthTxs {
	message: string
	result: ITokenEthTxInfo[]
	status: string
}
