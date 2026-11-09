import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import AltField from './alt-field';

// Sidebar panel with one alt-text field per image, each beside its thumbnail.
// Renders nothing while no item has a url.
export default function AltTextPanel( { items, help, title } ) {
	const filled = items.filter( ( item ) => item.url );

	if ( ! filled.length ) {
		return null;
	}

	return (
		<PanelBody
			title={ title || __( 'Alt text', 'moira-wong-orthodontics' ) }
			initialOpen
		>
			{ help && <p className="mw-alt-panel__help">{ help }</p> }
			{ filled.map( ( item, index ) => (
				<AltField
					key={ item.key ?? index }
					label={ item.label }
					url={ item.url }
					alt={ item.alt }
					onChange={ item.onChange }
					hideLabel={ item.hideLabel }
					showThumb={ item.showThumb }
					thumbShape={ item.thumbShape }
				/>
			) ) }
		</PanelBody>
	);
}
