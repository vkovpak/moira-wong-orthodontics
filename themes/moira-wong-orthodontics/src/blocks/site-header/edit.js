import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Everything is locked: the logo can be replaced and the two text fields edited,
// but nothing can be added, removed or moved. The text fields are their own
// blocks so the formatting toolbar appears above the text being edited.
const LOCK = { move: true, remove: true };

const TEMPLATE = [
	[ 'core/site-logo', { className: 'mw-header__logo', lock: LOCK } ],
	[
		'mw/header-text',
		{
			className: 'mw-header__address',
			placeholder: 'Address',
			lock: LOCK,
		},
	],
	[
		'mw/header-text',
		{
			className: 'mw-header__phone',
			placeholder: 'Call: 020 0000 0000',
			lock: LOCK,
		},
	],
];

export default function Edit() {
	const blockProps = useBlockProps( { className: 'mw-header' } );

	return (
		<div { ...blockProps }>
			<div className="mw-header__inner">
				<InnerBlocks
					template={ TEMPLATE }
					templateLock="all"
					allowedBlocks={ [ 'core/site-logo', 'mw/header-text' ] }
				/>
			</div>
		</div>
	);
}
