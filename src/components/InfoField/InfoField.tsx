import './InfoField'
import React from 'react'

interface InfoFieldProps {
	attributeName: string
	attributeValue: number
}

const InfoField: React.FC<InfoFieldProps> = ({
	attributeName,
	attributeValue,
}) => {
	return (
		<div>
			<h1>{attributeName}</h1>
			<h1>{attributeValue}</h1>
		</div>
	)
}

export default InfoField
