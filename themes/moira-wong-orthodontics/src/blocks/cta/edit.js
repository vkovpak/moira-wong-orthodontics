import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const TEMPLATE = [
	[
		'core/buttons',
		{},
		[
			[
				'core/button',
				{
					text: __(
						'Enquire about a consultation',
						'moira-wong-orthodontics'
					),
				},
			],
		],
	],
];

export default function Edit() {
	const blockProps = useBlockProps( { className: 'mw-cta mw-section' } );

	return (
		<section { ...blockProps }>
			<div className="mw-content">
				<InnerBlocks
					template={ TEMPLATE }
					allowedBlocks={ [ 'core/buttons' ] }
					templateLock="all"
				/>
			</div>
		</section>
	);
}
