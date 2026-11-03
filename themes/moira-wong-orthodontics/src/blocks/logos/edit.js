import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import MediaControl, { plusIcon } from '../../utils/media-control';
import { observeLogosRow } from '../../utils/balance-logos';

// Basic inline formatting only; the title stays a single line.
const TITLE_FORMATS = [
	'core/bold',
	'core/italic',
	'core/link',
	'core/text-color',
];

const toImage = ( media ) => ( {
	id: media.id,
	url: media.url,
	alt: media.alt || '',
} );

export default function Edit( { attributes, setAttributes } ) {
	const { showTitle, title, images, maxHeight } = attributes;

	const blockProps = useBlockProps( { className: 'mw-logos mw-section' } );

	// Balance the rows by real logo widths, as the front end does.
	const rowRef = useRef();
	useEffect( () => {
		const row = rowRef.current;
		return row ? observeLogosRow( row ) : undefined;
	}, [ images.length, maxHeight ] );

	const addImages = ( media ) =>
		setAttributes( { images: [ ...images, ...media.map( toImage ) ] } );

	const updateImage = ( index, media ) => {
		const next = [ ...images ];
		next[ index ] = toImage( media );
		setAttributes( { images: next } );
	};

	const updateAlt = ( index, alt ) => {
		const next = [ ...images ];
		next[ index ] = { ...next[ index ], alt };
		setAttributes( { images: next } );
	};

	const removeImage = ( index ) =>
		setAttributes( { images: images.filter( ( _, i ) => i !== index ) } );

	const moveImage = ( index, offset ) => {
		const target = index + offset;
		if ( target < 0 || target >= images.length ) {
			return;
		}
		const next = [ ...images ];
		const [ moved ] = next.splice( index, 1 );
		next.splice( target, 0, moved );
		setAttributes( { images: next } );
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ addImages }
							allowedTypes={ [ 'image' ] }
							multiple
							render={ ( { open } ) => (
								<ToolbarButton
									icon={ plusIcon }
									text={ __(
										'Add logo',
										'moira-wong-orthodontics'
									) }
									label={ __(
										'Add logo',
										'moira-wong-orthodontics'
									) }
									onClick={ open }
								/>
							) }
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Logos', 'moira-wong-orthodontics' ) }>
					<ToggleControl
						label={ __( 'Show title', 'moira-wong-orthodontics' ) }
						checked={ showTitle }
						onChange={ ( value ) =>
							setAttributes( { showTitle: value } )
						}
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={ __(
							'Max logo height (px)',
							'moira-wong-orthodontics'
						) }
						help={ __(
							'Logos never scale above their original size.',
							'moira-wong-orthodontics'
						) }
						value={ maxHeight }
						onChange={ ( value ) =>
							setAttributes( { maxHeight: value } )
						}
						min={ 24 }
						max={ 160 }
						__next40pxDefaultSize
					/>
				</PanelBody>
				{ images.length > 0 && (
					<PanelBody
						title={ __( 'Alt text', 'moira-wong-orthodontics' ) }
						initialOpen
					>
						<p
							style={ {
								margin: '0 0 12px',
								color: '#757575',
								fontSize: '12px',
								lineHeight: '18px',
							} }
						>
							{ __(
								'Name the organisation each logo shows.',
								'moira-wong-orthodontics'
							) }
						</p>
						{ images.map( ( image, index ) => (
							<div
								key={ image.id ?? index }
								style={ {
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									marginBottom: '8px',
								} }
							>
								<img
									src={ image.url }
									alt=""
									style={ {
										flex: 'none',
										width: '48px',
										height: '32px',
										objectFit: 'contain',
										background: '#f0f0f0',
									} }
								/>
								<div style={ { flex: 1, minWidth: 0 } }>
									<TextControl
										label={ sprintf(
											/* translators: %d: position of the logo */
											__(
												'Alt text of logo %d',
												'moira-wong-orthodontics'
											),
											index + 1
										) }
										hideLabelFromVision
										value={ image.alt || '' }
										onChange={ ( value ) =>
											updateAlt( index, value )
										}
										__nextHasNoMarginBottom
										__next40pxDefaultSize
									/>
								</div>
							</div>
						) ) }
					</PanelBody>
				) }
			</InspectorControls>
			<section { ...blockProps }>
				<div className="mw-content">
					{ showTitle && (
						<RichText
							tagName="p"
							className="mw-logos__title"
							identifier="title"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							placeholder={ __(
								'Title (optional)',
								'moira-wong-orthodontics'
							) }
							allowedFormats={ TITLE_FORMATS }
							disableLineBreaks
						/>
					) }
					{ images.length === 0 ? (
						<MediaPlaceholder
							className="mw-logos__placeholder"
							icon="awards"
							labels={ {
								title: __( 'Logos', 'moira-wong-orthodontics' ),
								instructions: __(
									'Choose logos from the media library or upload them.',
									'moira-wong-orthodontics'
								),
							} }
							onSelect={ ( media ) =>
								setAttributes( {
									images: media.map( toImage ),
								} )
							}
							accept="image/*"
							allowedTypes={ [ 'image' ] }
							multiple
						/>
					) : (
						<div
							ref={ rowRef }
							className="mw-logos__row"
							style={ {
								'--mw-logos-max-height': `${ maxHeight }px`,
							} }
						>
							{ images.map( ( image, index ) => (
								<MediaControl
									// image.id is stable across reorders, so React moves the DOM
									// node with it and focus stays on the moved logo.
									key={ image.id ?? index }
									className="mw-logos__item"
									url={ image.url }
									alt={ image.alt }
									id={ image.id }
									title={ __(
										'Logo',
										'moira-wong-orthodontics'
									) }
									onSelect={ ( media ) =>
										updateImage( index, media )
									}
									onRemove={ () => removeImage( index ) }
									onMoveLeft={
										images.length > 1
											? () => moveImage( index, -1 )
											: undefined
									}
									onMoveRight={
										images.length > 1
											? () => moveImage( index, 1 )
											: undefined
									}
									moveLeftDisabled={ index === 0 }
									moveRightDisabled={
										index === images.length - 1
									}
								/>
							) ) }
						</div>
					) }
				</div>
			</section>
		</>
	);
}
