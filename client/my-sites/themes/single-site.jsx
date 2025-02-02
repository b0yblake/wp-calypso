import { localize } from 'i18n-calypso';
import React from 'react';
import { connect } from 'react-redux';
import Main from 'calypso/components/main';
import { isJetpackSite } from 'calypso/state/sites/selectors';
import { isThemeActive } from 'calypso/state/themes/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';
import SingleSiteThemeShowcaseJetpack from './single-site-jetpack';
import SingleSiteThemeShowcaseWpcom from './single-site-wpcom';

const SingleSiteThemeShowcaseWithOptions = ( props ) => {
	const { isJetpack, siteId, translate } = props;

	// If we've only just switched from single to multi-site, there's a chance
	// this component is still being rendered with site unset, so we need to guard
	// against that case.
	if ( ! siteId ) {
		return <Main fullWidthLayout className="themes" />;
	}

	if ( isJetpack ) {
		return (
			<SingleSiteThemeShowcaseJetpack
				{ ...props }
				siteId={ siteId }
				defaultOption="activate"
				secondaryOption="tryandcustomize"
				source="showcase"
				listLabel={ translate( 'Uploaded themes' ) }
				placeholderCount={ 5 }
			/>
		);
	}

	return (
		<SingleSiteThemeShowcaseWpcom
			{ ...props }
			origin="wpcom"
			siteId={ siteId }
			defaultOption="activate"
			secondaryOption="tryandcustomize"
			source="showcase"
		/>
	);
};

export default connect( ( state ) => {
	const selectedSiteId = getSelectedSiteId( state );
	return {
		siteId: selectedSiteId,
		isJetpack: isJetpackSite( state, selectedSiteId ),
		getScreenshotOption: ( themeId ) =>
			isThemeActive( state, themeId, selectedSiteId ) ? 'customize' : 'info',
	};
} )( localize( SingleSiteThemeShowcaseWithOptions ) );
