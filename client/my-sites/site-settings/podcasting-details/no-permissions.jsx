import { localize } from 'i18n-calypso';
import React from 'react';

function PodcastingNoPermissionsMessage( { translate } ) {
	return (
		<div className="podcasting-details__no-permissions">
			<p>
				{ translate(
					"Oops! You don't have permission to manage Podcasting settings on this site."
				) }
			</p>
			<p>
				{ translate( "Try changing to a different site or contacting this site's administrator." ) }
			</p>
		</div>
	);
}

export default localize( PodcastingNoPermissionsMessage );
