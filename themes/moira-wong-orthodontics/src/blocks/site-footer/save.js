import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save( { className: 'mw-site-footer' } ) }>
			<div className="mw-footer__band mw-section">
				<div className="mw-content mw-footer__layout">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
