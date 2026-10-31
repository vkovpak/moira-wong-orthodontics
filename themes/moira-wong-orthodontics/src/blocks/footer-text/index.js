import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import save from './save';

// The block used to be dynamic: only its inner blocks were saved, the wrapper
// and the icon were written on the server. Content saved that way is converted
// when the template part is opened in the editor.
const deprecated = [
	{
		attributes: metadata.attributes,
		save: () => <InnerBlocks.Content />,
	},
];

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated,
} );
