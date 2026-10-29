import { useBlockProps, RichText } from '@wordpress/block-editor';

// v2: title and row sat directly in the section; the centred .mw-content
// column and the generic .mw-section class came later. Same attributes.
const v2 = {
	attributes: {
		align: { type: 'string', default: 'full' },
		showTitle: { type: 'boolean', default: true },
		title: {
			type: 'string',
			source: 'html',
			selector: '.mw-logos__title',
		},
		images: { type: 'array', default: [], items: { type: 'object' } },
		maxHeight: { type: 'number', default: 60 },
		anchor: { type: 'string' },
	},
	supports: {
		html: false,
		anchor: true,
		align: [ 'full' ],
		color: { background: true, text: false },
		spacing: { margin: [ 'top', 'bottom' ], padding: true },
	},
	save( { attributes } ) {
		const { showTitle, title, images, maxHeight } = attributes;
		const blockProps = useBlockProps.save( { className: 'mw-logos' } );

		return (
			<section { ...blockProps }>
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
			</section>
		);
	},
};

// v1: the logo height was a fixed `logoHeight` (--mw-logos-height) and the
// title had no toggle. anchor is added by the "anchor" support, not listed in
// block.json, so it must be declared here too or deprecated matching drops it.
const v1 = {
	attributes: {
		align: { type: 'string', default: 'full' },
		title: {
			type: 'string',
			source: 'html',
			selector: '.mw-logos__title',
		},
		images: { type: 'array', default: [], items: { type: 'object' } },
		logoHeight: { type: 'number', default: 60 },
		anchor: { type: 'string' },
	},
	supports: {
		html: false,
		anchor: true,
		align: [ 'full' ],
		color: { background: true, text: false },
		spacing: { margin: [ 'top', 'bottom' ], padding: true },
	},
	save( { attributes } ) {
		const { title, images, logoHeight } = attributes;
		const blockProps = useBlockProps.save( { className: 'mw-logos' } );

		return (
			<section { ...blockProps }>
				{ ! RichText.isEmpty( title ) && (
					<RichText.Content
						tagName="p"
						className="mw-logos__title"
						value={ title }
					/>
				) }
				<div
					className="mw-logos__row"
					style={ { '--mw-logos-height': `${ logoHeight }px` } }
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
			</section>
		);
	},
	migrate( { logoHeight, ...attributes } ) {
		return {
			...attributes,
			maxHeight: logoHeight,
			// The title was shown whenever it was filled in.
			showTitle: ! RichText.isEmpty( attributes.title ),
		};
	},
};

export default [ v2, v1 ];
