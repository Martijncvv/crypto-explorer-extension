import './TwitterFeedField.css'
import React from 'react'
import { Timeline } from 'react-twitter-widgets'

interface TwitterFeedFieldProps {
	twitterId: string
}

const TwitterFeedField: React.FC<TwitterFeedFieldProps> = ({ twitterId }) => {
	return (
		twitterId && (
			<Timeline
				dataSource={{ sourceType: 'profile', screenName: `${twitterId}` }}
				options={{ theme: 'dark', width: '285', height: '600' }}
			/>
		)
	)
}

export default TwitterFeedField
