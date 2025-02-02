/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import DomainSuggestion from 'calypso/components/domains/domain-suggestion';

const noop = () => {};

describe( 'Domain Suggestion', () => {
	describe( 'has attributes', () => {
		test( 'should have data-e2e-domain attribute for e2e testing', () => {
			const domainSuggestion = shallow(
				<DomainSuggestion
					buttonContent="Click Me"
					domain="example.com"
					isAdded={ false }
					onButtonClick={ noop }
					priceRule="PRICE"
				/>
			);

			expect( domainSuggestion.props()[ 'data-e2e-domain' ] ).to.equal( 'example.com' );
		} );
	} );
} );
