import { get } from 'lodash';

import 'calypso/state/importer-nux/init';

// TODO: Follow project conventions once finalised
export const getNuxUrlInputValue = ( state ) => get( state, 'importerNux.urlInputValue' );

export const getSiteDetails = ( state ) => get( state, 'importerNux.siteDetails' );

export const getSelectedImportEngine = ( state ) => get( getSiteDetails( state ), 'siteEngine' );

export const getImporterSiteUrl = ( state ) => get( getSiteDetails( state ), 'siteUrl' );
