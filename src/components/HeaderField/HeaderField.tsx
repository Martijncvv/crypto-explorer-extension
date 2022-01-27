import './HeaderField.css'
import React from 'react'

interface HeaderFieldProps {
	coinName: string
	coinIcon: string
}

const HeaderField: React.FC<HeaderFieldProps> = ({ coinName, coinIcon }) => {
	return (
		<div id="header">
			<div id="img-box">
				<img src={coinIcon} />
			</div>
			<div>
				{coinName.length > 15 ? (
					<h1 style={{ fontSize: '22px' }}>{coinName}</h1>
				) : (
					<h1>{coinName}</h1>
				)}
			</div>
		</div>
	)
}

export default HeaderField
