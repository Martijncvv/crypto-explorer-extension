import './HeaderField.css'
import React from 'react'

interface HeaderFieldProps {
	coinName: string
}

const HeaderField: React.FC<HeaderFieldProps> = ({ coinName }) => {
	return (
		<div id="header">
			<h1>{coinName}</h1>
		</div>
	)
}

export default HeaderField
