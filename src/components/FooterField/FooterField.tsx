import './FooterField.css'
import React from 'react'
const CoinGeckoIcon = require('../../static/images/Coingecko_Icon_Circle_Color.png')

const FooterField: React.FC<{}> = ({}) => {
	return (
		<div id="footer-field">
			<p>
				Powered by CoinGecko API{' '}
				<img id="coingecko_footer_icon" src={CoinGeckoIcon} />{' '}
			</p>
		</div>
	)
}

export default FooterField
