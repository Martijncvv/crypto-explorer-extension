import './HeaderField'
import React from 'react'

interface HeaderFieldProps {
	coinName: string
}

const HeaderField: React.FC<HeaderFieldProps> = ({ coinName }) => {
	return (
		<div>
			test
			<h1>{coinName}</h1>
		</div>
	)
}

export default HeaderField
