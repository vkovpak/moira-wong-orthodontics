import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		mediaId,
		mediaUrl,
		mediaAlt,
		bubbleQuote,
		bubbleName,
		reviewQuote,
		reviewName,
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: 'mw-about mw-section',
	} );
	const hasReview =
		! RichText.isEmpty( reviewQuote ) || ! RichText.isEmpty( reviewName );
	const hasBubble =
		! RichText.isEmpty( bubbleQuote ) || ! RichText.isEmpty( bubbleName );

	return (
		<section { ...blockProps }>
			<div className="mw-content mw-about__layout">
				<div className="mw-about__text">
					<InnerBlocks.Content />
					{ hasReview && (
						<div className="mw-about__review">
							{ ! RichText.isEmpty( reviewQuote ) && (
								<RichText.Content
									tagName="p"
									className="mw-about__review-quote"
									value={ reviewQuote }
								/>
							) }
							{ ! RichText.isEmpty( reviewName ) && (
								<RichText.Content
									tagName="p"
									className="mw-about__review-name"
									value={ reviewName }
								/>
							) }
						</div>
					) }
				</div>
				<div className="mw-about__photo">
					<div className="mw-about__figure">
						{ hasBubble && (
							<div className="mw-about__bubble">
								{ ! RichText.isEmpty( bubbleQuote ) && (
									<RichText.Content
										tagName="p"
										className="mw-about__bubble-quote"
										value={ bubbleQuote }
									/>
								) }
								{ ! RichText.isEmpty( bubbleName ) && (
									<RichText.Content
										tagName="p"
										className="mw-about__bubble-name"
										value={ bubbleName }
									/>
								) }
							</div>
						) }
						{ mediaUrl && (
							<div className="mw-about__image">
								<img
									className={
										mediaId ? `wp-image-${ mediaId }` : undefined
									}
									src={ mediaUrl }
									alt={ mediaAlt }
								/>
							</div>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
