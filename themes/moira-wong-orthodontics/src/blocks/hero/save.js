import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { hasPhoto, mediaId, mediaUrl, mediaAlt } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'mw-hero mw-section',
	} );

	return (
		<section { ...blockProps }>
			<div className="mw-content mw-hero__layout">
				<div className="mw-hero__text">
					<InnerBlocks.Content />
				</div>
				{ hasPhoto && mediaUrl && (
					<div className="mw-hero__photo">
						<div className="mw-hero__image">
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
			</div>
		</section>
	);
}
