import { useBlockProps, RichText } from '@wordpress/block-editor';

const Photo = ( { kind, id, url, alt } ) => (
	<span
		className={ `mw-testimonial__photo mw-testimonial__photo--${ kind }` }
	>
		<img
			className={ id ? `wp-image-${ id }` : undefined }
			src={ url }
			alt={ alt }
		/>
	</span>
);

export default function save( { attributes } ) {
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
	const hasPhotos = !! ( afterUrl || beforeUrl );
	const blockProps = useBlockProps.save( {
		className: `mw-testimonial${ hasPhotos ? ' has-photos' : '' }`,
	} );

	return (
		<article { ...blockProps }>
			{ hasPhotos && (
				<div className="mw-testimonial__photos">
					{ afterUrl && (
						<Photo
							kind="after"
							id={ afterId }
							url={ afterUrl }
							alt={ afterAlt }
						/>
					) }
					{ beforeUrl && (
						<Photo
							kind="before"
							id={ beforeId }
							url={ beforeUrl }
							alt={ beforeAlt }
						/>
					) }
				</div>
			) }
			<div className="mw-testimonial__head">
				<span className="mw-testimonial__smile" aria-hidden="true" />
				{ ! RichText.isEmpty( quote ) && (
					<RichText.Content
						tagName="p"
						className="mw-testimonial__quote"
						value={ quote }
					/>
				) }
				{ ! RichText.isEmpty( name ) && (
					<RichText.Content
						tagName="p"
						className="mw-testimonial__name"
						value={ name }
					/>
				) }
			</div>
			{ ! RichText.isEmpty( text ) && (
				<RichText.Content
					tagName="p"
					className="mw-testimonial__text"
					value={ text }
				/>
			) }
		</article>
	);
}
