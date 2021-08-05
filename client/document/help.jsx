import React from 'react';
import Head from 'calypso/components/head';
import { jsonStringifyForHtml } from 'calypso/server/sanitize';
import { chunkCssLinks } from './utils';

/* eslint-disable react/no-danger */

export default function Help( { clientData, entrypoint, env, manifests } ) {
	return (
		<html lang="en">
			<Head>{ chunkCssLinks( entrypoint ) }</Head>
			<body>
				<div id="wpcom" />
				<script
					dangerouslySetInnerHTML={ {
						__html: `var configData = ${ jsonStringifyForHtml( clientData ) };\n`,
					} }
				/>
				{ env === 'development' && <script src="/calypso/evergreen/runtime.js" /> }
				{ env !== 'development' &&
					manifests.map( ( manifest ) => (
						<script
							dangerouslySetInnerHTML={ {
								__html: manifest,
							} }
						/>
					) ) }
				{ entrypoint.js.map( ( asset ) => (
					<script key={ asset } src={ asset } />
				) ) }
			</body>
		</html>
	);
}
