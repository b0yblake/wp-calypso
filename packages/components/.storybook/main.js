const path = require( 'path' );

module.exports = {
	core: {
		builder: "webpack5",
	},
	stories: [ '../src/**/*.stories.{js,jsx,ts,tsx}' ],
	addons: [ '@storybook/addon-actions', '@storybook/preset-scss' ],
	typescript: {
		check: false,
		reactDocgen: false,
	},
};
