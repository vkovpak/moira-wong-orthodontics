import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showTitle, title, images, maxHeight } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'mw-logos mw-section',
	} );

	return (
		<section { ...blockProps }>
			<div className="mw-content">
				{ showTitle && ! RichText.isEmpty( title ) && (
					<RichText.Content
						tagName="p"
						className="mw-logos__title"
						value={ title }
					/>
				) }
				<div
					className="mw-logos__row"
					style={ { '--mw-logos-max-height': `${ maxHeight }px` } }
				>
					{ images.map(
						( image, index ) =>
							image.url && (
								<img
									key={ image.id ?? index }
									className={
										image.id
											? `wp-image-${ image.id }`
											: undefined
									}
									src={ image.url }
									alt={ image.alt || '' }
								/>
							)
					) }
				</div>
			</div>
		</section>
	);
}
