import './HeaderField.css'
import React from 'react'

interface HeaderFieldProps {
	coinName: string
	coinIcon: string
}

const HeaderField: React.FC<HeaderFieldProps> = ({ coinName, coinIcon }) => {
	return (
		<div id="header">
			<h1>{coinName}</h1>
		</div>
	)
}

export default HeaderField
