import { Card } from '@automattic/components';
import React from 'react';
import ReaderAuthorLink from 'calypso/blocks/reader-author-link';

const ReaderAuthorLinkExample = () => {
	const author = { URL: 'http://wpcalypso.wordpress.com', name: 'Barnaby Blogwit' };

	return (
		<Card>
			<ReaderAuthorLink author={ author }>Author site</ReaderAuthorLink>
		</Card>
	);
};

ReaderAuthorLinkExample.displayName = 'ReaderAuthorLink';

export default ReaderAuthorLinkExample;
