import { Page } from 'playwright';

const selectors = {
	// Search for a domain page
	searchInput: `input[aria-label="What would you like your domain name to be?"]`,
	placeholder: `.is-placeholder`,
	searchResult: `.domain-suggestion__content`,
};

export class DomainSearchComponent {
	private page: Page;

	constructor( page: Page ) {
		this.page = page;
	}

	async search( keyword: string ): Promise< void > {
		await this.page.fill( selectors.searchInput, keyword );
		await this.page.waitForSelector( selectors.placeholder, { state: 'detached' } );
	}

	async selectDomain( keyword: string ): Promise< string > {
		const selector = `${ selectors.searchResult }:has-text("${ keyword }")`;
		const targetItem = await this.page.waitForSelector( selector );
		const selectedDomain = await targetItem
			.waitForSelector( 'h3' )
			.then( ( el ) => el.innerText() );

		await Promise.all( [ this.page.waitForNavigation(), targetItem.click() ] );

		return selectedDomain;
	}

	async clickButton( text: string ): Promise< void > {
		await this.page.click( `button:text-is("${ text }")` );
	}
}
