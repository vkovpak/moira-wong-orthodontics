import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import MediaControl, { imageIcon } from '../../utils/media-control';
import usePhotoAttributes from '../../utils/use-photo-attributes';

const QUOTE_FORMATS = [ 'core/bold', 'core/italic' ];
const TEXT_FORMATS = [ 'core/bold', 'core/italic', 'core/link' ];

// One round photo slot: the picture with its hover toolbar, or an empty circle
// with the same dark toolbar as a filled one, holding one button that opens
// the media library.
function PhotoSlot( { kind, label, id, url, alt, onSelect, onRemove } ) {
	return (
		<span
			className={ `mw-testimonial__photo mw-testimonial__photo--${ kind }` }
		>
			{ url ? (
				<MediaControl
					className="mw-testimonial__image"
					url={ url }
					alt={ alt }
					id={ id }
					title={ label }
					onSelect={ onSelect }
					onRemove={ onRemove }
				/>
			) : (
				<div
					className="mw-testimonial__empty mw-media-control"
					tabIndex={ 0 }
					role="group"
					aria-label={ label }
				>
					<div className="mw-media-control__toolbar">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelect }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button
										icon={ imageIcon }
										label={ label }
										onClick={ open }
									/>
								) }
							/>
						</MediaUploadCheck>
					</div>
				</div>
			) }
		</span>
	);
}

// The alt text of one photo, with its thumbnail. Filled in from the media
// library when the picture is chosen; editing it here leaves the library as it
// is.
function AltField( { label, url, alt, onChange } ) {
	return (
		<div
			style={ {
				display: 'flex',
				alignItems: 'flex-start',
				gap: '8px',
				marginBottom: '12px',
			} }
		>
			<img
				src={ url }
				alt=""
				style={ {
					flex: 'none',
					width: '40px',
					height: '40px',
					borderRadius: '50%',
					objectFit: 'cover',
				} }
			/>
			<div style={ { flex: 1, minWidth: 0 } }>
				<TextControl
					label={ label }
					value={ alt || '' }
					onChange={ onChange }
					__nextHasNoMarginBottom
					__next40pxDefaultSize
				/>
			</div>
		</div>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		afterId,
		afterUrl,
		afterAlt,
		beforeId,
		beforeUrl,
		beforeAlt,
		quote,
		name,
		text,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'mw-testimonial has-photos',
	} );

	const after = usePhotoAttributes( setAttributes, 'after' );
	const before = usePhotoAttributes( setAttributes, 'before' );

	return (
		<>
			{ ( afterUrl || beforeUrl ) && (
				<InspectorControls>
					<PanelBody
						title={ __(
							'Photo alt text',
							'moira-wong-orthodontics'
						) }
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
								'Say who is shown and whether each is before or after treatment.',
								'moira-wong-orthodontics'
							) }
						</p>
						{ beforeUrl && (
							<AltField
								label={ __(
									'Before photo',
									'moira-wong-orthodontics'
								) }
								url={ beforeUrl }
								alt={ beforeAlt }
								onChange={ ( value ) =>
									setAttributes( { beforeAlt: value } )
								}
							/>
						) }
						{ afterUrl && (
							<AltField
								label={ __(
									'After photo',
									'moira-wong-orthodontics'
								) }
								url={ afterUrl }
								alt={ afterAlt }
								onChange={ ( value ) =>
									setAttributes( { afterAlt: value } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }
			<article { ...blockProps }>
				<div className="mw-testimonial__photos">
					<PhotoSlot
						kind="after"
						label={ __( 'After photo', 'moira-wong-orthodontics' ) }
						id={ afterId }
						url={ afterUrl }
						alt={ afterAlt }
						onSelect={ after.onSelect }
						onRemove={ after.onRemove }
					/>
					<PhotoSlot
						kind="before"
						label={ __(
							'Before photo',
							'moira-wong-orthodontics'
						) }
						id={ beforeId }
						url={ beforeUrl }
						alt={ beforeAlt }
						onSelect={ before.onSelect }
						onRemove={ before.onRemove }
					/>
				</div>
				<div className="mw-testimonial__head">
					<span
						className="mw-testimonial__smile"
						aria-hidden="true"
					/>
					<RichText
						tagName="p"
						className="mw-testimonial__quote"
						value={ quote }
						onChange={ ( value ) =>
							setAttributes( { quote: value } )
						}
						placeholder={ __( 'Quote', 'moira-wong-orthodontics' ) }
						allowedFormats={ QUOTE_FORMATS }
					/>
					<RichText
						tagName="p"
						className="mw-testimonial__name"
						value={ name }
						onChange={ ( value ) =>
							setAttributes( { name: value } )
						}
						placeholder={ __(
							'Who said it',
							'moira-wong-orthodontics'
						) }
						allowedFormats={ QUOTE_FORMATS }
					/>
				</div>
				<RichText
					tagName="p"
					className="mw-testimonial__text"
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Text', 'moira-wong-orthodontics' ) }
					allowedFormats={ TEXT_FORMATS }
				/>
			</article>
		</>
	);
}
