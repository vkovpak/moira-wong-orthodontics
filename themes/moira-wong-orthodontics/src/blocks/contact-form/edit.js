import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import MediaControl, { imageIcon } from '../../utils/media-control';
import usePhotoAttributes from '../../utils/use-photo-attributes';
import PhotoControls from '../../utils/photo-controls';

// What can be written above the form: the usual core blocks.
const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/buttons',
];

const TEMPLATE = [
	[
		'core/paragraph',
		{
			align: 'center',
			placeholder: __( 'Text', 'moira-wong-orthodontics' ),
		},
	],
];

// The form only exists on the front end; here a sketch of it shows where it
// goes and how much room it takes.
function FormSketch( { shortcode } ) {
	const label = ( text ) => (
		<span className="mw-contact__sketch-label">{ text }</span>
	);
	const box = ( className = '' ) => (
		<span className={ `mw-contact__sketch-box ${ className }` } />
	);

	return (
		<div className="mw-contact__sketch">
			{ label( 'Name*' ) }
			{ box() }
			{ label( 'Phone number*' ) }
			{ box() }
			<div className="mw-contact__sketch-row">
				<div>
					{ label( 'Email address*' ) }
					{ box() }
				</div>
				<div>
					{ label( 'Child’s age' ) }
					{ box() }
				</div>
			</div>
			{ label( 'Anything you would like us to know?' ) }
			{ box( 'is-tall' ) }
			<p className="mw-contact__sketch-note">
				{ __(
					'Layout preview: the form itself shows on the site.',
					'moira-wong-orthodontics'
				) }
				<br />
				{ shortcode ||
					__(
						'Set the form shortcode in the block settings.',
						'moira-wong-orthodontics'
					) }
			</p>
		</div>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		hasPhoto,
		photoPosition,
		mediaId,
		mediaUrl,
		mediaAlt,
		title,
		formShortcode,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `mw-contact mw-section${ hasPhoto ? ' has-photo' : '' }${
			hasPhoto && photoPosition === 'right' ? ' photo-right' : ''
		}`,
	} );

	const { onSelect, onRemove } = usePhotoAttributes( setAttributes );

	return (
		<>
			<PhotoControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				withPosition
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Form', 'moira-wong-orthodontics' ) }>
					<TextControl
						label={ __(
							'Form shortcode',
							'moira-wong-orthodontics'
						) }
						value={ formShortcode }
						onChange={ ( value ) =>
							setAttributes( { formShortcode: value } )
						}
						help={ __(
							'The Contact Form 7 shortcode. The form itself shows on the site only.',
							'moira-wong-orthodontics'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="mw-content">
					<div className="mw-contact__card">
						<RichText
							tagName="h2"
							className="mw-contact__title"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							placeholder={ __(
								'Heading',
								'moira-wong-orthodontics'
							) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
						<div className="mw-contact__text">
							<InnerBlocks
								template={ TEMPLATE }
								allowedBlocks={ ALLOWED_BLOCKS }
								templateLock={ false }
							/>
						</div>
						<div className="mw-contact__row">
							{ hasPhoto && (
								<div className="mw-contact__photo">
									{ mediaUrl ? (
										<MediaControl
											className="mw-contact__image"
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
											className="mw-photo-placeholder mw-contact__placeholder"
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
							<div className="mw-contact__form">
								<FormSketch shortcode={ formShortcode } />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
