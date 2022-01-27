import './InfoField.css'
import React from 'react'

interface InfoFieldProps {
	attributeName: string
	attributeValue: string
}

const InfoField: React.FC<InfoFieldProps> = ({
	attributeName,
	attributeValue,
}) => {
	return (
		<div className="info-field">
			<p className="attribute-name">{attributeName}</p>
			<p className="attribute-value">{attributeValue}</p>
		</div>
	)
}

export default InfoField
