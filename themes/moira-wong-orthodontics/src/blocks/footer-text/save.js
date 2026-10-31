import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { hasIcon, iconUrl, iconAlt } = attributes;
	const icon = hasIcon ? iconUrl : '';

	return (
		<div
			{ ...useBlockProps.save( {
				className: `mw-footer-text${ icon ? ' has-icon' : '' }`,
			} ) }
		>
			{ icon && (
				<img
					className="mw-footer-text__icon"
					src={ icon }
					alt={ iconAlt }
					aria-hidden={ iconAlt ? undefined : 'true' }
				/>
			) }
			<div className="mw-footer-text__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
