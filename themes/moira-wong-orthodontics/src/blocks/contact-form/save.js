import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

// save() leaves the shortcode as plain text in the markup: the content filters
// run do_blocks() before do_shortcode(), so it is replaced by the form when the
// page is shown, as if it were typed into a Shortcode block.
export default function save( { attributes } ) {
	const {
		hasPhoto,
		photoPosition,
		mediaId,
		mediaUrl,
		mediaAlt,
		title,
		formShortcode,
	} = attributes;
	const showPhoto = hasPhoto && mediaUrl;
	const blockProps = useBlockProps.save( {
		className: `mw-contact mw-section${ showPhoto ? ' has-photo' : '' }${
			showPhoto && photoPosition === 'right' ? ' photo-right' : ''
		}`,
	} );

	return (
		<section { ...blockProps }>
			<div className="mw-content">
				<div className="mw-contact__card">
					{ ! RichText.isEmpty( title ) && (
						<RichText.Content
							tagName="h2"
							className="mw-contact__title"
							value={ title }
						/>
					) }
					<div className="mw-contact__text">
						<InnerBlocks.Content />
					</div>
					<div className="mw-contact__row">
						{ showPhoto && (
							<div className="mw-contact__photo">
								<div className="mw-contact__image">
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
						<div className="mw-contact__form">
							{ formShortcode }
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
