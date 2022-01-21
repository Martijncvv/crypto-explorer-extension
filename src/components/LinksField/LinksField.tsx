import './LinksField'
import React from 'react'

interface LinksFieldProps {
	links: string[]
}

const LinksField: React.FC<LinksFieldProps> = ({ links }) => {
	return (
		<div>
			{links.map((link, i) => (
				<div key={i}>
					<li>{link}</li>
				</div>
			))}
		</div>
	)
}

export default LinksField
