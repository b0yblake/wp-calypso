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

	constructor( page: Page ) {
		this.page = page;
	}

	async addDomaintoSite(): Promise< void > {
		await Promise.all( [
			this.page.waitForNavigation(),
			this.page.click( selectors.searchDomainButton ),
		] );
	}
}
