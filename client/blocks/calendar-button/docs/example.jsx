import React from 'react';
import CalendarButton from 'calypso/blocks/calendar-button';

const CalendarButtonExample = () => {
	const tomorrow = new Date( new Date().getTime() + 24 * 60 * 60 * 1000 );
	return (
		<CalendarButton
			primary
			showOutsideDays={ false }
			disabledDays={ [ { before: new Date() } ] }
			selectedDay={ tomorrow }
		/>
	);
};

CalendarButtonExample.displayName = 'CalendarButton';

export default CalendarButtonExample;
