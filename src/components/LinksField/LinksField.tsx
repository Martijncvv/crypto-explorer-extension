import './LinksField.css'
import React from 'react'

const WebsiteIcon = require('../../static/images/Website_Icon_Circle_Color.png')
const BlockExplorerIcon = require('../../static/images/Coin_blockexplorer_Icon_Circle_Color.png')
const CoinGeckoIcon = require('../../static/images/Coingecko_Icon_Circle_Color.png')
const TwitterIcon = require('../../static/images/Twitter_Social_Icon_Circle_Color.png')
const TelegramIcon = require('../../static/images/Telegram_Social_Icon_Circle_Color.png')

interface LinksFieldProps {
	blockExplorerLink: string
	coingeckoLink: string
	twitterLink: string
	telegramLink: string
	websiteLink: string
}

const LinksField: React.FC<LinksFieldProps> = ({
	blockExplorerLink,
	coingeckoLink,
	twitterLink,
	telegramLink,
	websiteLink,
}) => {
	return (
		<div id="links-field">
			{websiteLink && (
				<a href={websiteLink} target="_blank">
					<img className="link-icon" src={WebsiteIcon} />
				</a>
			)}
			{blockExplorerLink && (
				<a href={blockExplorerLink} target="_blank">
					<img className="link-icon" src={BlockExplorerIcon} />
				</a>
			)}
			{coingeckoLink && (
				<a href={coingeckoLink} target="_blank">
					<img className="link-icon" src={CoinGeckoIcon} />
				</a>
			)}
			{twitterLink && (
				<a href={twitterLink} target="_blank">
					<img className="link-icon" src={TwitterIcon} />
				</a>
			)}
			{telegramLink && (
				<a href={telegramLink} target="_blank">
					<img className="link-icon" src={TelegramIcon} />
				</a>
			)}
		</div>
	)
}

export default LinksField
