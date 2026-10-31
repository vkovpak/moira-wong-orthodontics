import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	if ( RichText.isEmpty( attributes.content ) ) {
		return null;
	}

	return (
		<RichText.Content
			{ ...useBlockProps.save() }
			tagName="p"
			value={ attributes.content }
		/>
	);
}
