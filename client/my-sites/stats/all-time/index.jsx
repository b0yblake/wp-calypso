import { Card } from '@automattic/components';
import classNames from 'classnames';
import { localize } from 'i18n-calypso';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuerySiteStats from 'calypso/components/data/query-site-stats';
import { withLocalizedMoment } from 'calypso/components/localized-moment';
import SectionHeader from 'calypso/components/section-header';
import {
	isRequestingSiteStatsForQuery,
	getSiteStatsNormalizedData,
} from 'calypso/state/stats/lists/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';
import StatsTabs from '../stats-tabs';
import StatsTab from '../stats-tabs/tab';

import './style.scss';

class StatsAllTime extends Component {
	static propTypes = {
		translate: PropTypes.func,
		siteId: PropTypes.number,
		requesting: PropTypes.bool,
		query: PropTypes.object,
		comments: PropTypes.number,
		posts: PropTypes.number,
		views: PropTypes.number,
		viewsBestDay: PropTypes.string,
		viewsBestDayTotal: PropTypes.number,
	};

	render() {
		const {
			translate,
			siteId,
			requesting,
			comments,
			posts,
			views,
			visitors,
			viewsBestDay,
			viewsBestDayTotal,
			query,
		} = this.props;
		const isLoading = requesting && ! views;

		let bestDay;

		if ( viewsBestDay && ! isLoading ) {
			bestDay = this.props.moment( viewsBestDay ).format( 'LL' );
		}

		const classes = {
			'is-loading': requesting,
		};

		return (
			<div>
				{ siteId && <QuerySiteStats siteId={ siteId } statType="stats" query={ query } /> }
				<SectionHeader label={ translate( 'All-time posts, comments, views, and visitors' ) } />
				<Card className={ classNames( 'stats-module', 'all-time', classes ) }>
					<StatsTabs borderless>
						<StatsTab
							gridicon="posts"
							label={ translate( 'Posts' ) }
							loading={ isLoading }
							value={ posts }
							compact
						/>
						<StatsTab
							gridicon="comment"
							label={ translate( 'Comments' ) }
							loading={ isLoading }
							value={ comments }
							compact
						/>
						<StatsTab
							gridicon="visible"
							label={ translate( 'Views' ) }
							loading={ isLoading }
							value={ views }
							compact
						/>
						<StatsTab
							gridicon="user"
							label={ translate( 'Visitors' ) }
							loading={ isLoading }
							value={ visitors }
							compact
						/>
						<StatsTab
							className="all-time__is-best"
							gridicon="trophy"
							label={ translate( 'Best views ever' ) }
							loading={ isLoading }
							value={ viewsBestDayTotal }
							compact
						>
							<span className="all-time__best-day">{ bestDay }</span>
						</StatsTab>
					</StatsTabs>
				</Card>
			</div>
		);
	}
}

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	const query = {};
	const allTimeData = getSiteStatsNormalizedData( state, siteId, 'stats', query ) || {};
	const allTimeStats = pick( allTimeData, [
		'comments',
		'posts',
		'views',
		'visitors',
		'viewsBestDay',
		'viewsBestDayTotal',
	] );

	return {
		requesting: isRequestingSiteStatsForQuery( state, siteId, 'stats', query ),
		query,
		siteId,
		...allTimeStats,
	};
} )( localize( withLocalizedMoment( StatsAllTime ) ) );
