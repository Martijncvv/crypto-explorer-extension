import './PriceGraphField'
import React from 'react'

interface PriceGraphFieldProps {
	priceData: string
}

const PriceGraphField: React.FC<PriceGraphFieldProps> = ({ priceData }) => {
	return <div>{priceData}</div>
}

export default PriceGraphField
