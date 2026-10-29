import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	useBlockProps,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';

// Everything is locked: the logo can be replaced and the two text fields edited,
// but nothing can be added, removed or moved.
const LOCK = { move: true, remove: true };

// Largest logo size: 400px wide at the current logo's 284x65 proportions.
// Keep in sync with the 400px in style.scss and editor.scss.
const MAX_LOGO_WIDTH = 400;
const MAX_LOGO_HEIGHT = 92;

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

export default function Edit( { clientId } ) {
	const logoBlock = useSelect(
		( select ) =>
			select( blockEditorStore )
				.getBlocks( clientId )
				.find( ( block ) => block.name === 'core/site-logo' ),
		[ clientId ]
	);
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	const logoClientId = logoBlock?.clientId;
	const logoWidth = logoBlock?.attributes.width;

	// A width dragged past the limit snaps back to it when the handle is released.
	useEffect( () => {
		if ( logoClientId && logoWidth > MAX_LOGO_WIDTH ) {
			updateBlockAttributes( logoClientId, {
				width: MAX_LOGO_WIDTH,
				height: MAX_LOGO_HEIGHT,
			} );
		}
	}, [ logoClientId, logoWidth, updateBlockAttributes ] );

	const blockProps = useBlockProps( {
		className: 'mw-site-footer',
		style: { '--mw-logo-max-height': MAX_LOGO_HEIGHT + 'px' },
	} );

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
