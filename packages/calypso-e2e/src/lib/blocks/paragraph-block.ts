import { expect } from '@jest/globals';
import assert from 'assert';
import { ElementHandle, Page } from 'playwright';

/**
 * Represents the Paragraph block of the post.
 */
export class ParagraphBlock {
	static blockName = 'Paragraph';
	block: ElementHandle;
	page: Page;

	constructor( block: ElementHandle, page: Page ) {
		this.block = block;
		this.page = page;
	}

	/**
	 * Enters text into the paragraph block and verifies the result.
	 *
	 * @param {string} text Text to be entered into the paragraph blocks, separated by newline characters.
	 * @returns {Promise<void>} No return value.
	 * @throws {assert.AssertionError} If text entered and text read back do not match.
	 */
	async enterText( text: string ): Promise< void > {
		const lines = text.split( '\n' );

		for await ( const line of lines ) {
			await this.page.keyboard.insertText( line );
			await this.block.press( 'Shift+Enter' );
		}

		const readBack = await this.getText();
		console.log( readBack );
		console.log( text );
		assert.strictEqual( readBack, text );
	}

	async getText(): Promise< string > {
		return await this.block.innerText();
	}
}
