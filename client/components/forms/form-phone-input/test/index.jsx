/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { FormPhoneInput } from '../';

const countriesList = [
	{
		code: 'US',
		name: 'United States (+1)',
		numeric_code: '+1',
		country_name: 'United States',
	},
	{
		code: 'AR',
		name: 'Argentina (+54)',
		numeric_code: '+54',
		country_name: 'Argentina',
	},
];

describe( 'FormPhoneInput', () => {
	const localizeProps = { translate: ( string ) => string };

	describe( 'getValue()', () => {
		test( 'should set country from props', () => {
			const phoneComponent = shallow(
				<FormPhoneInput
					countriesList={ countriesList }
					initialCountryCode={ countriesList[ 1 ].code }
					{ ...localizeProps }
				/>
			);

			expect( phoneComponent.instance().getValue().countryData ).to.deep.equal(
				countriesList[ 1 ]
			);
		} );

		test( 'should set country to first element when not specified', () => {
			const phoneComponent = shallow(
				<FormPhoneInput countriesList={ countriesList } { ...localizeProps } />
			);

			expect( phoneComponent.instance().getValue().countryData ).to.deep.equal(
				countriesList[ 0 ]
			);
		} );

		test( 'should update country on change', () => {
			const phoneComponent = mount(
				<FormPhoneInput countriesList={ countriesList } { ...localizeProps } />
			);

			phoneComponent.find( 'select' ).simulate( 'change', {
				target: {
					value: countriesList[ 1 ].code,
				},
			} );

			expect( phoneComponent.instance().getValue().countryData ).to.deep.equal(
				countriesList[ 1 ]
			);
		} );

		test( 'should have no country with empty countryList', () => {
			const phoneComponent = shallow(
				<FormPhoneInput countriesList={ [] } { ...localizeProps } />
			);

			expect( phoneComponent.instance().getValue().countryData ).to.equal( undefined );
		} );
	} );
} );
