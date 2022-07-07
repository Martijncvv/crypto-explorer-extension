import './FooterField.css'
import React from 'react'
const CoinGeckoIcon = require('../../static/images/Coingecko_Icon_Circle_Color.png')
const EtherscanIcon = require('../../static/images/Etherscan_logo_circle.png')
const FooterField: React.FC<{}> = ({}) => {
	return (
		<div id="footer-field">
			<p>
				Powered by CoinGecko & Etherscan API
				{/* <img id="coingecko_footer_icon" src={CoinGeckoIcon} />
				<img id="etherscan_footer_icon" src={EtherscanIcon} />{' '} */}
			</p>
		</div>
	)
}

export default FooterField
