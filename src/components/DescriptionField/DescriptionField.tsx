import './DescriptionField'
import React from 'react'

interface DescriptionFieldProps {
	coinDescription: string
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({
	coinDescription,
}) => {
	return (
		<div>
			<p>{coinDescription}</p>
		</div>
	)
}

export default DescriptionField
