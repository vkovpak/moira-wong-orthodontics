import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { hasPhoto, photoPosition, mediaId, mediaUrl, mediaAlt, title } =
		attributes;
	const showPhoto = hasPhoto && mediaUrl;
	const blockProps = useBlockProps.save( {
		className: `mw-appt mw-section${ showPhoto ? ' has-photo' : '' }${
			showPhoto && photoPosition === 'right' ? ' photo-right' : ''
		}`,
	} );

	return (
		<section { ...blockProps }>
			<div className="mw-content mw-appt__layout">
				{ showPhoto && (
					<div className="mw-appt__photo">
						<div className="mw-appt__image">
							<img
								className={
									mediaId
										? `wp-image-${ mediaId }`
										: undefined
								}
								src={ mediaUrl }
								alt={ mediaAlt }
							/>
						</div>
					</div>
				) }
				<div className="mw-appt__body">
					{ ! RichText.isEmpty( title ) && (
						<RichText.Content
							tagName="h2"
							className="mw-appt__title"
							value={ title }
						/>
					) }
					<div className="mw-appt__cols">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
