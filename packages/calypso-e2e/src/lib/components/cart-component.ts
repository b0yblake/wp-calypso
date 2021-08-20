import { Page } from 'playwright';

const selectors = {
	cartButton: '.popover-cart',
	cartPopover: '.popover-cart__popover',

	cartItems: '.cart-item',
	moreItems: 'a:has-text("more items")',
	removeItemButton: 'button[aria-label="Remove item"]',
};

/**
 * Component for the Upgrade Shopping Cart.
 */
export class CartComponent {
	private page: Page;

	/**
	 * Constructs an instance of the component.
	 *
	 * @param {Page} page The underlying page.
	 */
	constructor( page: Page ) {
		this.page = page;
	}

	async openCart(): Promise< void > {
		const isOpen = await this.page.isVisible( selectors.cartPopover );
		if ( ! isOpen ) {
			await this.page.click( selectors.cartButton );
		}
		await this.page.waitForSelector( selectors.cartPopover );
	}

	async closeCart(): Promise< void > {
		const isOpen = await this.page.isVisible( selectors.cartPopover );
		if ( isOpen ) {
			await this.page.click( selectors.cartButton );
		}
		await this.page.waitForSelector( selectors.cartPopover, { state: 'detached' } );
	}

	async removeItem( keyword: string ): Promise< void > {
		const expander = await this.page.isVisible( selectors.moreItems );
		if ( expander ) {
			await this.page.click( selectors.moreItems );
		}

		const targetItem = await this.page.waitForSelector(
			`${ selectors.cartItems }:has-text("${ keyword }")`
		);
		const removeButton = await targetItem.waitForSelector( selectors.removeItemButton );
		await removeButton.click();
	}

	// async removeDomain( name: string ): Promise< void > {
	// 	const expander = await this.page.isVisible( selectors.moreItems )
	// 	if ( expander ) {
	// 		await this.page.click( selectors.moreItems );
	// 	}

	// 	const popOver = await this.page.waitForSelector( selectors.popOver );
	// 	const items = await popOver.$$( selectors.cartItems );
	// 	const numItems = items.length;

	// 	for ( const item of items ) {
	// 		const match = await item.$( `text=${ name }` );

	// 		if ( match ) {
	// 			console.log( 'match!' );
	// 			const removeButton = await item.waitForSelector( '.cart__remove-item' );
	// 			console.log( removeButton );

	// 			await removeButton.click();
	// 			await popOver.waitForElementState( 'stable' );
	// 		}
	// 	}

	// 	if ( numItems === 1 ) {
	// 		await this.page.waitForSelector( selectors.showCartButton, { state: 'hidden' } );
	// 	}
	// }
}
