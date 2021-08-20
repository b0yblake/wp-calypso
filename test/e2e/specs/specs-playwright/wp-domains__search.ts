import {
	DataHelper,
	LoginFlow,
	SidebarComponent,
	DomainsPage,
	DomainSearchComponent,
	setupHooks,
	CartCheckoutPage,
} from '@automattic/calypso-e2e';
import { Page } from 'playwright';

describe( DataHelper.createSuiteTitle( 'Domains: Add to current site' ), function () {
	let page: Page;

	setupHooks( ( args ) => {
		page = args.page;
	} );

	// Todo: add row for Atomic tests when once #54987 is merged to trunk.
	// ${ 'Atomic' } | ${ 'wooCommerceUser' } | ${'Free'}
	describe.each`
		siteType      | user               | paymentMethod
		${ 'Simple' } | ${ 'defaultUser' } | ${ 'Credit Card' }
	`( 'Domains: Add to current site ($siteType)', function ( { user, paymentMethod } ) {
		e;
		const phrase = DataHelper.randomPhrase();

		let sidebarComponent: SidebarComponent;
		let domainSearchComponent: DomainSearchComponent;
		let cartCheckoutPage: CartCheckoutPage;
		let selectedDomain: string;

		it( 'Log in', async function () {
			const loginFlow = new LoginFlow( page, user );
			await loginFlow.logIn();
		} );

		it( 'Navigate to Upgrades > Domains', async function () {
			sidebarComponent = new SidebarComponent( page );
			await sidebarComponent.gotoMenu( { item: 'Upgrades', subitem: 'Domains' } );
		} );

		it( 'Click on add domain to this site', async function () {
			const domainsPage = new DomainsPage( page );
			await domainsPage.addDomaintoSite();
		} );

		it( 'Search for a domain name', async function () {
			domainSearchComponent = new DomainSearchComponent( page );
			await domainSearchComponent.search( phrase );
		} );

		it( 'Choose the .com TLD', async function () {
			selectedDomain = await domainSearchComponent.selectDomain( '.com' );
		} );

		it( 'Decline G Suite upsell', async function () {
			await domainSearchComponent.clickButton( 'Skip for now' );
		} );

		it( 'See secure payment', async function () {
			cartCheckoutPage = new CartCheckoutPage( page );
			await cartCheckoutPage.selectPaymentMethod( paymentMethod );
		} );

		it( 'Remove domain cart item', async function () {
			await cartCheckoutPage.removeCartItem( selectedDomain );
		} );
	} );
} );
