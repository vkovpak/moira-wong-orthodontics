import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Everything is locked: the logo can be replaced and the two text fields edited,
// but nothing can be added, removed or moved.
const LOCK = { move: true, remove: true };

const TEMPLATE = [
	[
		'core/site-logo',
		{ width: 280, className: 'mw-footer__logo', lock: LOCK },
	],
	[
		'mw/footer-text',
		{ className: 'mw-footer__address', hasIcon: true, lock: LOCK },
	],
	[ 'mw/footer-text', { className: 'mw-footer__treatments', lock: LOCK } ],
];

export default function Edit() {
	const blockProps = useBlockProps( { className: 'mw-site-footer' } );

	return (
		<div { ...blockProps }>
			<div className="mw-footer__band mw-section">
				<div className="mw-content mw-footer__layout">
					<InnerBlocks
						template={ TEMPLATE }
						templateLock="all"
						allowedBlocks={ [ 'core/site-logo', 'mw/footer-text' ] }
					/>
				</div>
			</div>
		</div>
	);
}
