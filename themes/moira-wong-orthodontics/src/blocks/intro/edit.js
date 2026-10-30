import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import MediaControl, { imageIcon } from '../../utils/media-control';
import PhotoControls from '../../utils/photo-controls';

// Heading, text and button are the usual core blocks, so they keep their own
// toolbars; the theme styles them inside .mw-intro__text.
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

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
	[
		'core/buttons',
		{},
		[
			[
				'core/button',
				{ text: __( 'Button', 'moira-wong-orthodontics' ) },
			],
		],
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { hasPhoto, photoPosition, mediaId, mediaUrl, mediaAlt } = attributes;

	const blockProps = useBlockProps( {
		className: `mw-intro mw-section${
			hasPhoto && photoPosition === 'right' ? ' photo-right' : ''
		}`,
	} );

	const onSelect = ( media ) =>
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt || '',
		} );

	const onRemove = () =>
		setAttributes( { mediaId: undefined, mediaUrl: '', mediaAlt: '' } );

	return (
		<>
			<PhotoControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				withPosition
			/>
			<section { ...blockProps }>
				<div className="mw-content mw-intro__layout">
					{ hasPhoto && (
						<div className="mw-intro__photo">
							{ mediaUrl ? (
								<MediaControl
									className="mw-intro__image"
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
									className="mw-photo-placeholder mw-intro__placeholder"
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
					<div className="mw-intro__text">
						<InnerBlocks
							template={ TEMPLATE }
							allowedBlocks={ ALLOWED_BLOCKS }
							templateLock={ false }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
