import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';

// The block used to be dynamic: its text was an attribute in the block comment
// and nothing was saved as markup. Content saved that way is converted when the
// template part is opened in the editor.
const deprecated = [
	{
		attributes: {
			content: { type: 'string', default: '' },
			placeholder: { type: 'string', default: '' },
		},
		save: () => null,
	},
];

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated,
} );
