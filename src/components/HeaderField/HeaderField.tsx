import './HeaderField.css'
import React from 'react'

const ExtensionLogo = require('../../static/images/CryptoExplorer_logo_128.png')

interface HeaderFieldProps {
	coinName: string
	coinIcon: string
}

const HeaderField: React.FC<HeaderFieldProps> = ({ coinName, coinIcon }) => {
	return (
		<div id="header">
			{coinIcon ? (
				<div id="img-box">
					<img src={coinIcon} />
				</div>
			) : (
				<div id="img-box">
					<img src={ExtensionLogo} />
				</div>
			)}
			<div>
				{coinName.length > 15 ? (
					<h1 style={{ fontSize: '22px' }}>{coinName}</h1>
				) : coinName.length > 0 ? (
					<h1>{coinName}</h1>
				) : (
					<h1>Crypto Explorer</h1>
				)}
			</div>
		</div>
	)
}

export default HeaderField
