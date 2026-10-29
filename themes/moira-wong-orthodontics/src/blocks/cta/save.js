import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( { className: 'mw-cta mw-section' } );

	return (
		<section { ...blockProps }>
			<div className="mw-content">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
