import './InfoField'
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
		<div>
			<p>
				{attributeName} {attributeValue}
			</p>
		</div>
	)
}

export default InfoField
