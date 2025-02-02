import { FontSizePicker } from '@wordpress/components';
import React, { useState } from 'react';

const FontSizePickerExample = () => {
	const [ fontSize, setFontSize ] = useState< number | undefined >( 16 );

	return (
		<FontSizePicker
			fontSizes={ [
				{
					name: 'Small',
					slug: 'small',
					size: 12,
				},
				{
					name: 'Normal',
					slug: 'normal',
					size: 16,
				},
				{
					name: 'Big',
					slug: 'big',
					size: 26,
				},
			] }
			value={ fontSize }
			onChange={ setFontSize }
		/>
	);
};

export default FontSizePickerExample;
