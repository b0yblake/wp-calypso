import { Page } from 'playwright';

export type PaymentMethods = 'Credit Card' | 'Paypal' | 'Free';

const selectors = {
	modalContinueButton: 'button:text("Continue")',
	closeCheckoutButton: `[title="Close Checkout"]`,

	// Cart items
	cartItem: ( itemName: string ) =>
		`[data-testid="review-order-step--visible"] .checkout-line-item >> text=${ itemName.trim() }`,
	removeCartItemButton: ( itemName: string ) =>
		`[data-testid="review-order-step--visible"] button[aria-label*="Remove ${ itemName.trim() } from cart"]`,
};

/**
 * Page representing the cart checkout page for purchases made in Upgrades.
 */
export class CartCheckoutPage {
	private page: Page;

	/**
	 * Constructs an instance of the Cart Checkout POM.
	 *
	 * @param {Page} page Instance of the Playwright page
	 */
	constructor( page: Page ) {
		this.page = page;
	}

	/**
	 * Closes the secure checkout page and return to the previous screen.
	 */
	async close(): Promise< void > {
		await Promise.all( [
			this.page.waitForNavigation(),
			this.page.click( selectors.closeCheckoutButton ),
		] );
	}

	/**
	 * Select the payment method to be used.
	 *
	 * @param {PaymentMethods} method The payment method to be used.
	 */
	async selectPaymentMethod( method: PaymentMethods ): Promise< void > {
		await this.page.check( `input[aria-label="${ method }"]` );
	}

	/**
	 * Validates that an item is in the cart with the expected text. Throws if it isn't.
	 *
	 * @param {string} expectedCartItemName Expected text for the name of the item in the cart.
	 * @throws If the expected cart item is not found in the timeout period.
	 */
	async validateCartItem( expectedCartItemName: string ): Promise< void > {
		await this.page.waitForSelector( selectors.cartItem( expectedCartItemName ) );
	}

	/**
	 * Removes the specified cart item from the cart completely.
	 *
	 * @param {string} cartItemName Name of the item to remove from the cart.
	 */
	async removeCartItem( cartItemName: string ): Promise< void > {
		const cartItems = await this.page.$$( `.checkout-line-item` );
		await this.page.click( selectors.removeCartItemButton( cartItemName ) );

		// If the only item in cart is removed, the checkout is automatically dismissed,
		// navigating user back to the Upgrades > Plans page with the Plans tab selected.
		if ( cartItems.length === 1 ) {
			await Promise.all( [
				this.page.waitForNavigation(),
				this.page.click( selectors.modalContinueButton ),
			] );
		} else {
			await Promise.all( [
				this.page.waitForLoadState( 'load' ),
				this.page.click( selectors.modalContinueButton ),
			] );
		}
	}
}
