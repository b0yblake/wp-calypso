/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { PluginAutoUpdateToggle } from 'calypso/my-sites/plugins/plugin-autoupdate-toggle';
import fixtures from './fixtures';

jest.mock( 'calypso/my-sites/plugins/plugin-action/plugin-action', () =>
	require( './mocks/plugin-action' )
);
jest.mock( 'query', () => require( 'component-query' ), { virtual: true } );

describe( 'PluginAutoupdateToggle', () => {
	const mockedProps = {
		recordGoogleEvent: spy(),
		recordTracksEvent: spy(),
		removePluginStatuses: spy(),
		translate: spy(),
		togglePluginAutoUpdate: spy(),
	};

	afterEach( () => {
		mockedProps.togglePluginAutoUpdate.resetHistory();
		mockedProps.recordGoogleEvent.resetHistory();
	} );

	test( 'should render the component', () => {
		const wrapper = mount( <PluginAutoUpdateToggle { ...mockedProps } { ...fixtures } /> );

		expect( wrapper.find( '.plugin-action' ) ).to.have.lengthOf( 1 );
	} );

	test( 'should register an event when the subcomponent action is executed', () => {
		const wrapper = mount( <PluginAutoUpdateToggle { ...mockedProps } { ...fixtures } /> );

		wrapper.simulate( 'click' );

		expect( mockedProps.recordGoogleEvent.called ).to.equal( true );
		expect( mockedProps.recordTracksEvent.called ).to.equal( true );
	} );

	test( 'should call an action when the subcomponent action is executed', () => {
		const wrapper = mount( <PluginAutoUpdateToggle { ...mockedProps } { ...fixtures } /> );

		wrapper.simulate( 'click' );

		expect( mockedProps.togglePluginAutoUpdate.called ).to.equal( true );
	} );
} );
