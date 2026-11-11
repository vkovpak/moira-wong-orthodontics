import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import { useDispatch, useRegistry } from '@wordpress/data';
import {
	useBlockProps,
	InnerBlocks,
	MediaPlaceholder,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import MediaControl, { imageIcon } from '../../utils/media-control';
import usePhotoAttributes from '../../utils/use-photo-attributes';
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

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { hasPhoto, photoPosition, mediaId, mediaUrl, mediaAlt } = attributes;

	const blockProps = useBlockProps( {
		className: `mw-intro mw-section${
			hasPhoto && photoPosition === 'right' ? ' photo-right' : ''
		}`,
	} );

	const { onSelect, onRemove } = usePhotoAttributes( setAttributes );

	// Without a photo the buttons are centred, as a real setting of the buttons
	// block (the toolbar's "left" is the schema default and stores nothing, so a
	// CSS default could not be switched back). A justification chosen by hand is
	// left as it is.
	const registry = useRegistry();
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	const isFirstRender = useRef( true );
	useEffect( () => {
		if ( isFirstRender.current ) {
			isFirstRender.current = false;
			return;
		}

		registry
			.select( blockEditorStore )
			.getBlocks( clientId )
			.filter( ( block ) => block.name === 'core/buttons' )
			.forEach( ( block ) => {
				const layout = block.attributes.layout || {};

				if ( ! hasPhoto && ! layout.justifyContent ) {
					updateBlockAttributes( block.clientId, {
						layout: {
							...layout,
							type: 'flex',
							justifyContent: 'center',
						},
					} );
				}

				if ( hasPhoto && layout.justifyContent === 'center' ) {
					const { justifyContent, ...rest } = layout;
					updateBlockAttributes( block.clientId, { layout: rest } );
				}
			} );
	}, [ hasPhoto ] );

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
