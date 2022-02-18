import './CompareMcField.css'
import React, { useState, useEffect } from 'react'

interface CompareMcFieldProps {
	coinTicker: string
}

const CompareMcField: React.FC<CompareMcFieldProps> = ({ coinTicker }) => {
	const [tickerInput, setTickerInput] = useState<string>('')

	return (
		<div id="compare-mc-field">
			<div id="compare-mc-info">
				<p>
					When <span id="ticker"> {coinTicker} </span> has the MC of{' '}
				</p>
				<p>the price will be</p>
			</div>

			<div id="compare-mc-value">
				<input id="search-mc-input" placeholder="Ticker" />
				<p>$33.33</p>
			</div>
		</div>
	)
}

export default CompareMcField

// id="search-input"
// placeholder="Search ticker"
// autoFocus={true}
// value={searchInput}
// onKeyDown={(event) => handleSearchInputKeyDownEvent(event)}
// onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
// onClick={() => setSearchInput('')}
