import DescriptionField from '../components/DescriptionField'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import InfoField from '../components/InfoField'
import LinksField from '../components/LinksField'
import PriceGraphField from '../components/PriceGraphField'
import { getStoredCoins } from '../utils/storage'
import './popup.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { CoinGeckoCoinList } from '../utils/api'

const links: string[] = ['link1', 'link2', 'link3']
const App: React.FC<{}> = () => {
	const [coinList, setCoinList] = useState<CoinGeckoCoinList>([])

	useEffect(() => {
		getStoredCoins().then((coinList) => {
			setCoinList(coinList)
			console.log('coindata from storage')
			console.log(coinList)
		})
	}, [])

	return (
		<>
			<HeaderField coinName={'HEADDERR'} />
			<InfoField attributeName="InfoField1" attributeValue={1} />
			<InfoField attributeName="InfoField22" attributeValue={22} />

			<LinksField links={links} />
			<DescriptionField
				coinDescription={
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				}
			/>
			<PriceGraphField priceData="pricedata_test" />
			<FooterField />
		</>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
