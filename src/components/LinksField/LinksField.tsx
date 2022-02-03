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
	function handleOpenTab(link) {
		chrome.tabs.create({ url: link, selected: false })
	}

	return (
		<div id="links-field">
			{websiteLink && (
				<img
					className="link-icon"
					src={WebsiteIcon}
					onClick={() => handleOpenTab(websiteLink)}
				/>
			)}
			{blockExplorerLink && (
				<img
					className="link-icon"
					src={BlockExplorerIcon}
					onClick={() => handleOpenTab(blockExplorerLink)}
				/>
			)}
			{coingeckoLink && (
				<img
					className="link-icon"
					src={CoinGeckoIcon}
					onClick={() => handleOpenTab(coingeckoLink)}
				/>
			)}
			{twitterLink && (
				<img
					className="link-icon"
					src={TwitterIcon}
					onClick={() =>
						handleOpenTab(`https://www.twitter.com/${twitterLink}`)
					}
				/>
			)}
			{telegramLink && (
				<img
					className="link-icon"
					src={TelegramIcon}
					onClick={() => handleOpenTab(`https://t.me/${telegramLink}`)}
				/>
			)}
		</div>
	)
}

export default LinksField
