import './DescriptionField.css'
import React, { useState, useEffect } from 'react'

interface DescriptionFieldProps {
	coinDescription: string
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({
	coinDescription,
}) => {
	const [readMore, setReadMore] = useState<boolean>(false)

	useEffect(() => {
		setReadMore(false)
	}, [coinDescription])

	if (!coinDescription.length) {
		coinDescription = 'Description not available'
	}

	function createMarkup() {
		return { __html: coinDescription }
	}

	return (
		<div id="description-field">
			<p id="title">Description</p>
			{readMore ? (
				<div id="description" dangerouslySetInnerHTML={createMarkup()} />
			) : (
				<>
					<div
						id="description-preview"
						dangerouslySetInnerHTML={createMarkup()}
					/>
					{coinDescription != 'Description not available' && (
						<button
							id="read-more-button"
							onClick={() => setReadMore(!readMore)}
						>
							Read more
						</button>
					)}
				</>
			)}
		</div>
	)
}

export default DescriptionField
