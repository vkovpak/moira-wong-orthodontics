import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import MediaControl, { imageIcon } from '../../utils/media-control';
import usePhotoAttributes from '../../utils/use-photo-attributes';
import PhotoControls from '../../utils/photo-controls';

// Heading, text and button are the usual core blocks, so they keep their own
// toolbars; the theme styles them inside .mw-hero__text.
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

const TEMPLATE = [
	[
		'core/heading',
		{
			level: 1,
			placeholder: __( 'Heading', 'moira-wong-orthodontics' ),
		},
	],
	[
		'core/paragraph',
		{ placeholder: __( 'Text', 'moira-wong-orthodontics' ) },
	],
	[
		'core/buttons',
		{},
		[
			[
				'core/button',
				{
					text: __( 'Button', 'moira-wong-orthodontics' ),
					className: 'is-style-button-dark',
				},
			],
		],
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { hasPhoto, mediaId, mediaUrl, mediaAlt } = attributes;

	const blockProps = useBlockProps( { className: 'mw-hero mw-section' } );

	const { onSelect, onRemove } = usePhotoAttributes( setAttributes );

	return (
		<>
			<PhotoControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<section { ...blockProps }>
				<div className="mw-content mw-hero__layout">
					<div className="mw-hero__text">
						<InnerBlocks
							template={ TEMPLATE }
							allowedBlocks={ ALLOWED_BLOCKS }
							templateLock={ false }
						/>
					</div>
					{ hasPhoto && (
						<div className="mw-hero__photo">
							{ mediaUrl ? (
								<MediaControl
									className="mw-hero__image"
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
									className="mw-photo-placeholder mw-hero__placeholder"
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
					) }
				</div>
			</section>
		</>
	);
}
