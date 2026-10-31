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

// The two columns are blocks of their own, each with its own content, and the
// footnote is a paragraph: they are always there and always in this order.
const TEMPLATE = [
	[ 'mw/appointment-text' ],
	[ 'mw/appointment-box' ],
	[
		'core/paragraph',
		{
			className: 'mw-appt__footnote',
			placeholder: __( 'Footnote', 'moira-wong-orthodontics' ),
		},
	],
];
const FORMATS = [ 'core/bold', 'core/italic' ];

export default function Edit( { attributes, setAttributes } ) {
	const { hasPhoto, photoPosition, mediaId, mediaUrl, mediaAlt, title } =
		attributes;

	const blockProps = useBlockProps( {
		className: `mw-appt mw-section${ hasPhoto ? ' has-photo' : '' }${
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
			<section { ...blockProps }>
				<div className="mw-content mw-appt__layout">
					{ hasPhoto && (
						<div className="mw-appt__photo">
							{ mediaUrl ? (
								<MediaControl
									className="mw-appt__image"
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
									className="mw-photo-placeholder mw-appt__placeholder"
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
					<div className="mw-appt__body">
						<RichText
							tagName="h2"
							className="mw-appt__title"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							placeholder={ __(
								'Heading',
								'moira-wong-orthodontics'
							) }
							allowedFormats={ FORMATS }
						/>
						<div className="mw-appt__cols">
							<InnerBlocks
								template={ TEMPLATE }
								templateLock="all"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
