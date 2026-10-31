import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

// The block used to be dynamic: only its inner blocks were saved, the wrapper
// was written on the server. Content saved that way is converted when the
// template part is opened in the editor.
const deprecated = [
	{
		attributes: { align: { type: 'string' } },
		save: () => <InnerBlocks.Content />,
	},
];

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated,
} );
