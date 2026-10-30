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
			className: `mw-faq mw-section has-${ attributes.perRow }-per-row`,
		} );

		return (
			<section { ...blockProps }>
				<div className="mw-content">
					{ ! RichText.isEmpty( attributes.title ) && (
						<RichText.Content
							tagName="h2"
							className="mw-faq__title"
							value={ attributes.title }
						/>
					) }
					<div className="mw-faq__list">
						<InnerBlocks.Content />
					</div>
				</div>
			</section>
		);
	},
} );
