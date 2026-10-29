import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save( {
			className: 'mw-testimonials mw-section',
		} );

		return (
			<section { ...blockProps }>
				<div className="mw-content">
					{ ! RichText.isEmpty( attributes.title ) && (
						<RichText.Content
							tagName="h2"
							className="mw-testimonials__title"
							value={ attributes.title }
						/>
					) }
					<div className="mw-testimonials__list">
						<InnerBlocks.Content />
					</div>
				</div>
			</section>
		);
	},
} );
