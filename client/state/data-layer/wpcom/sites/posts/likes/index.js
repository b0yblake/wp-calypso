/**
 * External Dependencies
 *
 */

import { POST_LIKES_REQUEST } from 'calypso/state/action-types';
import { mergeHandlers } from 'calypso/state/action-watchers/utils';
import { registerHandlers } from 'calypso/state/data-layer/handler-registry';
import { http } from 'calypso/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'calypso/state/data-layer/wpcom-http/utils';
import { receiveLikes } from 'calypso/state/posts/likes/actions';
import mine from './mine';
import newLike from './new';

export const fetch = ( action ) =>
	http(
		{
			method: 'GET',
			path: `/sites/${ action.siteId }/posts/${ action.postId }/likes`,
			apiVersion: '1.1',
		},
		action
	);

export const fromApi = ( data ) => ( {
	found: +data.found,
	iLike: !! data.i_like,
	likes: data.likes,
} );

export const onSuccess = ( { siteId, postId }, data ) => receiveLikes( siteId, postId, data );

registerHandlers(
	'state/data-layer/wpcom/sites/posts/likes/index.js',
	mergeHandlers( newLike, mine, {
		[ POST_LIKES_REQUEST ]: [
			dispatchRequest( {
				fetch,
				fromApi,
				onSuccess,
				onError: () => {},
			} ),
		],
	} )
);
