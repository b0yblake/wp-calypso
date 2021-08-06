/**
 * Global polyfills
 */
import 'calypso/boot/polyfills';

import config from '@automattic/calypso-config';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import InlineHelp from 'calypso/blocks/inline-help';
import AsyncLoad from 'calypso/components/async-load';
import QuerySites from 'calypso/components/data/query-sites';
import { initializeAnalytics } from 'calypso/lib/analytics/init';
import getSuperProps from 'calypso/lib/analytics/super-props';
import { initializeCurrentUser } from 'calypso/lib/user/shared-utils';
import analyticsMiddleware from 'calypso/state/analytics/middleware';
import consoleDispatcher from 'calypso/state/console-dispatch';
import { setCurrentUser } from 'calypso/state/current-user/actions';
import currentUser from 'calypso/state/current-user/reducer';
import {
	reducer as httpData,
	enhancer as httpDataEnhancer,
} from 'calypso/state/data-layer/http-data';
import wpcomApiMiddleware from 'calypso/state/data-layer/wpcom-api-middleware';
import { requestHappychatEligibility } from 'calypso/state/happychat/user/actions';
import { setStore } from 'calypso/state/redux-store';
import sites from 'calypso/state/sites/reducer';
import { combineReducers, addReducerEnhancer } from 'calypso/state/utils';
import 'calypso/assets/stylesheets/style.scss';

async function AppBoot() {
	const rootReducer = combineReducers( {
		httpData,
		currentUser,
		sites,
	} );

	const store = createStore(
		rootReducer,
		compose(
			consoleDispatcher,
			addReducerEnhancer,
			httpDataEnhancer,
			applyMiddleware( thunkMiddleware, wpcomApiMiddleware, analyticsMiddleware )
		)
	);

	setStore( store );
	const user = await initializeCurrentUser();
	if ( user ) {
		store.dispatch( setCurrentUser( user ) );
	}
	initializeAnalytics( user || undefined, getSuperProps( store ) );

	if ( config.isEnabled( 'happychat' ) ) {
		store.dispatch( requestHappychatEligibility() );
	}

	ReactDom.render(
		<Provider store={ store }>
			<>
				<QuerySites allSites />
				<InlineHelp />
				<AsyncLoad require="calypso/blocks/support-article-dialog" placeholder={ null } />
			</>
		</Provider>,
		document.getElementById( 'wpcom' )
	);
}

AppBoot();
