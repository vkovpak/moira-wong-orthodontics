import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save( { className: 'mw-header' } ) }>
			<div className="mw-header__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
