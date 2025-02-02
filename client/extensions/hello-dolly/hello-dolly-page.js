import { Button, Card } from '@automattic/components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FAQ from 'calypso/components/faq';
import FAQItem from 'calypso/components/faq/faq-item';
import Main from 'calypso/components/main';
import SectionHeader from 'calypso/components/section-header';
import { nextLyric } from './state/actions';
import getLyric from './state/selectors';

class HelloDollyPage extends Component {
	static propTypes = {
		currentLyric: PropTypes.string.isRequired,
		nextLyric: PropTypes.func.isRequired,
	};

	render() {
		const { currentLyric } = this.props;

		return (
			<Main className="hello-dolly__main">
				<SectionHeader label="Hello, Dolly!">
					<span role="img" aria-label="sheep">
						🐑
					</span>
				</SectionHeader>
				<Card>
					<p style={ { fontSize: 18 } }>
						This is not just an extension, it symbolizes the hope and enthusiasm of an entire
						generation summed up in two words sung most famously by Louis Armstrong.
					</p>
					<p style={ { fontSize: 24, fontWeight: 500, textAlign: 'center', margin: '0 auto' } }>
						{ currentLyric }
					</p>
					<div style={ { margin: '16px auto 32px', textAlign: 'center' } }>
						<Button primary onClick={ this.props.nextLyric }>
							Next
						</Button>
					</div>
					<hr />
					<p>
						This section is the home for the <strong>Hello Dolly</strong> extension.
					</p>
					<p>
						Extensions are set up to function in a semi-isolated environment, with their own URL
						path and code-chunk magic (using the power of webpack) to assure code is loaded only
						when needed. Think of extensions as individual "apps" you can access in Calypso to
						interact with your plugin functionality in a focused way.
					</p>
				</Card>
				<FAQ>
					<FAQItem
						question="How can I get started?"
						answer={ [
							'Head over to the "extensions" folder in the repository where we have a more comprehensive ',
							'README file to walk you through the process. ',
							<a
								href="https://github.com/Automattic/wp-calypso/tree/HEAD/client/extensions"
								key="get-started"
							>
								Get Started
							</a>,
						] }
					/>
					<FAQItem
						question="Learning about Calypso"
						answer={ [
							'You can browse our docs without leaving the running application, just go to the Devdocs section. ',
							'Tip: press the keys "gd" to navigate there from any page! ',
							<a href="/devdocs" key="go-devdocs">
								Go to Devdocs
							</a>,
						] }
					/>
					<FAQItem
						question="Have more questions?"
						answer={ [
							"Let's talk! Visit the ",
							<a href="https://github.com/Automattic/wp-calypso/" key="go-repo">
								Calypso GitHub repository
							</a>,
							' and open an issue.',
						] }
					/>
				</FAQ>
			</Main>
		);
	}
}

function mapStateToProps( state ) {
	const currentLyric = getLyric( state );

	return {
		currentLyric,
	};
}

export default connect( mapStateToProps, { nextLyric } )( HelloDollyPage );
