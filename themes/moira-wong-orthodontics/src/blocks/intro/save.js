import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { mediaId, mediaUrl, mediaAlt } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'mw-intro mw-section',
	} );

	return (
		<section { ...blockProps }>
			<div className="mw-content mw-intro__layout">
				{ mediaUrl && (
					<div className="mw-intro__photo">
						<img
							className={
								mediaId ? `wp-image-${ mediaId }` : undefined
							}
							src={ mediaUrl }
							alt={ mediaAlt }
						/>
					</div>
				) }
				<div className="mw-intro__text">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
