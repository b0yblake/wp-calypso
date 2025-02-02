import events from 'events';
import { expect } from 'chai';
import sinon from 'sinon';
import { logSectionResponse } from 'calypso/server/pages/analytics';
import { useFakeTimers } from 'calypso/test-helpers/use-sinon';
import analytics from '../../lib/analytics';

const TWO_SECONDS = 2000;
const noop = () => {};

describe( 'index', () => {
	describe( 'logSectionResponse middleware', () => {
		// Stub request, response, and next
		let request;
		let response;
		let next;
		let request2;
		let response2;
		beforeEach( () => {
			request = { context: {} };
			request2 = { context: {} };
			response = new events.EventEmitter();
			response2 = new events.EventEmitter();
			next = noop;
		} );

		describe( 'when rendering a section', () => {
			let clock;

			useFakeTimers( ( newClock ) => ( clock = newClock ) );

			beforeEach( () => {
				sinon.stub( analytics.statsd, 'recordTiming' );
				sinon.stub( analytics.statsd, 'recordCounting' );
				request.context.sectionName = 'reader';
				request.context.target = 'fallback';
			} );

			afterEach( () => {
				analytics.statsd.recordTiming.restore();
				analytics.statsd.recordCounting.restore();
			} );

			test( 'logs response analytics', () => {
				// Clear throttling
				clock.tick( TWO_SECONDS );

				logSectionResponse( request, response, next );

				// Move time forward and mock the "finish" event
				clock.tick( TWO_SECONDS );
				response.emit( 'finish' );

				expect( analytics.statsd.recordTiming ).to.have.been.calledWith(
					'reader',
					'response-time',
					TWO_SECONDS
				);

				expect( analytics.statsd.recordCounting ).to.have.been.calledWith(
					'reader',
					'target.fallback'
				);
			} );

			test( 'does not log build target if not defined', () => {
				request.context.target = undefined;

				// Clear throttling
				clock.tick( TWO_SECONDS );

				logSectionResponse( request, response, next );

				// Move time forward and mock the "finish" event
				clock.tick( TWO_SECONDS );
				response.emit( 'finish' );

				expect( analytics.statsd.recordTiming ).to.have.been.calledWith(
					'reader',
					'response-time',
					TWO_SECONDS
				);

				expect( analytics.statsd.recordCounting ).not.to.have.been.called;
			} );

			test( 'throttles calls to log analytics', () => {
				// Clear throttling
				clock.tick( TWO_SECONDS );

				logSectionResponse( request, response, next );
				logSectionResponse( request2, response2, next );

				response.emit( 'finish' );
				response2.emit( 'finish' );

				expect( analytics.statsd.recordTiming ).to.have.been.calledOnce;
				expect( analytics.statsd.recordCounting ).to.have.been.calledOnce;

				clock.tick( TWO_SECONDS );
				response.emit( 'finish' );
				response2.emit( 'finish' );

				expect( analytics.statsd.recordTiming ).to.have.been.calledTwice;
				expect( analytics.statsd.recordCounting ).to.have.been.calledTwice;
			} );
		} );

		describe( 'when not rendering a section', () => {
			beforeEach( () => {
				sinon.stub( analytics.statsd, 'recordTiming' );
				sinon.stub( analytics.statsd, 'recordCounting' );
			} );

			afterEach( () => {
				analytics.statsd.recordTiming.restore();
				analytics.statsd.recordCounting.restore();
			} );

			test( 'does not log response time analytics', () => {
				logSectionResponse( request, response, next );

				// Mock the "finish" event
				response.emit( 'finish' );

				expect( analytics.statsd.recordTiming ).not.to.have.been.called;
				expect( analytics.statsd.recordCounting ).not.to.have.been.called;
			} );
		} );
	} );
} );
