export function amountFormatter(amount: number): string {
	switch (true) {
		case amount === 0 || amount === null || amount === undefined:
			return '∞'
		// return ' (&#8734;)'
		case amount > 1000000000:
			return `${(amount / 1000000000).toPrecision(3)} B`
		case amount > 1000000:
			return `${(amount / 1000000).toPrecision(3)} M`
		case amount > 10000:
			return `${(amount / 1000).toPrecision(3)} K`
		case amount < 0.00000001:
			return `${(amount / 0.00000001).toPrecision(3)} SAT`
		default:
			return `${amount.toPrecision(4)}`
	}
}
