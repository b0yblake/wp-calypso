import i18n from 'i18n-calypso';
import PropTypes from 'prop-types';
import React from 'react';
import PurchaseDetail from 'calypso/components/purchase-detail';
import { newPost } from 'calypso/lib/paths';

const ChargebackDetails = ( { selectedSite } ) => {
	return (
		<PurchaseDetail
			icon="create"
			title={ i18n.translate( 'Get back to posting' ) }
			description={ i18n.translate(
				'You can now use the full features of your site, without limits.'
			) }
			buttonText={ i18n.translate( 'Write a Post' ) }
			href={ newPost( selectedSite ) }
		/>
	);
};

ChargebackDetails.propTypes = {
	selectedSite: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.object ] ).isRequired,
};

export default ChargebackDetails;
