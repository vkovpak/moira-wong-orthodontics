import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading', 'core/list' ];

const TEMPLATE = [
	[
		'core/paragraph',
		{ placeholder: __( 'Text', 'moira-wong-orthodontics' ) },
	],
];

function Edit() {
	return (
		<div { ...useBlockProps( { className: 'mw-appt__text' } ) }>
			<InnerBlocks
				template={ TEMPLATE }
				allowedBlocks={ ALLOWED_BLOCKS }
				templateLock={ false }
			/>
		</div>
	);
}

function save() {
	return (
		<div { ...useBlockProps.save( { className: 'mw-appt__text' } ) }>
			<InnerBlocks.Content />
		</div>
	);
}

registerBlockType( metadata.name, { edit: Edit, save } );
