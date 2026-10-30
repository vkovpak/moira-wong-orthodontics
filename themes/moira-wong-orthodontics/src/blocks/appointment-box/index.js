import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading', 'core/list' ];

// A heading and a numbered list; the list can be turned into one without
// numbers, and paragraphs can be added.
const TEMPLATE = [
	[
		'core/heading',
		{
			level: 3,
			placeholder: __( 'Heading', 'moira-wong-orthodontics' ),
		},
	],
	[ 'core/list', { ordered: true }, [ [ 'core/list-item' ] ] ],
];

registerBlockType( metadata.name, {
	edit: () => (
		<div { ...useBlockProps( { className: 'mw-appt-box' } ) }>
			<InnerBlocks
				template={ TEMPLATE }
				allowedBlocks={ ALLOWED_BLOCKS }
				templateLock={ false }
			/>
		</div>
	),
	save: () => (
		<div { ...useBlockProps.save( { className: 'mw-appt-box' } ) }>
			<InnerBlocks.Content />
		</div>
	),
} );
