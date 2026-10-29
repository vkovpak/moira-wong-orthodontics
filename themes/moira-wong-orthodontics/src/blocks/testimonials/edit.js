import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { plusIcon } from '../../utils/media-control';
import {
	useBlockProps,
	InnerBlocks,
	RichText,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

// Cards only, and as many as needed.
const ALLOWED_BLOCKS = [ 'mw/testimonial' ];

const TEMPLATE = [ [ 'mw/testimonial' ], [ 'mw/testimonial' ] ];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps( {
		className: 'mw-testimonials mw-section',
	} );

	const count = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount( clientId ),
		[ clientId ]
	);
	const { insertBlock } = useDispatch( blockEditorStore );
	const addTestimonial = () =>
		insertBlock( createBlock( 'mw/testimonial' ), count, clientId );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ plusIcon }
						text={ __(
							'Add testimonial',
							'moira-wong-orthodontics'
						) }
						label={ __(
							'Add testimonial',
							'moira-wong-orthodontics'
						) }
						onClick={ addTestimonial }
					/>
				</ToolbarGroup>
			</BlockControls>
			<section { ...blockProps }>
				<div className="mw-content">
					<RichText
						tagName="h2"
						className="mw-testimonials__title"
						value={ attributes.title }
						onChange={ ( title ) => setAttributes( { title } ) }
						placeholder={ __(
							'Heading',
							'moira-wong-orthodontics'
						) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
					<div className="mw-testimonials__list">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							orientation="horizontal"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
