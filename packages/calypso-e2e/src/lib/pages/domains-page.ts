import { Page } from 'playwright';

export type AddDomainTarget = 'this site' | 'new site' | 'different site' | 'without a site';

const selectors = {
	searchDomainButton: `:text-matches(".earch for a domain")`,
};

/**
 * Page representing the Upgrades > Domains page.
 */
export class DomainsPage {
	private page: Page;

	/**
	 * Constructs an instance of the component.
	 *
	 * @param {Page} page The underlying page.
	 */
	constructor( page: Page ) {
		this.page = page;
	}

	/**
	 * Clicks on the button to search for a domain to add to the current site.
	 */
	async addDomaintoSite(): Promise< void > {
		await Promise.all( [
			this.page.waitForNavigation(),
			this.page.click( selectors.searchDomainButton ),
		] );
	}
}
