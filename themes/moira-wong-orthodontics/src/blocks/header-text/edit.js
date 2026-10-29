import { useBlockProps, RichText } from '@wordpress/block-editor';

// Basic inline formatting only; the field stays single-line.
const ALLOWED_FORMATS = [
	'core/bold',
	'core/italic',
	'core/underline',
	'core/strikethrough',
	'core/link',
	'core/text-color',
];

export default function Edit( { attributes, setAttributes } ) {
	return (
		<RichText
			{ ...useBlockProps() }
			tagName="p"
			identifier="content"
			value={ attributes.content }
			onChange={ ( content ) => setAttributes( { content } ) }
			placeholder={ attributes.placeholder }
			allowedFormats={ ALLOWED_FORMATS }
			disableLineBreaks
		/>
	);
}
