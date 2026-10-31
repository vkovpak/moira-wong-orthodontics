import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import MediaControl, { imageIcon } from '../../utils/media-control';
import usePhotoAttributes from '../../utils/use-photo-attributes';
import PhotoControls from '../../utils/photo-controls';

// Heading and paragraphs are the usual core blocks, so they keep their own
// toolbars; the theme styles them inside .mw-about__text.
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph' ];
const FORMATS = [ 'core/bold', 'core/italic' ];

const TEMPLATE = [
	[
		'core/heading',
		{
			level: 2,
			placeholder: __( 'Heading', 'moira-wong-orthodontics' ),
		},
	],
	[
		'core/paragraph',
		{ placeholder: __( 'Text', 'moira-wong-orthodontics' ) },
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { hasPhoto, photoPosition, mediaId, mediaUrl, mediaAlt } = attributes;

	const blockProps = useBlockProps( {
		className: `mw-about mw-section${
			hasPhoto && photoPosition === 'left' ? ' photo-left' : ''
		}`,
	} );

	const { onSelect, onRemove } = usePhotoAttributes( setAttributes );

	const field = ( className, key, placeholder ) => (
		<RichText
			tagName="p"
			className={ className }
			value={ attributes[ key ] }
			onChange={ ( value ) => setAttributes( { [ key ]: value } ) }
			placeholder={ placeholder }
			allowedFormats={ FORMATS }
		/>
	);

	return (
		<>
			<PhotoControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				withPosition
			/>
			<section { ...blockProps }>
				<div className="mw-content mw-about__layout">
					<div className="mw-about__text">
						<InnerBlocks
							template={ TEMPLATE }
							allowedBlocks={ ALLOWED_BLOCKS }
							templateLock={ false }
						/>
						<div className="mw-about__review">
							{ field(
								'mw-about__review-quote',
								'reviewQuote',
								__( 'Review', 'moira-wong-orthodontics' )
							) }
							{ field(
								'mw-about__review-name',
								'reviewName',
								__( 'Who said it', 'moira-wong-orthodontics' )
							) }
						</div>
					</div>
					{ hasPhoto && (
						<div className="mw-about__photo">
							<div className="mw-about__figure">
								<div className="mw-about__bubble">
									{ field(
										'mw-about__bubble-quote',
										'bubbleQuote',
										__( 'Quote', 'moira-wong-orthodontics' )
									) }
									{ field(
										'mw-about__bubble-name',
										'bubbleName',
										__(
											'Who said it',
											'moira-wong-orthodontics'
										)
									) }
								</div>
								{ mediaUrl ? (
									<MediaControl
										className="mw-about__image"
										url={ mediaUrl }
										alt={ mediaAlt }
										id={ mediaId }
										title={ __(
											'Photo',
											'moira-wong-orthodontics'
										) }
										onSelect={ onSelect }
										onRemove={ onRemove }
									/>
								) : (
									<MediaPlaceholder
										className="mw-photo-placeholder mw-about__placeholder"
										icon={ imageIcon }
										labels={ {
											title: __(
												'Photo',
												'moira-wong-orthodontics'
											),
										} }
										allowedTypes={ [ 'image' ] }
										accept="image/*"
										onSelect={ onSelect }
									/>
								) }
							</div>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
