import {
	DataHelper,
	LoginFlow,
	SidebarComponent,
	DomainsPage,
	DomainSearchComponent,
	CartComponent,
	setupHooks,
	CartCheckoutPage,
} from '@automattic/calypso-e2e';
import { Page } from 'playwright';

describe( DataHelper.createSuiteTitle( 'Domains: Add ' ), function () {
	const phrase = DataHelper.randomPhrase();

	let sidebarComponent: SidebarComponent;
	let domainSearchComponent: DomainSearchComponent;
	let cartCheckoutPage: CartCheckoutPage;
	let page: Page;
	let selectedDomain: string;

	setupHooks( ( args ) => {
		page = args.page;
	} );

	it( 'Log in', async function () {
		const loginFlow = new LoginFlow( page );
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
		await cartCheckoutPage.selectPaymentMethod( 'Credit Card' );
	} );

	it( 'Return to Upgrades > Domains', async function () {
		await cartCheckoutPage.close();
		await sidebarComponent.gotoMenu( { item: 'Upgrades', subitem: 'Domains' } );
	} );

	it( 'Remove domain from cart', async function () {
		const cartComponent = new CartComponent( page );
		await cartComponent.openCart();
		await cartComponent.removeItem( selectedDomain );
	} );
} );
